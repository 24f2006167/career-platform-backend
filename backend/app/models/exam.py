from sqlalchemy import Column, String, Integer, Text, Boolean, Float, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base
from app.db.mixins import UUIDMixin, TimestampMixin


class Exam(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "exams"

    title = Column(String(200), nullable=False)
    slug = Column(String(200), unique=True, nullable=False, index=True)
    description = Column(Text, nullable=True)
    duration_minutes = Column(Integer, default=60)
    passing_score = Column(Float, default=70.0)
    total_marks = Column(Integer, default=100)
    is_active = Column(Boolean, default=True)

    questions = relationship("Question", back_populates="exam", cascade="all, delete-orphan")
    results = relationship("ExamResult", back_populates="exam", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Exam(title='{self.title}')>"


class Question(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "questions"

    exam_id = Column(ForeignKey("exams.id", ondelete="CASCADE"), nullable=False)
    content = Column(Text, nullable=False)
    explanation = Column(Text, nullable=True)
    marks = Column(Integer, default=5)
    question_type = Column(String(50), default="multiple_choice")  # multiple_choice, single_choice

    exam = relationship("Exam", back_populates="questions")
    options = relationship("Option", back_populates="question", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Question(id='{self.id}')>"


class Option(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "options"

    question_id = Column(ForeignKey("questions.id", ondelete="CASCADE"), nullable=False)
    content = Column(Text, nullable=False)
    is_correct = Column(Boolean, default=False)

    question = relationship("Question", back_populates="options")

    def __repr__(self):
        return f"<Option(id='{self.id}', is_correct={self.is_correct})>"


class ExamResult(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "exam_results"

    exam_id = Column(ForeignKey("exams.id", ondelete="CASCADE"), nullable=False)
    user_id = Column(ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    score = Column(Float, nullable=False, default=0.0)
    total_questions = Column(Integer, default=0)
    correct_answers = Column(Integer, default=0)
    passed = Column(Boolean, default=False)

    exam = relationship("Exam", back_populates="results")
    user = relationship("User")

    def __repr__(self):
        return f"<ExamResult(user_id='{self.user_id}', score={self.score})>"
