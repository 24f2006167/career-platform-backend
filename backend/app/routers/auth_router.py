from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.dependencies.auth_dependency import get_current_user
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
        password=hash_password(user.password)
    )

    db.add(new_user)

    db.commit()

    db.refresh(new_user)

    access_token = create_access_token(
    data={
        "sub": existing_user.email
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
        "token_type": "bearer"
    }

@router.get("/profile")
def profile(current_user = Depends(get_current_user)):

    return {
        "id": current_user.id,
        "name": current_user.name,
        "email": current_user.email
    }