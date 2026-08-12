from sqlalchemy import (
    Column,
    String,
    Text,
    Integer,
    Float,
    ForeignKey,
    JSON
)

from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID

from app.core.database import Base
from app.db.mixins import UUIDMixin, TimestampMixin


class Submission(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "submissions"

    user_id = Column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )

    problem_id = Column(
        UUID(as_uuid=True),
        ForeignKey("problems.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )

    # Programming language
    language = Column(
        String(30),
        nullable=False,
        default="python"
        # "python" | "cpp" | "java" | "javascript" | "go"
    )

    # The submitted source code
    code = Column(
        Text,
        nullable=False
    )

    # Submission status
    status = Column(
        String(30),
        nullable=False,
        default="pending"
        # "pending" | "accepted" | "wrong_answer" | "time_limit_exceeded"
        # "memory_limit_exceeded" | "runtime_error" | "compilation_error"
    )

    # Runtime in milliseconds
    runtime_ms = Column(
        Integer,
        nullable=True
    )

    # Memory used in kilobytes
    memory_kb = Column(
        Integer,
        nullable=True
    )

    # Test cases passed / total
    test_cases_passed = Column(
        Integer,
        nullable=True,
        default=0
    )

    total_test_cases = Column(
        Integer,
        nullable=True,
        default=0
    )

    # Score (0-100)
    score = Column(
        Float,
        nullable=True,
        default=0.0
    )

    # Error message (for failed submissions)
    error_message = Column(
        Text,
        nullable=True
    )

    # AI-generated code explanation (populated lazily)
    ai_explanation = Column(
        Text,
        nullable=True
    )

    # Per-test-case results (JSON array)
    test_results = Column(
        JSON,
        nullable=True,
        default=list
        # [{"test_id": "...", "passed": True, "runtime_ms": 42, "output": "..."}]
    )

    user = relationship(
        "User",
        backref="submissions"
    )

    problem = relationship(
        "Problem",
        backref="submissions"
    )

    def __repr__(self):
        return f"<Submission(user={self.user_id}, problem={self.problem_id}, status={self.status})>"
