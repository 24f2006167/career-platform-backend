from sqlalchemy import (
    Column,
    Integer,
    Boolean,
    ForeignKey
)

from sqlalchemy.orm import relationship

from app.core.database import Base

from app.db.mixins import (
    UUIDMixin,
    TimestampMixin
)


class UserSkill(
    Base,
    UUIDMixin,
    TimestampMixin
):
    __tablename__ = "user_skills"

    user_id = Column(
        ForeignKey("users.id"),
        nullable=False
    )

    skill_id = Column(
        ForeignKey("skills.id"),
        nullable=False
    )

    level = Column(
        Integer,
        default=1
    )

    xp = Column(
        Integer,
        default=0
    )

    is_verified = Column(
        Boolean,
        default=False
    )

    user = relationship(
        "User",
        back_populates="skills"
    )

    skill = relationship(
        "Skill",
        back_populates="users"
    )

    def __repr__(self):

        return (
            f"<UserSkill(user_id={self.user_id}, "
            f"skill_id={self.skill_id})>"
        )
    