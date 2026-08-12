from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from uuid import uuid4
from datetime import datetime
import random
import re

router = APIRouter(prefix="/interview", tags=["Interview Room"])

INTERVIEW_SESSIONS: Dict[str, Dict[str, Any]] = {}


class StartInterviewRequest(BaseModel):
    role: str = Field(..., min_length=2)
    skill: Optional[str] = None
    difficulty: Optional[str] = "medium"
    total_questions: Optional[int] = 5
    user_id: Optional[str] = None
    roadmap_skills: Optional[List[str]] = []


class SubmitAnswerRequest(BaseModel):
    session_id: str
    question_id: str
    answer: str
    language: Optional[str] = None


def normalize(value: Optional[str]) -> str:
    if not value:
        return ""
    return re.sub(r"\s+", " ", value.strip().lower())


def clean_answer(value: str) -> str:
    value = value.lower().strip()
    value = re.sub(r"\s+", " ", value)
    return value.replace("`", "").replace(";", "")


def hide_solution(question: Dict[str, Any]) -> Dict[str, Any]:
    q = dict(question)
    q.pop("solution_keywords", None)
    q.pop("ideal_answer", None)
    q.pop("strict_required", None)
    return q


def get_question_by_id(question_id: str):
    return next((q for q in QUESTION_BANK if q["id"] == question_id), None)


def get_next_question(session: Dict[str, Any]):
    index = session["current_index"]
    if index >= len(session["questions"]):
        return None
    return hide_solution(get_question_by_id(session["questions"][index]))


def match_question_pool(role: str, skill: Optional[str], difficulty: str, roadmap_skills: List[str]):
    role_l = normalize(role)
    skill_l = normalize(skill)
    diff_l = normalize(difficulty)

    roadmap_set = {normalize(s) for s in roadmap_skills if s}

    pool = []

    for q in QUESTION_BANK:
        q_role = normalize(q["role"])
        q_skill = normalize(q["skill"])
        q_diff = normalize(q["difficulty"])

        if q_role != role_l:
            continue

        if roadmap_set and q_skill not in roadmap_set:
            continue

        if skill_l and q_skill != skill_l:
            continue

        if q_diff == diff_l:
            pool.append(q)

    if not pool:
        for q in QUESTION_BANK:
            q_role = normalize(q["role"])
            q_skill = normalize(q["skill"])

            if q_role != role_l:
                continue

            if roadmap_set and q_skill not in roadmap_set:
                continue

            if skill_l and q_skill != skill_l:
                continue

            pool.append(q)

    return pool


def evaluate_answer(question: Dict[str, Any], user_answer: str):
    answer = clean_answer(user_answer)

    if not answer:
        return {
            "is_correct": False,
            "score": 0,
            "feedback": "Answer cannot be empty.",
            "hint": "Write a proper solution before submitting.",
        }

    keywords = question.get("solution_keywords", [])
    strict_required = question.get("strict_required", [])

    matched = 0
    missing = []

    for keyword in keywords:
        if clean_answer(keyword) in answer:
            matched += 1
        else:
            missing.append(keyword)

    strict_missing = [
        keyword for keyword in strict_required
        if clean_answer(keyword) not in answer
    ]

    score = round((matched / max(len(keywords), 1)) * 100)
    is_correct = score >= 65 and not strict_missing

    if is_correct:
        return {
            "is_correct": True,
            "score": score,
            "feedback": "Correct. Moving to next question.",
            "hint": "",
        }

    hint_items = strict_missing[:2] if strict_missing else missing[:2]

    return {
        "is_correct": False,
        "score": score,
        "feedback": "Not correct yet. Improve your answer.",
        "hint": "Include: " + ", ".join(hint_items) if hint_items else "Add more complete explanation.",
    }


QUESTION_BANK: List[Dict[str, Any]] = [
    {
        "id": "da_sql_001",
        "role": "Data Analyst",
        "skill": "SQL",
        "question_type": "practical",
        "answer_ui": "sql_editor",
        "difficulty": "medium",
        "company_tag": "Microsoft",
        "title": "Monthly Revenue",
        "question": "Write SQL to calculate total revenue for each month from the orders table.",
        "given_data": {
            "schema": "orders(order_id INT, order_date DATE, amount INT)",
            "columns": ["order_id", "order_date", "amount"],
            "rows": [
                [1, "2025-01-10", 500],
                [2, "2025-01-20", 700],
                [3, "2025-02-01", 300],
            ],
        },
        "solution_keywords": ["select", "sum", "amount", "group by", "order_date"],
        "strict_required": ["sum", "group by"],
        "ideal_answer": "SELECT DATE_FORMAT(order_date, '%Y-%m') AS month, SUM(amount) AS total_revenue FROM orders GROUP BY DATE_FORMAT(order_date, '%Y-%m');",
    },
    {
        "id": "da_sql_002",
        "role": "Data Analyst",
        "skill": "SQL",
        "question_type": "practical",
        "answer_ui": "sql_editor",
        "difficulty": "medium",
        "company_tag": "Amazon",
        "title": "Second Highest Salary",
        "question": "Write SQL to find the second highest salary from employees.",
        "given_data": {
            "schema": "employees(emp_id INT, name VARCHAR, salary INT)",
            "columns": ["emp_id", "name", "salary"],
            "rows": [
                [1, "Amit", 50000],
                [2, "Riya", 70000],
                [3, "John", 60000],
            ],
        },
        "solution_keywords": ["select", "salary", "order by", "desc", "limit", "offset"],
        "strict_required": ["order by", "desc"],
        "ideal_answer": "SELECT salary FROM employees ORDER BY salary DESC LIMIT 1 OFFSET 1;",
    },
    {
        "id": "da_excel_001",
        "role": "Data Analyst",
        "skill": "Excel",
        "question_type": "practical",
        "answer_ui": "spreadsheet",
        "difficulty": "easy",
        "company_tag": "",
        "title": "Calculate Total Sales",
        "question": "Write an Excel formula to calculate total sales from Quantity and Price.",
        "given_data": {
            "columns": ["Product", "Quantity", "Price"],
            "rows": [["A", 2, 100], ["B", 3, 200]],
        },
        "solution_keywords": ["=", "*"],
        "strict_required": ["="],
        "ideal_answer": "=B2*C2",
    },
    {
        "id": "fe_react_001",
        "role": "Frontend Developer",
        "skill": "React",
        "question_type": "coding",
        "answer_ui": "code_editor",
        "difficulty": "medium",
        "company_tag": "Google",
        "title": "Search Filter Component",
        "question": "Create a React component that filters users by search text.",
        "given_data": {
            "constraints": [
                "Use useState",
                "Case-insensitive search",
                "Do not mutate original array",
            ],
        },
        "solution_keywords": ["useState", "filter", "toLowerCase", "map", "input", "onChange"],
        "strict_required": ["useState", "filter"],
        "ideal_answer": "Use useState, filter, toLowerCase, input onChange, and map filtered users.",
    },
    {
        "id": "fe_js_001",
        "role": "Frontend Developer",
        "skill": "JavaScript",
        "question_type": "coding",
        "answer_ui": "code_editor",
        "difficulty": "medium",
        "company_tag": "Amazon",
        "title": "Debounce Function",
        "question": "Write a JavaScript debounce function.",
        "given_data": {
            "constraints": [
                "Delay execution",
                "Clear previous timer",
                "Accept function and delay",
            ],
        },
        "solution_keywords": ["function", "setTimeout", "clearTimeout", "return", "delay"],
        "strict_required": ["setTimeout", "clearTimeout"],
        "ideal_answer": "function debounce(fn, delay) { let timer; return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay); }; }",
    },
    {
        "id": "be_fastapi_001",
        "role": "Backend Developer",
        "skill": "FastAPI",
        "question_type": "coding",
        "answer_ui": "code_editor",
        "difficulty": "medium",
        "company_tag": "",
        "title": "Protected API Route",
        "question": "Write a FastAPI protected route using Depends.",
        "given_data": {
            "constraints": ["Use Depends", "Use current_user dependency"],
        },
        "solution_keywords": ["FastAPI", "Depends", "router", "current_user", "return"],
        "strict_required": ["Depends"],
        "ideal_answer": "@router.get('/me') def me(current_user=Depends(get_current_user)): return current_user",
    },
]


@router.get("/roles")
def get_interview_roles():
    roles = {}

    for q in QUESTION_BANK:
        roles.setdefault(q["role"], set()).add(q["skill"])

    return {
        "roles": [
            {"role": role, "skills": sorted(list(skills))}
            for role, skills in roles.items()
        ],
        "total_questions": len(QUESTION_BANK),
    }


@router.post("/start")
def start_interview(payload: StartInterviewRequest):
    total = max(1, min(payload.total_questions or 5, 10))

    pool = match_question_pool(
        role=payload.role,
        skill=payload.skill,
        difficulty=payload.difficulty or "medium",
        roadmap_skills=payload.roadmap_skills or [],
    )

    if not pool:
        raise HTTPException(
            status_code=404,
            detail=f"No questions found for role '{payload.role}' and roadmap skills.",
        )

    random.SystemRandom().shuffle(pool)

    selected = pool[: min(total, len(pool))]
    session_id = str(uuid4())

    INTERVIEW_SESSIONS[session_id] = {
        "session_id": session_id,
        "user_id": payload.user_id,
        "role": payload.role,
        "skill": payload.skill,
        "difficulty": payload.difficulty,
        "questions": [q["id"] for q in selected],
        "current_index": 0,
        "answers": [],
        "correct_count": 0,
        "completed": False,
        "verified": False,
        "started_at": datetime.utcnow().isoformat(),
        "completed_at": None,
    }

    return {
        "session_id": session_id,
        "role": payload.role,
        "skill": payload.skill,
        "difficulty": payload.difficulty,
        "total_questions": len(selected),
        "current_question_number": 1,
        "question": get_next_question(INTERVIEW_SESSIONS[session_id]),
    }


@router.post("/submit-answer")
def submit_answer(payload: SubmitAnswerRequest):
    session = INTERVIEW_SESSIONS.get(payload.session_id)

    if not session:
        raise HTTPException(status_code=404, detail="Interview session not found.")

    if session["completed"]:
        return {
            "completed": True,
            "completion_mark": "100%",
            "message": "Interview already completed.",
        }

    current_question = get_next_question(session)

    if not current_question:
        session["completed"] = True
        session["verified"] = True
        session["completed_at"] = datetime.utcnow().isoformat()
        return {"completed": True, "completion_mark": "100%"}

    if payload.question_id != current_question["id"]:
        raise HTTPException(status_code=409, detail="Question mismatch. Restart interview.")

    full_question = get_question_by_id(payload.question_id)
    result = evaluate_answer(full_question, payload.answer)

    session["answers"].append({
        "question_id": payload.question_id,
        "answer": payload.answer,
        "language": payload.language,
        "score": result["score"],
        "is_correct": result["is_correct"],
        "submitted_at": datetime.utcnow().isoformat(),
    })

    if not result["is_correct"]:
        return {
            "completed": False,
            "is_correct": False,
            "score": result["score"],
            "feedback": result["feedback"],
            "hint": result["hint"],
            "current_question_number": session["current_index"] + 1,
            "total_questions": len(session["questions"]),
        }

    session["correct_count"] += 1
    session["current_index"] += 1

    next_question = get_next_question(session)

    if not next_question:
        session["completed"] = True
        session["verified"] = True
        session["completed_at"] = datetime.utcnow().isoformat()

        return {
            "completed": True,
            "is_correct": True,
            "score": result["score"],
            "feedback": "Correct. Interview completed.",
            "completion_mark": "100%",
            "correct_count": session["correct_count"],
            "total_questions": len(session["questions"]),
            "verified": True,
        }

    return {
        "completed": False,
        "is_correct": True,
        "score": result["score"],
        "feedback": result["feedback"],
        "current_question_number": session["current_index"] + 1,
        "total_questions": len(session["questions"]),
        "next_question": next_question,
    }


@router.get("/session/{session_id}")
def get_session(session_id: str):
    session = INTERVIEW_SESSIONS.get(session_id)

    if not session:
        raise HTTPException(status_code=404, detail="Interview session not found.")

    return {
        "session_id": session["session_id"],
        "role": session["role"],
        "skill": session["skill"],
        "difficulty": session["difficulty"],
        "current_question_number": min(session["current_index"] + 1, len(session["questions"])),
        "total_questions": len(session["questions"]),
        "correct_count": session["correct_count"],
        "completed": session["completed"],
        "verified": session["verified"],
        "question": None if session["completed"] else get_next_question(session),
    }