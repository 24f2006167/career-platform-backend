from sqlalchemy import (
    Column,
    String,
    Text,
    Integer,
    Boolean,
    ForeignKey
)

from sqlalchemy.orm import relationship

from app.core.database import Base
from app.db.mixins import UUIDMixin, TimestampMixin


class TestCase(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "test_cases"

    problem_id = Column(
        ForeignKey("problems.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )

    # The raw input for this test case
    input_data = Column(
        Text,
        nullable=False
    )

    # Expected output
    expected_output = Column(
        Text,
        nullable=False
    )

    # If True, input/output are hidden from users (used for judging only)
    is_hidden = Column(
        Boolean,
        default=True
    )

    # Order for display / execution
    order_index = Column(
        Integer,
        default=0
    )

    # Explanation shown for public test cases
    explanation = Column(
        Text,
        nullable=True
    )

    problem = relationship(
        "Problem",
        backref="test_cases"
    )

    def __repr__(self):
        return f"<TestCase(problem_id={self.problem_id}, hidden={self.is_hidden})>"
