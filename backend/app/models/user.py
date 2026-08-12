from sqlalchemy import (
    Column,
    String,
    Integer,
    Boolean,
    ForeignKey,
    Text,
    Float
)

from sqlalchemy.orm import relationship

from app.core.database import Base
from app.db.mixins import UUIDMixin, TimestampMixin


class User(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "users"

    full_name = Column(
        String(100),
        nullable=False
    )

    username = Column(
        String(50),
        unique=True,
        nullable=False
    )

    email = Column(
        String(255),
        unique=True,
        nullable=False,
        index=True
    )

    password_hash = Column(
        String(255),
        nullable=False
    )

    profile_image = Column(
        String(500),
        nullable=True
    )

    bio = Column(
        Text,
        nullable=True
    )

    github_url = Column(
        String(500),
        nullable=True
    )

    linkedin_url = Column(
        String(500),
        nullable=True
    )

    resume_url = Column(
        String(500),
        nullable=True
    )

    xp = Column(
        Integer,
        default=0
    )

    level = Column(
        Integer,
        default=1
    )

    streak = Column(
        Integer,
        default=0
    )

    # Nexvora Rating System
    nexvora_rating = Column(
        Integer,
        default=1200
    )

    contest_rating = Column(
        Integer,
        default=1200
    )

    # Problem Solving Stats
    problems_solved = Column(
        Integer,
        default=0
    )

    easy_solved = Column(
        Integer,
        default=0
    )

    medium_solved = Column(
        Integer,
        default=0
    )

    hard_solved = Column(
        Integer,
        default=0
    )

    # Career Profile
    target_role = Column(
        String(100),
        nullable=True
    )

    experience_level = Column(
        String(50),
        nullable=True,
        default="beginner"
    )

    portfolio_url = Column(
        String(500),
        nullable=True
    )

    # SDE Readiness score (0-100)
    readiness_score = Column(
        Float,
        default=0.0
    )

    is_verified = Column(
        Boolean,
        default=False
    )

    is_active = Column(
        Boolean,
        default=True
    )

    # Role relationship
    role_id = Column(
        ForeignKey("roles.id"),
        nullable=False
    )

    role = relationship(
        "Role",
        back_populates="users"
    )
    
    skills = relationship(
    "UserSkill",
    back_populates="user"
)

    def __repr__(self):
        return f"<User(email={self.email})>"