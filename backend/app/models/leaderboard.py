from sqlalchemy import Column, String, Integer, Float, ForeignKey, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.core.database import Base
from app.db.mixins import UUIDMixin, TimestampMixin


class LeaderboardSnapshot(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "leaderboard_snapshots"

    period_type = Column(String(50), nullable=False, default="weekly")  # weekly, monthly, all_time
    user_id = Column(ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    rank = Column(Integer, nullable=False)
    xp_earned = Column(Integer, default=0)
    problems_solved = Column(Integer, default=0)
    rating = Column(Integer, default=1200)

    user = relationship("User")

    def __repr__(self):
        return f"<LeaderboardSnapshot(user_id='{self.user_id}', rank={self.rank})>"
