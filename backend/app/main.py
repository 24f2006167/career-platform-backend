from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.core.database import SessionLocal, Base, engine
from app.core.exceptions import register_exception_handlers
from app.middleware.auth_middleware import AuthMiddleware
from app.middleware.logging_middleware import LoggingMiddleware
from app.middleware.rate_limit_middleware import RateLimitMiddleware
from app.routers.interview_router import router as interview_router
from app.routers.candidate_role_router import router as candidate_role_router
# IMPORT ALL MODELS BEFORE create_all
from app.models.user import User
from app.models.role import Role
from app.models.skill import Skill
from app.models.skill_category import SkillCategory
from app.models.user_skill import UserSkill
from app.models.roadmap import Roadmap, RoadmapStep
from app.models.problem import Problem
from app.models.test_case import TestCase
from app.models.submission import Submission
from app.models.achievement import Achievement, UserAchievement
from app.models.progress import UserProgress, Contest, ContestParticipant
from app.models.exam import Exam, Question, Option, ExamResult
from app.models.leaderboard import LeaderboardSnapshot
from app.models.ai_feedback import AIFeedback, ResumeAnalysis, MockInterviewSession

from app.utils.security import hash_password

from app.routers.auth_router import router as auth_router
from app.routers.skill_router import router as skill_router
from app.routers.ai_learning_router import router as ai_learning_router
from app.routers.admin_router import router as admin_router
from app.routers.role_router import router as role_router
from app.routers.resume_router import router as resume_router
from app.api.v1.problems.router import router as problems_router
from app.api.v1.submissions.router import router as submissions_router
from app.api.v1.profile.router import router as profile_router
from app.api.v1.leaderboard.router import router as leaderboard_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Nexvora AI Career Platform",
    version="1.0.0",
    description="AI-powered career roadmap, learning, testing, and admin management platform.",
)

register_exception_handlers(app)

app.add_middleware(LoggingMiddleware)
app.add_middleware(AuthMiddleware)
app.add_middleware(RateLimitMiddleware, requests_per_minute=200)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def create_admin():
    db: Session = SessionLocal()

    try:
        admin_email = "laptop18122022@gmail.com"

        admin_role = db.query(Role).filter(Role.name == "admin").first()

        if not admin_role:
            admin_role = Role(
                name="admin",
                description="Platform Administrator",
            )
            db.add(admin_role)
            db.commit()
            db.refresh(admin_role)

        existing_admin = db.query(User).filter(User.email == admin_email).first()

        if not existing_admin:
            admin = User(
                full_name="Platform Owner",
                username="admin",
                email=admin_email,
                password_hash=hash_password("Admin@123"),
                role_id=admin_role.id,
            )
            db.add(admin)
            db.commit()

    except Exception as e:
        print("Admin creation failed:", str(e))

    finally:
        db.close()


create_admin()

app.include_router(auth_router)
app.include_router(skill_router)
app.include_router(ai_learning_router)
app.include_router(admin_router)
app.include_router(role_router)
app.include_router(resume_router)
app.include_router(interview_router)
app.include_router(problems_router)
app.include_router(submissions_router)
app.include_router(profile_router)
app.include_router(leaderboard_router)
app.include_router(candidate_role_router)


@app.get("/")
def home():
    return {
        "message": "Backend Running Successfully",
        "app": "Nexvora AI Career Platform",
        "version": "1.0.0",
        "status": "live",
        "docs": "/docs",
        "health": "/health",
    }


@app.get("/health")
def health_check():
    db: Session = SessionLocal()

    try:
        db.execute(text("SELECT 1"))
        database_status = "connected"
    except Exception:
        database_status = "error"
    finally:
        db.close()

    return {
        "status": "ok" if database_status == "connected" else "degraded",
        "backend": "running",
        "version": "2.0.0",
        "database": database_status,
        "ai_learning": "enabled",
        "admin": "enabled",
        "auth": "enabled",
        "resume_analyzer": "enabled",
        "coding_judge": "enabled",
        "interview_prep": "enabled",
    }