from app.core.database import Base

# Import all models for Alembic and SQLAlchemy registration

from app.models.user import User
from app.models.role import Role
from app.models.permission import Permission
from app.models.role_permission import RolePermission
from app.models.skill_category import SkillCategory
from app.models.skill import Skill
from app.models.user_skill import UserSkill