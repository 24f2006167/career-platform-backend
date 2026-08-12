from sqlalchemy import (
    Column,
    String,
    Text,
    DateTime,
    ForeignKey,
    Boolean
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from app.core.database import Base
from app.db.mixins import UUIDMixin, TimestampMixin


class Achievement(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "achievements"

    name = Column(
        String(100),
        unique=True,
        nullable=False
    )

    description = Column(
        Text,
        nullable=True
    )

    # Emoji or icon name e.g. "🏆" or "first_problem"
    icon = Column(
        String(50),
        nullable=True
    )

    # Badge category e.g. "streak", "problems", "contest", "system"
    category = Column(
        String(50),
        nullable=True
    )

    is_active = Column(
        Boolean,
        default=True
    )

    def __repr__(self):
        return f"<Achievement(name={self.name})>"


class UserAchievement(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "user_achievements"

    user_id = Column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )

    achievement_id = Column(
        UUID(as_uuid=True),
        ForeignKey("achievements.id", ondelete="CASCADE"),
        nullable=False
    )

    user = relationship("User", backref="achievements")
    achievement = relationship("Achievement")

    def __repr__(self):
        return f"<UserAchievement(user={self.user_id}, achievement={self.achievement_id})>"
