from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
)

from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.user import User
from app.models.skill import Skill
from app.models.skill_category import SkillCategory
from app.models.user_skill import UserSkill

from app.dependencies.current_user import get_current_user
from app.dependencies.role_guard import require_role

from app.schemas.skill.skill_category_schema import SkillCategoryCreateSchema
from app.schemas.skill.skill_schema import SkillCreateSchema
from app.schemas.skill.user_skill_schema import (
    UserSkillCreateSchema,
    UserSkillUpdateSchema,
)

from app.services.skill.skill_service import (
    create_skill_category,
    create_skill,
    add_skill_to_user,
    update_user_skill,
)


router = APIRouter(
    prefix="/skills",
    tags=["Skills"],
)


class SkillProgressRequest(BaseModel):
    skill_id: str
    xp: int = 10
    level: int | None = None
    is_verified: bool = False


# GET ALL SKILL CATEGORIES
@router.get("/categories")
def get_categories(db: Session = Depends(get_db)):
    categories = db.query(SkillCategory).all()

    return [
        {
            "id": str(category.id),
            "name": category.name,
            "description": category.description,
        }
        for category in categories
    ]


# GET ALL SKILLS
@router.get("")
@router.get("/")
def get_all_skills(db: Session = Depends(get_db)):
    skills = db.query(Skill).all()

    return [
        {
            "id": str(skill.id),
            "name": skill.name,
            "description": skill.description,
            "category_id": str(skill.category_id) if skill.category_id else None,
            "category": skill.category.name if skill.category else None,
        }
        for skill in skills
    ]


# GET MY SKILLS
@router.get("/me")
def get_my_skills(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    user_skills = (
        db.query(UserSkill)
        .filter(UserSkill.user_id == current_user.id)
        .all()
    )

    return [
        {
            "id": str(user_skill.id),
            "skill_id": str(user_skill.skill_id),
            "skill_name": user_skill.skill.name if user_skill.skill else None,
            "level": user_skill.level,
            "xp": user_skill.xp,
            "is_verified": user_skill.is_verified,
        }
        for user_skill in user_skills
    ]


# GET MY PROGRESS SUMMARY
@router.get("/my-progress")
def get_my_progress(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    user_skills = (
        db.query(UserSkill)
        .filter(UserSkill.user_id == current_user.id)
        .all()
    )

    total_skills = len(user_skills)
    verified_skills = len([item for item in user_skills if item.is_verified])
    total_xp = sum(item.xp or 0 for item in user_skills)

    readiness = 0

    if total_skills > 0:
        readiness = min(
            100,
            int((verified_skills / total_skills) * 60) + min(total_xp // 10, 40),
        )

    return {
        "total_skills": total_skills,
        "verified_skills": verified_skills,
        "total_xp": total_xp,
        "readiness": readiness,
        "skills": [
            {
                "id": str(item.id),
                "skill_id": str(item.skill_id),
                "skill_name": item.skill.name if item.skill else None,
                "category": item.skill.category.name
                if item.skill and item.skill.category
                else "Uncategorized",
                "level": item.level,
                "xp": item.xp,
                "is_verified": item.is_verified,
            }
            for item in user_skills
        ],
    }


# SAVE / UPDATE MY SKILL PROGRESS
@router.post("/progress")
def save_skill_progress(
    data: SkillProgressRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    skill = db.query(Skill).filter(Skill.id == data.skill_id).first()

    if not skill:
        raise HTTPException(status_code=404, detail="Skill not found")

    user_skill = (
        db.query(UserSkill)
        .filter(
            UserSkill.user_id == current_user.id,
            UserSkill.skill_id == data.skill_id,
        )
        .first()
    )

    if not user_skill:
        user_skill = UserSkill(
            user_id=current_user.id,
            skill_id=data.skill_id,
            level=data.level or 1,
            xp=max(data.xp, 0),
            is_verified=data.is_verified,
        )

        db.add(user_skill)
    else:
        user_skill.xp = max((user_skill.xp or 0) + data.xp, 0)

        if data.level is not None:
            user_skill.level = max(data.level, user_skill.level or 1)
        else:
            user_skill.level = min(10, max(1, (user_skill.xp // 100) + 1))

        if data.is_verified:
            user_skill.is_verified = True

    db.commit()
    db.refresh(user_skill)

    return {
        "message": "Progress saved",
        "skill_id": str(user_skill.skill_id),
        "level": user_skill.level,
        "xp": user_skill.xp,
        "is_verified": user_skill.is_verified,
    }


# CREATE SKILL CATEGORY ADMIN ONLY
@router.post(
    "/categories",
    status_code=status.HTTP_201_CREATED,
)
def create_category(
    category_data: SkillCategoryCreateSchema,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(["admin"])),
):
    try:
        category = create_skill_category(db, category_data)

        return {
            "message": "Skill category created",
            "category_id": str(category.id),
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


# CREATE SKILL ADMIN ONLY
@router.post(
    "/",
    status_code=status.HTTP_201_CREATED,
)
def create_new_skill(
    skill_data: SkillCreateSchema,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(["admin"])),
):
    try:
        skill = create_skill(db, skill_data)

        return {
            "message": "Skill created",
            "skill_id": str(skill.id),
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


# ADD SKILL TO CURRENT USER
@router.post("/me")
def add_skill(
    skill_data: UserSkillCreateSchema,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    try:
        user_skill = add_skill_to_user(db, current_user, skill_data)

        return {
            "message": "Skill added to profile",
            "user_skill_id": str(user_skill.id),
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


# UPDATE CURRENT USER SKILL
@router.put("/me/{skill_id}")
def update_skill_progress(
    skill_id: str,
    update_data: UserSkillUpdateSchema,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    try:
        updated_skill = update_user_skill(
            db,
            current_user,
            skill_id,
            update_data,
        )

        return {
            "message": "Skill updated",
            "xp": updated_skill.xp,
            "level": updated_skill.level,
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))