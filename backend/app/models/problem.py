from sqlalchemy import (
    Column,
    String,
    Text,
    Integer,
    Float,
    Boolean,
    JSON
)

from app.core.database import Base
from app.db.mixins import UUIDMixin, TimestampMixin


class Problem(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "problems"

    title = Column(
        String(200),
        nullable=False
    )

    slug = Column(
        String(200),
        unique=True,
        nullable=False,
        index=True
    )

    description = Column(
        Text,
        nullable=False
    )

    difficulty = Column(
        String(20),
        nullable=False,
        default="easy"
        # "easy" | "medium" | "hard"
    )

    # e.g. ["Array", "HashMap", "Two Pointer"]
    topic_tags = Column(
        JSON,
        nullable=True,
        default=list
    )

    # e.g. ["Google", "Amazon"]
    company_tags = Column(
        JSON,
        nullable=True,
        default=list
    )

    constraints = Column(
        Text,
        nullable=True
    )

    # Example inputs/outputs shown publicly
    examples = Column(
        JSON,
        nullable=True,
        default=list
        # [{"input": "...", "output": "...", "explanation": "..."}]
    )

    # Hints shown progressively by AI
    hints = Column(
        JSON,
        nullable=True,
        default=list
    )

    # Editorial/solution explanation (admin only)
    editorial = Column(
        Text,
        nullable=True
    )

    # Points awarded on acceptance
    points = Column(
        Integer,
        default=10
    )

    # Acceptance rate (recalculated periodically)
    acceptance_rate = Column(
        Float,
        default=0.0
    )

    total_submissions = Column(
        Integer,
        default=0
    )

    total_accepted = Column(
        Integer,
        default=0
    )

    is_active = Column(
        Boolean,
        default=True
    )

    is_premium = Column(
        Boolean,
        default=False
    )

    def __repr__(self):
        return f"<Problem(slug={self.slug}, difficulty={self.difficulty})>"
