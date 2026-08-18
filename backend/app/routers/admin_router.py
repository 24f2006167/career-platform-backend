import os
import json
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from groq import Groq

from app.core.database import get_db
from app.dependencies.current_user import get_current_user
from app.models.user import User
from app.models.role import Role
from app.models.skill import Skill
from app.models.skill_category import SkillCategory
from app.utils.security import hash_password


router = APIRouter(
    prefix="/admin",
    tags=["Admin"],
)

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

SYSTEM_ROLES = ["admin", "candidate", "recruiter"]


class AdminJobRoleGenerateRequest(BaseModel):
    title: str
    description: Optional[str] = None


def require_admin(current_user: User):
    role_name = current_user.role.name.lower() if current_user.role else ""

    if role_name != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")


def fallback_role_skills(role_title: str):
    title = role_title.lower()

    if "data" in title or "analyst" in title:
        return [
            {"category": "Data", "skill": "Excel", "description": "Spreadsheet formulas, data cleaning, pivot tables, and reporting."},
            {"category": "Data", "skill": "SQL", "description": "Query databases, filter records, join tables, and aggregate data."},
            {"category": "Programming", "skill": "Python", "description": "Use Python for data analysis, automation, and visualization."},
            {"category": "Statistics", "skill": "Statistics", "description": "Understand averages, variance, correlation, probability, and business metrics."},
            {"category": "Visualization", "skill": "Power BI", "description": "Create dashboards, charts, KPIs, and business reports."},
        ]

    if "frontend" in title or "react" in title:
        return [
            {"category": "Frontend", "skill": "HTML", "description": "Build semantic webpage structure."},
            {"category": "Frontend", "skill": "CSS", "description": "Style layouts, responsive screens, and modern UI."},
            {"category": "Programming", "skill": "JavaScript", "description": "Add logic, events, DOM interaction, and app behavior."},
            {"category": "Frontend", "skill": "React", "description": "Build reusable components and interactive frontend apps."},
            {"category": "Frontend", "skill": "Next.js", "description": "Build production-ready React applications with routing and APIs."},
        ]

    return [
        {"category": "Career Foundation", "skill": "Communication", "description": "Explain ideas clearly and collaborate with teams."},
        {"category": "Career Foundation", "skill": "Problem Solving", "description": "Break problems into steps and solve them logically."},
        {"category": "Career Foundation", "skill": "Project Building", "description": "Build practical projects related to the selected job role."},
        {"category": "Career Foundation", "skill": "Interview Preparation", "description": "Prepare role-specific interview questions and answers."},
    ]


def generate_role_skills_with_ai(role_title: str, description: Optional[str]):
    prompt = f"""
You are an expert career roadmap designer.

Create required skills for this job role:

Job Role: {role_title}
Description: {description or "No description provided"}

Return ONLY valid JSON array.
Each item must have:
- category
- skill
- description

Rules:
- Generate 5 to 8 important skills.
- Skills must be practical for students.
- Avoid duplicate skills.
- Keep descriptions clear and short.
"""

    try:
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "system", "content": "Return only valid JSON. No markdown."},
                {"role": "user", "content": prompt},
            ],
            temperature=0.5,
        )

        result = json.loads(response.choices[0].message.content)

        if not isinstance(result, list) or len(result) == 0:
            return fallback_role_skills(role_title)

        return result

    except Exception as e:
        print("AI role skill generation failed:", str(e))
        return fallback_role_skills(role_title)


def get_or_create_category(db: Session, name: str, description: Optional[str] = None):
    category = db.query(SkillCategory).filter(SkillCategory.name.ilike(name)).first()

    if category:
        return category

    category = SkillCategory(
        name=name,
        description=description or f"Skills related to {name}.",
    )

    db.add(category)
    db.commit()
    db.refresh(category)

    return category


def get_or_create_skill(
    db: Session,
    name: str,
    description: Optional[str],
    category_id: Optional[str],
):

    skill = db.query(Skill).filter(Skill.name.ilike(name)).first()

    if skill:
        if description:
            skill.description = description
        if category_id:
            skill.category_id = category_id

        db.commit()
        db.refresh(skill)
        return skill, False

    skill = Skill(
        name=name,
        description=description,
        category_id=category_id,
    )

    db.add(skill)
    db.commit()
    db.refresh(skill)

    return skill, True


@router.get("/stats")
def get_admin_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    require_admin(current_user)

    career_roles_count = (
        db.query(Role)
        .filter(~Role.name.in_(SYSTEM_ROLES))
        .count()
    )

    return {
        "users": db.query(User).count(),
        "roles": career_roles_count,
        "skills": db.query(Skill).count(),
        "categories": db.query(SkillCategory).count(),
        "system_status": "Live",
        "database": "PostgreSQL",
    }


@router.get("/users")
def get_admin_users(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    require_admin(current_user)

    users = db.query(User).all()

    return [
        {
            "id": user.id,
            "full_name": user.full_name,
            "username": user.username,
            "email": user.email,
            "role": user.role.name if user.role else "unknown",
        }
        for user in users
    ]


@router.get("/job-roles")
def get_admin_job_roles(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    require_admin(current_user)

    roles = (
        db.query(Role)
        .filter(~Role.name.in_(SYSTEM_ROLES))
        .order_by(Role.name.asc())
        .all()
    )

    return [
        {
            "id": role.id,
            "name": role.name,
            "description": role.description,
        }
        for role in roles
    ]


@router.get("/skills")
def get_admin_skills(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    require_admin(current_user)

    skills = db.query(Skill).order_by(Skill.name.asc()).all()

    return [
        {
            "id": skill.id,
            "name": skill.name,
            "description": skill.description,
            "category": skill.category.name if skill.category else "Uncategorized",
        }
        for skill in skills
    ]


@router.get("/categories")
def get_admin_categories(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    require_admin(current_user)

    categories = db.query(SkillCategory).order_by(SkillCategory.name.asc()).all()

    return [
        {
            "id": category.id,
            "name": category.name,
            "description": category.description,
        }
        for category in categories
    ]


@router.post("/job-roles/generate")
def generate_job_role_with_skills(
    data: AdminJobRoleGenerateRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    require_admin(current_user)

    if not data.title.strip():
        raise HTTPException(status_code=400, detail="Job role title is required")

    clean_title = data.title.strip()

    if clean_title.lower() in SYSTEM_ROLES:
        raise HTTPException(
            status_code=400,
            detail="This is a system role. Please enter a career job role.",
        )

    role = db.query(Role).filter(Role.name.ilike(clean_title)).first()

    if not role:
        role = Role(
            name=clean_title,
            description=data.description or f"{clean_title} career role",
        )

        db.add(role)
        db.commit()
        db.refresh(role)

    generated_items = generate_role_skills_with_ai(
        role_title=clean_title,
        description=data.description,
    )

    saved_skills = []

    for item in generated_items:
        category_name = item.get("category", "Career Skills")
        skill_name = item.get("skill")
        skill_description = item.get("description")

        if not skill_name:
            continue

        category = get_or_create_category(
            db=db,
            name=category_name,
            description=f"Skills related to {category_name}.",
        )

        skill, created = get_or_create_skill(
            db=db,
            name=skill_name,
            description=skill_description,
            category_id=category.id,
        )

        saved_skills.append(
            {
                "id": skill.id,
                "name": skill.name,
                "description": skill.description,
                "category": category.name,
                "created": created,
            }
        )

    return {
        "message": "Job role generated successfully",
        "role": {
            "id": role.id,
            "name": role.name,
            "description": role.description,
        },
        "skills": saved_skills,
        "source": "ai_or_fallback",
    }

@router.get("/job-roles/{role_id}/skills")
def get_job_role_skills(
    role_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    role_name = current_user.role.name.lower() if current_user.role else ""

    if role_name not in ["admin", "candidate"]:
        raise HTTPException(status_code=403, detail="Access denied")

    role = db.query(Role).filter(Role.id == role_id).first()

    if not role:
        raise HTTPException(status_code=404, detail="Job role not found")

    skills = db.query(Skill).order_by(Skill.name.asc()).all()

    return {
        "role": {
            "id": role.id,
            "name": role.name,
            "description": role.description,
        },
        "skills": [
            {
                "id": skill.id,
                "name": skill.name,
                "description": skill.description,
                "category": skill.category.name if skill.category else "Uncategorized",
                "concepts": [
                    {
                        "id": f"{skill.id}-intro",
                        "title": f"Introduction to {skill.name}",
                        "type": "learning",
                        "difficulty": "Beginner",
                    },
                    {
                        "id": f"{skill.id}-practice",
                        "title": f"{skill.name} Practice",
                        "type": "practice",
                        "difficulty": "Intermediate",
                    },
                    {
                        "id": f"{skill.id}-interview",
                        "title": f"{skill.name} Interview Questions",
                        "type": "interview",
                        "difficulty": "Job Ready",
                    },
                ],
            }
            for skill in skills
        ],
    }

@router.post("/reset-admin")
def reset_admin_account(db: Session = Depends(get_db)):
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

    admin_user = db.query(User).filter(User.email == admin_email).first()

    if not admin_user:
        admin_user = User(
            full_name="Platform Owner",
            username="admin",
            email=admin_email,
            password_hash=hash_password("Admin@123"),
            role_id=admin_role.id,
        )
        db.add(admin_user)
    else:
        admin_user.password_hash = hash_password("Admin@123")
        admin_user.role_id = admin_role.id

    db.commit()

    return {
        "message": "Admin account reset successfully",
        "email": admin_email,
        "password": "Admin@123",
    }