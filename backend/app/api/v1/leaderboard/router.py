"""
Nexvora Leaderboard + Contests API

GET /api/v1/leaderboard          — global ranking
GET /api/v1/leaderboard/weekly   — weekly ranking
GET /api/v1/contests             — list contests
POST /api/v1/contests            — create contest (admin)
GET /api/v1/contests/{id}        — contest detail
POST /api/v1/contests/{id}/join  — join contest
"""

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import func, desc
from pydantic import BaseModel
from typing import Optional, List
import uuid

from app.core.database import get_db
from app.models.user import User
from app.models.progress import Contest, ContestParticipant
from app.dependencies.current_user import get_current_user

router = APIRouter(tags=["Leaderboard & Contests"])


# ── Leaderboard ────────────────────────────────────────────────────────────────

@router.get("/api/v1/leaderboard", response_model=dict)
def get_global_leaderboard(
    page: int = Query(1, ge=1),
    page_size: int = Query(50, ge=1, le=100),
    db: Session = Depends(get_db),
):
    """Global leaderboard ranked by nexvora_rating."""
    query = db.query(User).filter(User.is_active == True).order_by(
        desc(User.nexvora_rating),
        desc(User.problems_solved),
    )
    total = query.count()
    users = query.offset((page - 1) * page_size).limit(page_size).all()

    items = []
    for i, user in enumerate(users):
        rank = (page - 1) * page_size + i + 1
        items.append({
            "rank": rank,
            "username": user.username,
            "full_name": user.full_name,
            "profile_image": user.profile_image,
            "nexvora_rating": user.nexvora_rating,
            "problems_solved": user.problems_solved,
            "easy_solved": user.easy_solved,
            "medium_solved": user.medium_solved,
            "hard_solved": user.hard_solved,
            "streak": user.streak,
            "target_role": user.target_role,
            "level": user.level,
        })

    return {
        "items": items,
        "total": total,
        "page": page,
        "pages": (total + page_size - 1) // page_size,
    }


@router.get("/api/v1/leaderboard/me", response_model=dict)
def get_my_rank(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Get current user's rank and surrounding users."""
    rank = db.query(User).filter(
        User.nexvora_rating > current_user.nexvora_rating,
        User.is_active == True
    ).count() + 1

    total = db.query(User).filter(User.is_active == True).count()
    percentile = round(((total - rank) / total) * 100, 1) if total > 0 else 0

    return {
        "rank": rank,
        "total_users": total,
        "percentile": percentile,
        "nexvora_rating": current_user.nexvora_rating,
        "problems_solved": current_user.problems_solved,
    }


# ── Contests ───────────────────────────────────────────────────────────────────

class ContestCreate(BaseModel):
    title: str
    description: Optional[str] = None
    duration_minutes: int = 90
    start_time: Optional[str] = None
    problem_ids: List[str] = []
    is_rated: bool = True


@router.get("/api/v1/contests", response_model=dict)
def list_contests(
    status: Optional[str] = Query(None),
    db: Session = Depends(get_db),
):
    """List contests filtered by status."""
    query = db.query(Contest)
    if status:
        query = query.filter(Contest.status == status)
    query = query.order_by(desc(Contest.created_at))

    contests = query.limit(20).all()
    return {
        "items": [
            {
                "id": str(c.id),
                "title": c.title,
                "description": c.description,
                "duration_minutes": c.duration_minutes,
                "start_time": c.start_time,
                "end_time": c.end_time,
                "status": c.status,
                "is_rated": c.is_rated,
                "participant_count": len(c.participants),
                "problem_count": len(c.problem_ids or []),
            }
            for c in contests
        ]
    }


@router.get("/api/v1/contests/{contest_id}", response_model=dict)
def get_contest(
    contest_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Get contest details with leaderboard."""
    contest = db.query(Contest).filter(Contest.id == contest_id).first()
    if not contest:
        raise HTTPException(status_code=404, detail="Contest not found")

    # Get sorted participants
    participants = sorted(contest.participants, key=lambda p: (-p.score, p.penalty_seconds))

    # Find current user's position
    my_rank = None
    for i, p in enumerate(participants):
        if str(p.user_id) == str(current_user.id):
            my_rank = i + 1
            break

    return {
        "id": str(contest.id),
        "title": contest.title,
        "description": contest.description,
        "duration_minutes": contest.duration_minutes,
        "start_time": contest.start_time,
        "end_time": contest.end_time,
        "status": contest.status,
        "is_rated": contest.is_rated,
        "problem_ids": contest.problem_ids or [],
        "my_rank": my_rank,
        "leaderboard": [
            {
                "rank": i + 1,
                "username": p.user.username if p.user else "Unknown",
                "score": p.score,
                "problems_solved": p.problems_solved,
                "penalty_seconds": p.penalty_seconds,
                "rating_change": p.rating_change,
            }
            for i, p in enumerate(participants[:50])
        ],
    }


@router.post("/api/v1/contests", response_model=dict)
def create_contest(
    data: ContestCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Create a contest. Admin only."""
    if not current_user.role or current_user.role.name != "admin":
        raise HTTPException(status_code=403, detail="Admin only")

    contest = Contest(
        title=data.title,
        description=data.description,
        duration_minutes=data.duration_minutes,
        start_time=data.start_time,
        problem_ids=data.problem_ids,
        is_rated=data.is_rated,
        status="upcoming",
    )
    db.add(contest)
    db.commit()
    db.refresh(contest)

    return {"id": str(contest.id), "title": contest.title, "message": "Contest created"}


@router.post("/api/v1/contests/{contest_id}/join", response_model=dict)
def join_contest(
    contest_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Join a contest."""
    contest = db.query(Contest).filter(Contest.id == contest_id).first()
    if not contest:
        raise HTTPException(status_code=404, detail="Contest not found")

    if contest.status == "ended":
        raise HTTPException(status_code=400, detail="Contest has ended")

    # Check already joined
    existing = db.query(ContestParticipant).filter(
        ContestParticipant.contest_id == contest.id,
        ContestParticipant.user_id == current_user.id,
    ).first()

    if existing:
        return {"message": "Already joined", "contest_id": str(contest.id)}

    participant = ContestParticipant(
        contest_id=contest.id,
        user_id=current_user.id,
    )
    db.add(participant)
    db.commit()

    return {"message": "Joined successfully", "contest_id": str(contest.id)}
