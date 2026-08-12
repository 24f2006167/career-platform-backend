from sqlalchemy.orm import Session

from app.models.skill_category import SkillCategory
from app.models.skill import Skill
from app.models.user_skill import UserSkill
from app.models.user import User

from app.schemas.skill.skill_category_schema import (
    SkillCategoryCreateSchema
)

from app.schemas.skill.skill_schema import (
    SkillCreateSchema
)

from app.schemas.skill.user_skill_schema import (
    UserSkillCreateSchema,
    UserSkillUpdateSchema
)


# CREATE SKILL CATEGORY
def create_skill_category(
    db: Session,
    category_data: SkillCategoryCreateSchema
):

    clean_name = category_data.name.strip()

    existing_category = (
        db.query(SkillCategory)
        .filter(SkillCategory.name == clean_name)
        .first()
    )

    if existing_category:
        raise Exception(
            "Skill category already exists"
        )

    category = SkillCategory(
        name=clean_name,
        description=category_data.description
    )

    db.add(category)
    db.commit()
    db.refresh(category)

    return category


# CREATE SKILL
def create_skill(
    db: Session,
    skill_data: SkillCreateSchema
):

    clean_name = skill_data.name.strip()

    existing_skill = (
        db.query(Skill)
        .filter(Skill.name == clean_name)
        .first()
    )

    if existing_skill:
        raise Exception(
            "Skill already exists"
        )

    category = (
        db.query(SkillCategory)
        .filter(SkillCategory.id == skill_data.category_id)
        .first()
    )

    if not category:
        raise Exception(
            "Skill category not found"
        )

    skill = Skill(
        name=clean_name,
        description=skill_data.description,
        category_id=skill_data.category_id
    )

    db.add(skill)
    db.commit()
    db.refresh(skill)

    return skill


# ADD SKILL TO USER
def add_skill_to_user(
    db: Session,
    current_user: User,
    skill_data: UserSkillCreateSchema
):

    skill = (
        db.query(Skill)
        .filter(Skill.id == skill_data.skill_id)
        .first()
    )

    if not skill:
        raise Exception(
            "Skill not found"
        )

    existing_user_skill = (
        db.query(UserSkill)
        .filter(
            UserSkill.user_id == current_user.id,
            UserSkill.skill_id == skill_data.skill_id
        )
        .first()
    )

    if existing_user_skill:
        raise Exception(
            "Skill already added"
        )

    user_skill = UserSkill(
        user_id=current_user.id,
        skill_id=skill_data.skill_id
    )

    db.add(user_skill)
    db.commit()
    db.refresh(user_skill)

    return user_skill


# UPDATE USER SKILL
def update_user_skill(
    db: Session,
    current_user: User,
    skill_id,
    update_data: UserSkillUpdateSchema
):

    user_skill = (
        db.query(UserSkill)
        .filter(
            UserSkill.user_id == current_user.id,
            UserSkill.skill_id == skill_id
        )
        .first()
    )

    if not user_skill:
        raise Exception(
            "User skill not found"
        )

    if update_data.xp is not None:
        user_skill.xp = update_data.xp

    if update_data.level is not None:
        user_skill.level = update_data.level

    db.commit()
    db.refresh(user_skill)

    return user_skill