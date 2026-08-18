from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.dependencies.current_user import get_current_user
from app.models.user import User
from app.models.role import Role
from app.models.roadmap import Roadmap

router = APIRouter(
    prefix="/api/candidate",
    tags=["Candidate Profile & Roles"],
)


class TargetRoleUpdateSchema(BaseModel):
    target_role: str
    experience_level: Optional[str] = "beginner"


@router.get("/role")
def get_candidate_role(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Get the candidate's active target role, experience level, and SDE readiness score.
    """
    return {
        "user_id": str(current_user.id),
        "target_role": current_user.target_role or "Full Stack Developer",
        "experience_level": current_user.experience_level or "beginner",
        "readiness_score": current_user.readiness_score or 0.0,
        "xp": current_user.xp or 0,
        "level": current_user.level or 1,
        "problems_solved": current_user.problems_solved or 0,
    }


@router.post("/role")
def update_target_role(
    payload: TargetRoleUpdateSchema,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Set or update candidate's target role and experience level.
    """
    current_user.target_role = payload.target_role.strip()
    if payload.experience_level:
        current_user.experience_level = payload.experience_level.strip().lower()

    db.commit()
    db.refresh(current_user)

    return {
        "message": "Target role updated successfully",
        "target_role": current_user.target_role,
        "experience_level": current_user.experience_level,
    }


@router.get("/roadmap")
def get_candidate_roadmap(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Fetch the candidate's personalized career roadmap based on target role.
    """
    role_title = current_user.target_role or "Full Stack Developer"
    roadmap = (
        db.query(Roadmap)
        .filter(Roadmap.title.ilike(f"%{role_title}%"))
        .first()
    )

    if not roadmap:
        # Fallback to first available roadmap
        roadmap = db.query(Roadmap).first()

    if not roadmap:
        return {
            "title": f"{role_title} Roadmap",
            "description": "Standard software engineering career track",
            "steps": [],
        }

    return {
        "id": str(roadmap.id),
        "title": roadmap.title,
        "description": roadmap.description,
        "steps": [
            {
                "id": str(step.id),
                "title": step.title,
                "description": step.description,
                "step_order": step.step_order,
            }
            for step in sorted(roadmap.steps, key=lambda s: s.step_order)
        ] if hasattr(roadmap, "steps") else [],
    }


@router.get("/skills")
def get_candidate_skills(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Get candidate's acquired skills and system recommendations.
    """
    acquired_skills = [
        {
            "id": str(us.skill.id),
            "name": us.skill.name,
            "proficiency": us.proficiency_level or "beginner",
        }
        for us in current_user.skills
        if us.skill
    ] if hasattr(current_user, "skills") else []

    return {
        "user_id": str(current_user.id),
        "target_role": current_user.target_role or "Full Stack Developer",
        "acquired_skills": acquired_skills,
        "total_skills_acquired": len(acquired_skills),
    }
