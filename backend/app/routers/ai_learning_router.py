
from fastapi import APIRouter, Depends, HTTPException
from typing import Optional
from pydantic import BaseModel

from app.dependencies.current_user import get_current_user
from app.models.user import User

from app.services.ai.ai_learning_service import (
    generate_ai_learning_content,
    generate_ai_chat_answer,
    check_ai_practice_answer,
)

router = APIRouter(
    prefix="/ai-learning",
    tags=["AI Learning"],
)


class AILearningRequest(BaseModel):
    role: str
    skill: str
    concept: str
    type: Optional[str] = "learning"


class AIChatRequest(BaseModel):
    role: str
    skill: str
    concept: str
    question: str
    type: Optional[str] = "learning"


class AICheckAnswerRequest(BaseModel):
    role: str
    skill: str
    concept: str
    question: str
    expected_solution: str
    student_answer: str
    attempt: int
    type: Optional[str] = "learning"



@router.post("/generate")
def generate_learning_content(
    data: AILearningRequest,
    current_user: User = Depends(get_current_user),
):
    try:
        return generate_ai_learning_content(
            role=data.role,
            skill=data.skill,
            concept=data.concept,
            content_type=data.type,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/chat")
def chat_with_ai_teacher(
    data: AIChatRequest,
    current_user: User = Depends(get_current_user),
):
    try:
        return generate_ai_chat_answer(
            role=data.role,
            skill=data.skill,
            concept=data.concept,
            question=data.question,
            content_type=data.type,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/check-answer")
def check_practice_answer(
    data: AICheckAnswerRequest,
    current_user: User = Depends(get_current_user),
):
    try:
        return check_ai_practice_answer(
            role=data.role,
            skill=data.skill,
            concept=data.concept,
            question=data.question,
            expected_solution=data.expected_solution,
            student_answer=data.student_answer,
            attempt=data.attempt,
            content_type=data.type,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))