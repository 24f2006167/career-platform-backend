# from fastapi import (
#     APIRouter, 
#     Depends,
#     HTTPException,
#     Response
# )
# from sqlalchemy.orm import Session
# from app.dependencies.auth_dependency import (
#     get_current_user,
#     require_role 
#     )
# from fastapi.security import OAuth2PasswordRequestForm
# from app.core.database import get_db
# from app.models.user import User
# from app.schemas.user_schema import UserCreate
# from app.utils.security import (
#     hash_password,
#     verify_password
# )
# from app.services.token_service import (
#     create_access_token,
#     create_refresh_token
# )
# router = APIRouter()


# @router.post("/signup")
# def signup(user: UserCreate, db: Session = Depends(get_db)):

#     if user.role == "admin":

#         raise HTTPException(
#             status_code=403,
#             detail="Admin account cannot be created publicly"
#         )

#     # CHECK IF EMAIL ALREADY EXISTS
#     existing_user = (
#         db.query(User)
#         .filter(User.email == user.email)
#         .first()
#     )

#     if existing_user:

#         raise HTTPException(
#             status_code=400,
#             detail="Email already registered"
#         )

#     # CREATE USER
#     new_user = User(
#         name=user.name,
#         email=user.email,
#         password=hash_password(user.password),
#         role=user.role
#     )

#     db.add(new_user)

#     # SAVE TO DATABASE
#     db.commit()

#     db.refresh(new_user)

#     # CREATE TOKEN
#     access_token = create_access_token(
#         data={
#             "sub": new_user.email
#         }
#     )

#     # RETURN RESPONSE
#     return {
#         "message": "Signup successful",
#         "access_token": access_token,
#         "user": {
#             "id": new_user.id,
#             "name": new_user.name,
#             "email": new_user.email,
#             "role": new_user.role
#         }
#     }

# @router.post("/login")
# def login(
#     response: Response,
#     form_data: OAuth2PasswordRequestForm = Depends(),
#     db: Session = Depends(get_db)
# ):

#     existing_user = db.query(User).filter(
#         User.email == form_data.username
#     ).first()

#     # INVALID EMAIL
#     if not existing_user:

#         raise HTTPException(
#             status_code=401,
#             detail="Invalid email"
#         )

#     # VERIFY PASSWORD
#     valid_password = verify_password(
#         form_data.password,
#         existing_user.password
#     )

#     if not valid_password:

#         raise HTTPException(
#             status_code=401,
#             detail="Invalid password"
#         )

#     # CREATE ACCESS TOKEN
#     access_token = create_access_token({
#         "sub": existing_user.email,
#         "role": existing_user.role
#     })

#     # CREATE REFRESH TOKEN
#     refresh_token = create_refresh_token({
#         "sub": existing_user.email
#     })

#     # SET ACCESS COOKIE
#     response.set_cookie(
#         key="access_token",
#         value=access_token,
#         httponly=True,
#         secure=False,
#         samesite="lax",
#         max_age=60 * 15
#     )

#     # SET REFRESH COOKIE
#     response.set_cookie(
#         key="refresh_token",
#         value=refresh_token,
#         httponly=True,
#         secure=False,
#         samesite="lax",
#         max_age=60 * 60 * 24 * 7
#     )

#     return {
#         "message": "Login successful",
#         "user": {
#             "id": existing_user.id,
#             "name": existing_user.name,
#             "email": existing_user.email,
#             "role": existing_user.role
#         }
#     }

# @router.post("/logout")
# def logout(response: Response):

#     # REMOVE ACCESS TOKEN
#     response.delete_cookie(
#         key="access_token"
#     )

#     # REMOVE REFRESH TOKEN
#     response.delete_cookie(
#         key="refresh_token"
#     )

#     return {
#         "message": "Logged out successfully"
#     }

# @router.get("/profile")
# def profile(current_user = Depends(get_current_user)):

#     return {
#         "id": current_user.id,
#         "name": current_user.name,
#         "email": current_user.email
#     }

# @router.get("/admin/dashboard")
# def admin_dashboard(
#     current_user = Depends(
#         require_role("admin")
#     )
# ):

#     return {
#         "message": "Welcome Admin",
#         "user": current_user.name
#     }


# # CURRENT LOGGED-IN USER
# @router.get("/me")
# def get_me(
#     current_user = Depends(
#         get_current_user
#     )
# ):

#     return {
#         "id": current_user.id,
#         "name": current_user.name,
#         "email": current_user.email,
#         "role": current_user.role
#     }


# @router.get("/recruiter/dashboard")
# def recruiter_dashboard(
#     current_user = Depends(
#         require_role("recruiter")
#     )
# ):

#     return {
#         "message": "Welcome Recruiter",
#         "user": current_user.name
#     }

# @router.get("/candidate/dashboard")
# def candidate_dashboard(
#     current_user = Depends(
#         require_role("candidate")
#     )
# ):

#     return {
#         "message": "Welcome Candidate",
#         "user": current_user.name
#     }




from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    Response
)

from sqlalchemy.orm import Session

from fastapi.security import (
    OAuth2PasswordRequestForm
)

from app.dependencies.auth_dependency import (
    get_current_user,
    require_role
)

from app.core.database import get_db

from app.models.user import User

from app.schemas.user_schema import UserCreate

from app.utils.security import (
    hash_password,
    verify_password
)

from app.services.token_service import (
    create_access_token,
    create_refresh_token
)

router = APIRouter()


# SIGNUP
@router.post("/signup")
def signup(
    user: UserCreate,
    response: Response,
    db: Session = Depends(get_db)
):

    # BLOCK ADMIN SIGNUP
    if user.role == "admin":

        raise HTTPException(
            status_code=403,
            detail="Admin account cannot be created publicly"
        )

    # CHECK EMAIL
    existing_user = (
        db.query(User)
        .filter(User.email == user.email)
        .first()
    )

    if existing_user:

        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    # CREATE USER
    new_user = User(
        name=user.name,
        email=user.email,
        password=hash_password(
            user.password
        ),
        role=user.role
    )

    db.add(new_user)

    db.commit()

    db.refresh(new_user)

    # ACCESS TOKEN
    access_token = create_access_token(
        data={
            "sub": new_user.email,
            "role": new_user.role
        }
    )

    # REFRESH TOKEN
    refresh_token = create_refresh_token(
        data={
            "sub": new_user.email
        }
    )

    # ACCESS COOKIE
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=False,
        samesite="lax",
        max_age=60 * 15
    )

    # REFRESH COOKIE
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        secure=False,
        samesite="lax",
        max_age=60 * 60 * 24 * 7
    )

    return {
        "message": "Signup successful",
        "user": {
            "id": new_user.id,
            "name": new_user.name,
            "email": new_user.email,
            "role": new_user.role
        }
    }


# LOGIN
@router.post("/login")
def login(
    response: Response,
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):

    # FIND USER
    existing_user = (
        db.query(User)
        .filter(
            User.email == form_data.username
        )
        .first()
    )

    # INVALID EMAIL
    if not existing_user:

        raise HTTPException(
            status_code=401,
            detail="Invalid email"
        )

    # VERIFY PASSWORD
    valid_password = verify_password(
        form_data.password,
        existing_user.password
    )

    # INVALID PASSWORD
    if not valid_password:

        raise HTTPException(
            status_code=401,
            detail="Invalid password"
        )

    # ACCESS TOKEN
    access_token = create_access_token(
        data={
            "sub": existing_user.email,
            "role": existing_user.role
        }
    )

    # REFRESH TOKEN
    refresh_token = create_refresh_token(
        data={
            "sub": existing_user.email
        }
    )

    # ACCESS COOKIE
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=False,
        samesite="lax",
        max_age=60 * 15
    )

    # REFRESH COOKIE
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        secure=False,
        samesite="lax",
        max_age=60 * 60 * 24 * 7
    )

    return {
        "message": "Login successful",
        "user": {
            "id": existing_user.id,
            "name": existing_user.name,
            "email": existing_user.email,
            "role": existing_user.role
        }
    }


# LOGOUT
@router.post("/logout")
def logout(response: Response):

    # DELETE ACCESS COOKIE
    response.delete_cookie(
        key="access_token"
    )

    # DELETE REFRESH COOKIE
    response.delete_cookie(
        key="refresh_token"
    )

    return {
        "message": "Logged out successfully"
    }


# PROFILE
@router.get("/profile")
def profile(
    current_user = Depends(
        get_current_user
    )
):

    return {
        "id": current_user.id,
        "name": current_user.name,
        "email": current_user.email
    }


# CURRENT USER
@router.get("/me")
def get_me(
    current_user = Depends(
        get_current_user
    )
):

    return {
        "id": current_user.id,
        "name": current_user.name,
        "email": current_user.email,
        "role": current_user.role
    }


# ADMIN DASHBOARD
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


# RECRUITER DASHBOARD
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


# CANDIDATE DASHBOARD
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