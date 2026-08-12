from sqlalchemy import (
    Column,
    String,
    Text,
    ForeignKey
)

from sqlalchemy.orm import relationship

from app.core.database import Base

from app.db.mixins import (
    UUIDMixin,
    TimestampMixin
)


class Skill(
    Base,
    UUIDMixin,
    TimestampMixin
):
    __tablename__ = "skills"

    name = Column(
        String(100),
        unique=True,
        nullable=False
    )

    description = Column(
        Text,
        nullable=True
    )

    category_id = Column(
        ForeignKey("skill_categories.id"),
        nullable=False
    )

    category = relationship(
        "SkillCategory",
        back_populates="skills"
    )

    users = relationship(
        "UserSkill",
        back_populates="skill"
    )

    def __repr__(self):

        return f"<Skill(name={self.name})>"