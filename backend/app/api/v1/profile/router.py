"""
Nexvora User Profile API

Endpoints:
  GET   /api/v1/profile/me               — get own full profile
  PATCH /api/v1/profile/me               — update own profile
  GET   /api/v1/profile/{username}       — get public profile by username
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel, HttpUrl
from typing import Optional, List

from app.core.database import get_db
from app.models.user import User
from app.models.submission import Submission
from app.models.achievement import UserAchievement
from app.dependencies.current_user import get_current_user

router = APIRouter(prefix="/api/v1/profile", tags=["Profile"])


# ── Schemas ───────────────────────────────────────────────────────────────────

class ProfileUpdate(BaseModel):
    full_name: Optional[str] = None
    bio: Optional[str] = None
    target_role: Optional[str] = None
    experience_level: Optional[str] = None
    github_url: Optional[str] = None
    linkedin_url: Optional[str] = None
    portfolio_url: Optional[str] = None


# ── Helpers ───────────────────────────────────────────────────────────────────

def _serialize_user(user: User, db: Session, include_private: bool = False) -> dict:
    """Build profile response dict from User model."""
    achievements = db.query(UserAchievement).filter(
        UserAchievement.user_id == user.id
    ).all()

    recent_submissions = (
        db.query(Submission)
        .filter(Submission.user_id == user.id)
        .order_by(Submission.created_at.desc())
        .limit(5)
        .all()
    )

    profile = {
        "id": str(user.id),
        "username": user.username,
        "full_name": user.full_name,
        "bio": user.bio,
        "profile_image": user.profile_image,
        "target_role": user.target_role,
        "experience_level": user.experience_level,
        "github_url": user.github_url,
        "linkedin_url": user.linkedin_url,
        "portfolio_url": user.portfolio_url,
        # Gamification
        "nexvora_rating": user.nexvora_rating,
        "contest_rating": user.contest_rating,
        "xp": user.xp,
        "level": user.level,
        "streak": user.streak,
        "readiness_score": user.readiness_score,
        # Problem stats
        "problems_solved": user.problems_solved,
        "easy_solved": user.easy_solved,
        "medium_solved": user.medium_solved,
        "hard_solved": user.hard_solved,
        # Achievements
        "achievements": [
            {
                "name": ua.achievement.name,
                "icon": ua.achievement.icon,
                "description": ua.achievement.description,
                "unlocked_at": ua.created_at.isoformat() if ua.created_at else None,
            }
            for ua in achievements
            if ua.achievement
        ],
        # Recent activity
        "recent_submissions": [
            {
                "id": str(s.id),
                "status": s.status,
                "language": s.language,
                "created_at": s.created_at.isoformat() if s.created_at else None,
            }
            for s in recent_submissions
        ],
        "joined_at": user.created_at.isoformat() if user.created_at else None,
    }

    if include_private:
        profile["email"] = user.email
        profile["is_verified"] = user.is_verified
        profile["role"] = user.role.name if user.role else None

    return profile


# ── Endpoints ─────────────────────────────────────────────────────────────────

@router.get("/me", response_model=dict)
def get_my_profile(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Get the authenticated user's full profile."""
    return _serialize_user(current_user, db, include_private=True)


@router.patch("/me", response_model=dict)
def update_my_profile(
    data: ProfileUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Update the authenticated user's profile."""
    update_data = data.model_dump(exclude_none=True)

    for field, value in update_data.items():
        if hasattr(current_user, field):
            setattr(current_user, field, value)

    db.commit()
    db.refresh(current_user)

    return {
        "message": "Profile updated successfully",
        "profile": _serialize_user(current_user, db, include_private=True),
    }


@router.get("/{username}", response_model=dict)
def get_public_profile(
    username: str,
    db: Session = Depends(get_db),
):
    """Get a user's public profile by username."""
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return _serialize_user(user, db, include_private=False)
