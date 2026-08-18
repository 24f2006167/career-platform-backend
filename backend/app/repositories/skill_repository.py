from typing import List, Optional, Tuple
from sqlalchemy.orm import Session
from app.models.skill import Skill
from app.models.skill_category import SkillCategory
from app.models.user_skill import UserSkill


class SkillRepository:
    """
    Data Access Repository for Skill and SkillCategory entities.
    """

    def __init__(self, db: Session):
        self.db = db

    def get_skill_by_id(self, skill_id: str) -> Optional[Skill]:
        return self.db.query(Skill).filter(Skill.id == skill_id).first()

    def get_skill_by_name(self, name: str) -> Optional[Skill]:
        return self.db.query(Skill).filter(Skill.name.ilike(name.strip())).first()

    def list_skills(self, category_id: Optional[str] = None, skip: int = 0, limit: int = 50) -> Tuple[List[Skill], int]:
        query = self.db.query(Skill)
        if category_id:
            query = query.filter(Skill.category_id == category_id)
        total = query.count()
        skills = query.offset(skip).limit(limit).all()
        return skills, total

    def create_skill(self, skill: Skill) -> Skill:
        self.db.add(skill)
        self.db.commit()
        self.db.refresh(skill)
        return skill

    def get_category_by_id(self, category_id: str) -> Optional[SkillCategory]:
        return self.db.query(SkillCategory).filter(SkillCategory.id == category_id).first()

    def list_categories(self) -> List[SkillCategory]:
        return self.db.query(SkillCategory).all()

    def create_category(self, category: SkillCategory) -> SkillCategory:
        self.db.add(category)
        self.db.commit()
        self.db.refresh(category)
        return category

    def get_user_skills(self, user_id: str) -> List[UserSkill]:
        return self.db.query(UserSkill).filter(UserSkill.user_id == user_id).all()
