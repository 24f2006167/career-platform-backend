# from app.dependencies.role_guard import (
#     require_role
# )

# from fastapi import (
#     APIRouter,
#     Depends,
#     HTTPException,
#     status
# )

# from app.dependencies.current_user import (
#     get_current_user
# )

# from app.models.user import User
# from sqlalchemy.orm import Session

# from app.core.database import get_db

# from app.schemas.auth.register_schema import (
#     RegisterSchema
# )

# from app.schemas.auth.login_schema import (
#     LoginSchema
# )

# from app.schemas.auth.token_schema import (
#     TokenSchema
# )

# from app.services.auth.auth_service import (
#     register_user,
#     login_user
# )


# router = APIRouter(
#     prefix="/auth",
#     tags=["Authentication"]
# )


# # REGISTER
# @router.post(
#     "/register",
#     status_code=status.HTTP_201_CREATED
# )
# def register(
#     user_data: RegisterSchema,
#     db: Session = Depends(get_db)
# ):

#     try:

#         new_user = register_user(
#             db,
#             user_data
#         )

#         role_name = (
#             new_user.role.name
#             if new_user.role
#             else "candidate"
#         )

#         return {
#             "message": "User registered successfully",
#             "user_id": str(new_user.id),
#             "role": role_name
#         }

#     except Exception as e:

#         raise HTTPException(
#             status_code=400,
#             detail=str(e)
#         )


# # LOGIN
# @router.post(
#     "/login",
#     response_model=TokenSchema
# )
# def login(
#     login_data: LoginSchema,
#     db: Session = Depends(get_db)
# ):

#     try:

#         token = login_user(
#             db,
#             login_data
#         )

#         return token

#     except Exception as e:

#         raise HTTPException(
#             status_code=401,
#             detail=str(e)
#         )


# # CURRENT USER PROFILE
# @router.get("/me")
# def get_me(
#     current_user: User = Depends(get_current_user)
# ):

#     role_name = (
#         current_user.role.name
#         if current_user.role
#         else "candidate"
#     )

#     return {
#         "id": str(current_user.id),
#         "full_name": current_user.full_name,
#         "username": current_user.username,
#         "email": current_user.email,
#         "role_id": str(current_user.role_id),
#         "role": role_name,
#         "xp": current_user.xp,
#         "level": current_user.level,
#         "streak": current_user.streak
#     }


# # ADMIN ONLY ROUTE
# @router.get("/admin-only")
# def admin_only_route(
#     current_user: User = Depends(
#         require_role(["admin"])
#     )
# ):

#     return {
#         "message": "Welcome Admin",
#         "user": current_user.email
#     }




from app.dependencies.role_guard import require_role

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status
)

from app.dependencies.current_user import get_current_user
from app.models.user import User
from sqlalchemy.orm import Session
from app.core.database import get_db

from app.schemas.auth.register_schema import RegisterSchema
from app.schemas.auth.login_schema import LoginSchema
from app.schemas.auth.token_schema import TokenSchema

from app.services.auth.auth_service import (
    register_user,
    login_user
)


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


# REGISTER
@router.post(
    "/register",
    status_code=status.HTTP_201_CREATED
)
def register(
    user_data: RegisterSchema,
    db: Session = Depends(get_db)
):
    try:
        new_user = register_user(
            db,
            user_data
        )

        role_name = (
            new_user.role.name
            if new_user.role
            else "candidate"
        )

        return {
            "message": "User registered successfully",
            "user_id": str(new_user.id),
            "role": role_name
        }

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )


# LOGIN
@router.post(
    "/login",
    response_model=TokenSchema
)
def login(
    login_data: LoginSchema,
    db: Session = Depends(get_db)
):
    try:
        token = login_user(
            db,
            login_data
        )

        return token

    except Exception as e:
        raise HTTPException(
            status_code=401,
            detail=str(e)
        )


# CURRENT USER PROFILE
@router.get("/me")
def get_me(
    current_user: User = Depends(get_current_user)
):
    role_name = (
        current_user.role.name
        if current_user.role
        else "candidate"
    )

    return {
        "id": str(current_user.id),
        "full_name": current_user.full_name,
        "username": current_user.username,
        "email": current_user.email,
        "role": role_name,
        "role_id": str(current_user.role_id),
        "xp": current_user.xp,
        "level": current_user.level,
        "streak": current_user.streak,
        "is_verified": current_user.is_verified,
        "is_active": current_user.is_active,
        "profile_image": current_user.profile_image,
        "bio": current_user.bio,
        "github_url": current_user.github_url,
        "linkedin_url": current_user.linkedin_url,
        "resume_url": current_user.resume_url
    }


# ADMIN ONLY ROUTE
@router.get("/admin-only")
def admin_only_route(
    current_user: User = Depends(
        require_role(["admin"])
    )
):
    return {
        "message": "Welcome Admin",
        "user": current_user.email
    }