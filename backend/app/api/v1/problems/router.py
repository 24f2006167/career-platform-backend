"""
Nexvora Problems API

Endpoints:
  GET  /api/v1/problems          — list problems (paginated, filterable)
  GET  /api/v1/problems/{slug}   — get problem details + public test cases
  POST /api/v1/problems          — create problem (admin only)
  PUT  /api/v1/problems/{slug}   — update problem (admin only)
"""

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Optional
from pydantic import BaseModel
from typing import List, Any
import uuid

from app.core.database import get_db
from app.models.problem import Problem
from app.models.test_case import TestCase
from app.models.submission import Submission
from app.dependencies.current_user import get_current_user
from app.models.user import User

router = APIRouter(prefix="/api/v1/problems", tags=["Problems"])


# ── Schemas ──────────────────────────────────────────────────────────────────

class TestCaseCreate(BaseModel):
    input_data: str
    expected_output: str
    is_hidden: bool = True
    order_index: int = 0
    explanation: Optional[str] = None


class ProblemCreate(BaseModel):
    title: str
    slug: str
    description: str
    difficulty: str = "easy"
    topic_tags: List[str] = []
    company_tags: List[str] = []
    constraints: Optional[str] = None
    examples: List[Any] = []
    hints: List[str] = []
    editorial: Optional[str] = None
    points: int = 10
    is_premium: bool = False
    test_cases: List[TestCaseCreate] = []


class ProblemResponse(BaseModel):
    id: str
    title: str
    slug: str
    description: str
    difficulty: str
    topic_tags: List[str]
    company_tags: List[str]
    constraints: Optional[str]
    examples: List[Any]
    hints: List[str]
    points: int
    acceptance_rate: float
    total_submissions: int
    total_accepted: int
    is_premium: bool
    is_solved: bool = False  # populated per-user

    class Config:
        from_attributes = True


class ProblemListItem(BaseModel):
    id: str
    title: str
    slug: str
    difficulty: str
    topic_tags: List[str]
    company_tags: List[str]
    acceptance_rate: float
    total_submissions: int
    points: int
    is_premium: bool
    is_solved: bool = False

    class Config:
        from_attributes = True


# ── Endpoints ─────────────────────────────────────────────────────────────────

@router.get("", response_model=dict)
def list_problems(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    difficulty: Optional[str] = Query(None),
    topic: Optional[str] = Query(None),
    company: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """List problems with filters. Returns paginated results."""
    query = db.query(Problem).filter(Problem.is_active == True)

    if difficulty:
        query = query.filter(Problem.difficulty == difficulty.lower())

    if topic:
        # JSON contains filter (PostgreSQL)
        query = query.filter(Problem.topic_tags.contains([topic]))

    if company:
        query = query.filter(Problem.company_tags.contains([company]))

    if search:
        query = query.filter(Problem.title.ilike(f"%{search}%"))

    total = query.count()
    problems = query.offset((page - 1) * page_size).limit(page_size).all()

    # Get user's solved problem IDs
    solved_ids = set()
    if current_user:
        solved_subs = db.query(Submission.problem_id).filter(
            Submission.user_id == current_user.id,
            Submission.status == "accepted"
        ).distinct().all()
        solved_ids = {str(s[0]) for s in solved_subs}

    items = []
    for p in problems:
        items.append({
            "id": str(p.id),
            "title": p.title,
            "slug": p.slug,
            "difficulty": p.difficulty,
            "topic_tags": p.topic_tags or [],
            "company_tags": p.company_tags or [],
            "acceptance_rate": round(p.acceptance_rate, 1),
            "total_submissions": p.total_submissions,
            "points": p.points,
            "is_premium": p.is_premium,
            "is_solved": str(p.id) in solved_ids,
        })

    return {
        "items": items,
        "total": total,
        "page": page,
        "page_size": page_size,
        "pages": (total + page_size - 1) // page_size,
    }


@router.get("/{slug}", response_model=dict)
def get_problem(
    slug: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Get full problem details including public test cases."""
    problem = db.query(Problem).filter(
        Problem.slug == slug,
        Problem.is_active == True
    ).first()

    if not problem:
        raise HTTPException(status_code=404, detail="Problem not found")

    # Public test cases only
    public_tcs = db.query(TestCase).filter(
        TestCase.problem_id == problem.id,
        TestCase.is_hidden == False
    ).order_by(TestCase.order_index).all()

    # Check if user solved this problem
    is_solved = False
    if current_user:
        is_solved = db.query(Submission).filter(
            Submission.user_id == current_user.id,
            Submission.problem_id == problem.id,
            Submission.status == "accepted"
        ).first() is not None

    return {
        "id": str(problem.id),
        "title": problem.title,
        "slug": problem.slug,
        "description": problem.description,
        "difficulty": problem.difficulty,
        "topic_tags": problem.topic_tags or [],
        "company_tags": problem.company_tags or [],
        "constraints": problem.constraints,
        "examples": problem.examples or [],
        "hints": problem.hints or [],
        "points": problem.points,
        "acceptance_rate": round(problem.acceptance_rate, 1),
        "total_submissions": problem.total_submissions,
        "total_accepted": problem.total_accepted,
        "is_premium": problem.is_premium,
        "is_solved": is_solved,
        "public_test_cases": [
            {
                "input": tc.input_data,
                "expected_output": tc.expected_output,
                "explanation": tc.explanation,
            }
            for tc in public_tcs
        ],
    }


@router.post("", response_model=dict)
def create_problem(
    data: ProblemCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Create a problem with test cases. Admin only."""
    # Check admin role
    if not current_user.role or current_user.role.name not in ("admin", "moderator"):
        raise HTTPException(status_code=403, detail="Admin access required")

    # Check duplicate slug
    existing = db.query(Problem).filter(Problem.slug == data.slug).first()
    if existing:
        raise HTTPException(status_code=409, detail=f"Slug '{data.slug}' already exists")

    problem = Problem(
        title=data.title,
        slug=data.slug,
        description=data.description,
        difficulty=data.difficulty.lower(),
        topic_tags=data.topic_tags,
        company_tags=data.company_tags,
        constraints=data.constraints,
        examples=data.examples,
        hints=data.hints,
        editorial=data.editorial,
        points=data.points,
        is_premium=data.is_premium,
    )
    db.add(problem)
    db.flush()  # get problem.id before adding test cases

    for tc_data in data.test_cases:
        tc = TestCase(
            problem_id=problem.id,
            input_data=tc_data.input_data,
            expected_output=tc_data.expected_output,
            is_hidden=tc_data.is_hidden,
            order_index=tc_data.order_index,
            explanation=tc_data.explanation,
        )
        db.add(tc)

    db.commit()
    db.refresh(problem)

    return {
        "id": str(problem.id),
        "slug": problem.slug,
        "title": problem.title,
        "test_cases_added": len(data.test_cases),
        "message": "Problem created successfully",
    }
