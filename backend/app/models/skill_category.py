from sqlalchemy import (
    Column,
    String,
    Text
)

from sqlalchemy.orm import relationship

from app.core.database import Base
from app.db.mixins import (
    UUIDMixin,
    TimestampMixin
)


class SkillCategory(
    Base,
    UUIDMixin,
    TimestampMixin
):
    __tablename__ = "skill_categories"

    name = Column(
        String(100),
        unique=True,
        nullable=False
    )

    description = Column(
        Text,
        nullable=True
    )

    skills = relationship(
        "Skill",
        back_populates="category"
    )

    def __repr__(self):

        return (
            f"<SkillCategory(name={self.name})>"
        )