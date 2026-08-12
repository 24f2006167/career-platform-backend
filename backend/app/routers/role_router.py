
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.role import Role

from app.dependencies.current_user import get_current_user
from app.dependencies.role_guard import require_role


router = APIRouter()


@router.get("/roles")
@router.get("/roles/")
def get_public_roles(
    db: Session = Depends(get_db)
):
    excluded_roles = ["admin", "candidate", "recruiter"]

    roles = (
        db.query(Role)
        .filter(~Role.name.in_(excluded_roles))
        .all()
    )

    return [
        {
            "id": str(role.id),
            "name": role.name,
            "description": role.description,
        }
        for role in roles
    ]
# PROTECTED DASHBOARD TEST ROUTES
@router.get("/admin/dashboard")
def admin_dashboard(
    current_user=Depends(require_role(["admin"]))
):
    return {
        "message": "Welcome Admin"
    }


@router.get("/recruiter/dashboard")
def recruiter_dashboard(
    current_user=Depends(require_role(["recruiter"]))
):
    return {
        "message": "Welcome Recruiter"
    }


@router.get("/candidate/dashboard")
def candidate_dashboard(
    current_user=Depends(require_role(["candidate"]))
):
    return {
        "message": "Welcome Candidate"
    }