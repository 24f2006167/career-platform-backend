"""
Nexvora Submissions API + WebSocket

Endpoints:
  POST /api/v1/submissions              — submit code for a problem
  GET  /api/v1/submissions              — list user's submission history
  GET  /api/v1/submissions/{id}         — get submission detail
  WS   /api/v1/submissions/ws/{sub_id} — real-time status updates
"""

import json
import os
import asyncio
import threading
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, WebSocket, WebSocketDisconnect
from sqlalchemy.orm import Session
from pydantic import BaseModel

from app.core.database import get_db, SessionLocal
from app.models.submission import Submission
from app.models.problem import Problem
from app.models.user import User
from app.dependencies.current_user import get_current_user
from app.services.judge.sandbox import evaluate_solution

router = APIRouter(prefix="/api/v1/submissions", tags=["Submissions"])

REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379/0")


# ── Schemas ───────────────────────────────────────────────────────────────────

class SubmitRequest(BaseModel):
    problem_slug: str
    language: str = "python"
    code: str


# ── WebSocket Connection Manager ──────────────────────────────────────────────

class ConnectionManager:
    """Manages WebSocket connections keyed by submission_id."""

    def __init__(self):
        self.connections: dict[str, list[WebSocket]] = {}

    async def connect(self, submission_id: str, websocket: WebSocket):
        await websocket.accept()
        self.connections.setdefault(submission_id, []).append(websocket)

    def disconnect(self, submission_id: str, websocket: WebSocket):
        if submission_id in self.connections:
            self.connections[submission_id].discard(websocket)

    async def send_result(self, submission_id: str, data: dict):
        for ws in list(self.connections.get(submission_id, [])):
            try:
                await ws.send_json(data)
            except Exception:
                pass


manager = ConnectionManager()


# ── Endpoints ─────────────────────────────────────────────────────────────────

@router.post("", response_model=dict)
def submit_code(
    data: SubmitRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Submit code for a problem.

    Returns submission_id immediately.
    Client should connect to WS /api/v1/submissions/ws/{submission_id}
    for real-time result updates.

    Execution strategy:
      1. If Redis is available → queue job for worker process
      2. Fallback → execute synchronously in-process (development mode)
    """
    # Validate problem
    problem = db.query(Problem).filter(
        Problem.slug == data.problem_slug,
        Problem.is_active == True
    ).first()

    if not problem:
        raise HTTPException(status_code=404, detail="Problem not found")

    # Validate language
    supported = ["python", "javascript", "cpp", "java"]
    if data.language.lower() not in supported:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported language. Supported: {supported}"
        )

    # Validate code length
    if len(data.code) > 50_000:
        raise HTTPException(status_code=400, detail="Code too long (max 50KB)")

    # Create submission record
    submission = Submission(
        user_id=current_user.id,
        problem_id=problem.id,
        language=data.language.lower(),
        code=data.code,
        status="pending",
    )
    db.add(submission)
    db.commit()
    db.refresh(submission)
    submission_id = str(submission.id)

    # Try to push to Redis queue
    queued = False
    try:
        import redis as redis_lib
        r = redis_lib.from_url(REDIS_URL, decode_responses=True)
        r.rpush("nexvora:submission_queue", submission_id)
        queued = True
    except Exception:
        pass

    if not queued:
        # Synchronous fallback — run in background thread so request returns fast
        def _run_sync():
            from app.services.judge.worker import process_submission
            process_submission(submission_id, None)

        thread = threading.Thread(target=_run_sync, daemon=True)
        thread.start()

    return {
        "submission_id": submission_id,
        "status": "pending",
        "queued": queued,
        "message": "Submission received. Connect to WebSocket for real-time updates.",
        "ws_url": f"/api/v1/submissions/ws/{submission_id}",
    }


@router.get("", response_model=dict)
def list_submissions(
    page: int = 1,
    page_size: int = 20,
    problem_slug: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """List current user's submission history."""
    query = db.query(Submission).filter(
        Submission.user_id == current_user.id
    ).order_by(Submission.created_at.desc())

    if problem_slug:
        problem = db.query(Problem).filter(Problem.slug == problem_slug).first()
        if problem:
            query = query.filter(Submission.problem_id == problem.id)

    total = query.count()
    subs = query.offset((page - 1) * page_size).limit(page_size).all()

    items = []
    for s in subs:
        problem = db.query(Problem).filter(Problem.id == s.problem_id).first()
        items.append({
            "id": str(s.id),
            "problem_title": problem.title if problem else "Unknown",
            "problem_slug": problem.slug if problem else "",
            "language": s.language,
            "code": s.code,
            "status": s.status,
            "runtime_ms": s.runtime_ms,
            "memory_kb": s.memory_kb,
            "test_cases_passed": s.test_cases_passed,
            "total_test_cases": s.total_test_cases,
            "score": s.score,
            "created_at": s.created_at.isoformat() if s.created_at else None,
        })

    return {
        "items": items,
        "total": total,
        "page": page,
        "pages": (total + page_size - 1) // page_size,
    }


@router.get("/{submission_id}", response_model=dict)
def get_submission(
    submission_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Get submission detail. Users can only see their own submissions."""
    submission = db.query(Submission).filter(
        Submission.id == submission_id
    ).first()

    if not submission:
        raise HTTPException(status_code=404, detail="Submission not found")

    # Only owner or admin can view
    is_admin = current_user.role and current_user.role.name == "admin"
    if str(submission.user_id) != str(current_user.id) and not is_admin:
        raise HTTPException(status_code=403, detail="Access denied")

    problem = db.query(Problem).filter(Problem.id == submission.problem_id).first()

    return {
        "id": str(submission.id),
        "problem_title": problem.title if problem else "Unknown",
        "problem_slug": problem.slug if problem else "",
        "language": submission.language,
        "code": submission.code,
        "status": submission.status,
        "runtime_ms": submission.runtime_ms,
        "memory_kb": submission.memory_kb,
        "test_cases_passed": submission.test_cases_passed,
        "total_test_cases": submission.total_test_cases,
        "score": submission.score,
        "error_message": submission.error_message,
        "test_results": submission.test_results,
        "ai_explanation": submission.ai_explanation,
        "created_at": submission.created_at.isoformat() if submission.created_at else None,
    }


@router.websocket("/ws/{submission_id}")
async def submission_websocket(
    websocket: WebSocket,
    submission_id: str,
):
    """
    WebSocket endpoint for real-time submission result delivery.

    Client connects immediately after POST /submissions.
    Server pushes status updates and final result.

    Protocol:
      - On connect: sends current status
      - On result ready: sends full result JSON
      - On terminal status: closes connection
    """
    await manager.connect(submission_id, websocket)

    try:
        # Send current status immediately
        db = SessionLocal()
        try:
            sub = db.query(Submission).filter(Submission.id == submission_id).first()
            if sub:
                await websocket.send_json({
                    "type": "status",
                    "submission_id": submission_id,
                    "status": sub.status,
                })
        finally:
            db.close()

        # Poll DB for result until terminal state
        terminal_statuses = {
            "accepted", "wrong_answer", "time_limit_exceeded",
            "memory_limit_exceeded", "runtime_error", "compilation_error"
        }

        poll_count = 0
        max_polls = 60  # max 60 seconds

        while poll_count < max_polls:
            await asyncio.sleep(1)
            poll_count += 1

            db = SessionLocal()
            try:
                sub = db.query(Submission).filter(
                    Submission.id == submission_id
                ).first()

                if not sub:
                    await websocket.send_json({
                        "type": "error",
                        "message": "Submission not found"
                    })
                    break

                await websocket.send_json({
                    "type": "status",
                    "submission_id": submission_id,
                    "status": sub.status,
                })

                if sub.status in terminal_statuses:
                    await websocket.send_json({
                        "type": "result",
                        "submission_id": submission_id,
                        "status": sub.status,
                        "runtime_ms": sub.runtime_ms,
                        "memory_kb": sub.memory_kb,
                        "test_cases_passed": sub.test_cases_passed,
                        "total_test_cases": sub.total_test_cases,
                        "score": sub.score,
                        "error_message": sub.error_message,
                        "test_results": sub.test_results,
                    })
                    break
            finally:
                db.close()

        if poll_count >= max_polls:
            await websocket.send_json({
                "type": "error",
                "message": "Execution timed out (judge may be overloaded)"
            })

    except WebSocketDisconnect:
        pass
    finally:
        manager.disconnect(submission_id, websocket)
