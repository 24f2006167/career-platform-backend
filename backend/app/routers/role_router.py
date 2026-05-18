from fastapi import APIRouter, Depends

from app.dependencies.auth_dependency import get_current_user
from app.dependencies.role_checker import role_required

router = APIRouter()


@router.get("/admin/dashboard")
def admin_dashboard(
    current_user = Depends(get_current_user),
    allowed = Depends(role_required("admin"))
):

    return {
        "message": "Welcome Admin"
    }


@router.get("/recruiter/dashboard")
def recruiter_dashboard(
    current_user = Depends(get_current_user),
    allowed = Depends(role_required("recruiter"))
):

    return {
        "message": "Welcome Recruiter"
    }


@router.get("/candidate/dashboard")
def candidate_dashboard(
    current_user = Depends(get_current_user),
    allowed = Depends(role_required("candidate"))
):

    return {
        "message": "Welcome Candidate"
    }