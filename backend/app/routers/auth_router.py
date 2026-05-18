from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.dependencies.auth_dependency import (
    get_current_user,
    require_role 
    )
from fastapi.security import OAuth2PasswordRequestForm
from app.core.database import get_db
from app.models.user import User
from app.schemas.user_schema import UserCreate
from app.utils.security import (
    hash_password,
    verify_password,
    create_access_token
)
router = APIRouter()


@router.post("/signup")
def signup(user: UserCreate, db: Session = Depends(get_db)):

    new_user = User(
        name=user.name,
        email=user.email,
        password=hash_password(user.password),
        role=user.role
    )

    db.add(new_user)

    db.commit()

    db.refresh(new_user)

    access_token = create_access_token(
    data={
        "sub": new_user.email
    }
)
    
    return {
    "message": "Login successful",
    "access_token": access_token,
    "token_type": "bearer"
    }

@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):

    existing_user = db.query(User).filter(
        User.email == form_data.username
    ).first()

    if not existing_user:
        return {
            "message": "Invalid email"
        }

    valid_password = verify_password(
        form_data.password,
        existing_user.password
    )

    if not valid_password:
        return {
            "message": "Invalid password"
        }

    access_token = create_access_token(
        data={
            "sub": existing_user.email
        }
    )

    return {
        "message": "Login successful",
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
             "name": existing_user.name,
             "email": existing_user.email,
             "role": existing_user.role
}
    }
    

@router.get("/profile")
def profile(current_user = Depends(get_current_user)):

    return {
        "id": current_user.id,
        "name": current_user.name,
        "email": current_user.email
    }

@router.get("/admin/dashboard")
def admin_dashboard(
    current_user = Depends(
        require_role("admin")
    )
):

    return {
        "message": "Welcome Admin",
        "user": current_user.name
    }

@router.get("/recruiter/dashboard")
def recruiter_dashboard(
    current_user = Depends(
        require_role("recruiter")
    )
):

    return {
        "message": "Welcome Recruiter",
        "user": current_user.name
    }

@router.get("/candidate/dashboard")
def candidate_dashboard(
    current_user = Depends(
        require_role("candidate")
    )
):

    return {
        "message": "Welcome Candidate",
        "user": current_user.name
    }
