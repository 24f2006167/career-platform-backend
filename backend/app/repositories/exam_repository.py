from typing import List, Optional, Tuple
from sqlalchemy.orm import Session
from app.models.exam import Exam, Question, Option, ExamResult


class ExamRepository:
    """
    Data Access Repository for Exam and Quiz entities.
    """

    def __init__(self, db: Session):
        self.db = db

    def get_exam_by_id(self, exam_id: str) -> Optional[Exam]:
        return self.db.query(Exam).filter(Exam.id == exam_id).first()

    def get_exam_by_slug(self, slug: str) -> Optional[Exam]:
        return self.db.query(Exam).filter(Exam.slug == slug).first()

    def list_exams(self, active_only: bool = True, skip: int = 0, limit: int = 20) -> Tuple[List[Exam], int]:
        query = self.db.query(Exam)
        if active_only:
            query = query.filter(Exam.is_active.is_(True))
        total = query.count()
        exams = query.offset(skip).limit(limit).all()
        return exams, total

    def create_exam(self, exam: Exam) -> Exam:
        self.db.add(exam)
        self.db.commit()
        self.db.refresh(exam)
        return exam

    def add_question(self, question: Question) -> Question:
        self.db.add(question)
        self.db.commit()
        self.db.refresh(question)
        return question

    def add_option(self, option: Option) -> Option:
        self.db.add(option)
        self.db.commit()
        self.db.refresh(option)
        return option

    def create_result(self, result: ExamResult) -> ExamResult:
        self.db.add(result)
        self.db.commit()
        self.db.refresh(result)
        return result

    def get_user_exam_results(self, user_id: str) -> List[ExamResult]:
        return self.db.query(ExamResult).filter(ExamResult.user_id == user_id).all()
