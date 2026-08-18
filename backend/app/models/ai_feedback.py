from sqlalchemy import Column, String, Integer, Text, Float, ForeignKey, JSON
from sqlalchemy.orm import relationship
from app.core.database import Base
from app.db.mixins import UUIDMixin, TimestampMixin


class AIFeedback(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "ai_feedbacks"

    user_id = Column(ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    module_type = Column(String(50), nullable=False)  # resume, interview, code_review
    score = Column(Float, default=0.0)
    strengths = Column(JSON, default=list)
    improvements = Column(JSON, default=list)
    raw_response = Column(Text, nullable=True)

    user = relationship("User")

    def __repr__(self):
        return f"<AIFeedback(module='{self.module_type}', score={self.score})>"


class ResumeAnalysis(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "resume_analyses"

    user_id = Column(ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    target_role = Column(String(100), nullable=False)
    overall_score = Column(Float, default=0.0)
    skills_match = Column(JSON, default=dict)
    missing_keywords = Column(JSON, default=list)
    formatting_feedback = Column(Text, nullable=True)
    summary_feedback = Column(Text, nullable=True)

    user = relationship("User")

    def __repr__(self):
        return f"<ResumeAnalysis(target_role='{self.target_role}', score={self.overall_score})>"


class MockInterviewSession(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "mock_interview_sessions"

    user_id = Column(ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    role_title = Column(String(100), nullable=False)
    status = Column(String(50), default="completed")
    overall_score = Column(Float, default=0.0)
    transcript = Column(JSON, default=list)
    feedback_notes = Column(Text, nullable=True)

    user = relationship("User")

    def __repr__(self):
        return f"<MockInterviewSession(role='{self.role_title}', status='{self.status}')>"
