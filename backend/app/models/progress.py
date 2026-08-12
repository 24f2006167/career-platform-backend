"""
Nexvora — User Progress Model

Tracks per-topic skill proficiency, lesson completions,
and drives the dynamic roadmap engine.
"""

from sqlalchemy import Column, String, Integer, Float, Boolean, ForeignKey, Text, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from app.core.database import Base
from app.db.mixins import UUIDMixin, TimestampMixin


class UserProgress(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "user_progress"

    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)

    # Topic / Skill being tracked e.g. "dsa_graphs", "system_design", "os"
    topic_key = Column(String(100), nullable=False)
    topic_name = Column(String(150), nullable=False)
    category = Column(String(100), nullable=True)  # "dsa", "cs_fundamentals", "backend", etc.

    # Proficiency 0-100
    proficiency = Column(Float, default=0.0)

    # Problems attempted / solved in this topic
    problems_attempted = Column(Integer, default=0)
    problems_solved = Column(Integer, default=0)

    # Lessons / modules completed
    lessons_completed = Column(Integer, default=0)
    total_lessons = Column(Integer, default=0)

    # Is this area identified as a weakness (below 50%)?
    is_weakness = Column(Boolean, default=False)

    # Recommended next topics
    next_recommendations = Column(JSON, nullable=True, default=list)

    user = relationship("User", backref="progress")

    def __repr__(self):
        return f"<UserProgress(user={self.user_id}, topic={self.topic_key}, proficiency={self.proficiency})>"


class Contest(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "contests"

    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)
    duration_minutes = Column(Integer, default=90)

    # ISO datetime strings stored as text for simplicity
    start_time = Column(String(50), nullable=True)
    end_time = Column(String(50), nullable=True)

    status = Column(String(20), default="upcoming")  # upcoming | active | ended

    # JSON array of problem IDs
    problem_ids = Column(JSON, nullable=True, default=list)

    is_rated = Column(Boolean, default=True)
    max_participants = Column(Integer, nullable=True)

    participants = relationship("ContestParticipant", back_populates="contest", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Contest(title={self.title}, status={self.status})>"


class ContestParticipant(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "contest_participants"

    contest_id = Column(UUID(as_uuid=True), ForeignKey("contests.id", ondelete="CASCADE"), nullable=False, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)

    score = Column(Integer, default=0)
    rank = Column(Integer, nullable=True)
    penalty_seconds = Column(Integer, default=0)  # for ICPC-style scoring
    problems_solved = Column(Integer, default=0)
    rating_change = Column(Integer, default=0)

    # Per-problem submission record
    problem_results = Column(JSON, nullable=True, default=dict)

    contest = relationship("Contest", back_populates="participants")
    user = relationship("User", backref="contest_participations")

    def __repr__(self):
        return f"<ContestParticipant(user={self.user_id}, contest={self.contest_id}, score={self.score})>"
