from pydantic import BaseModel, Field
from uuid import UUID
from typing import Optional


class UserSkillCreateSchema(BaseModel):

    skill_id: UUID


class UserSkillUpdateSchema(BaseModel):

    xp: Optional[int] = Field(
        default=None,
        ge=0
    )

    level: Optional[int] = Field(
        default=None,
        ge=1
    )