# from fastapi import Depends, HTTPException
# from fastapi.security import OAuth2PasswordBearer
# from sqlalchemy.orm import Session

# from app.core.database import get_db
# from app.models.user import User
# from app.utils.security import verify_password  

# oauth2_scheme = OAuth2PasswordBearer(
#     tokenUrl="/login"
#     )


# def get_current_user(
#     token: str = Depends(oauth2_scheme),
#     db: Session = Depends(get_db)
# ):

#     email = verify_access_token(token)

#     if not email:
#         raise HTTPException(
#             status_code=401,
#             detail="Invalid or expired token"
#         )

#     user = db.query(User).filter(
#         User.email == email
#     ).first()

#     if not user:
#         raise HTTPException(
#             status_code=404,
#             detail="User not found"
#         )

#     return user

# def require_role(required_role: str):

#     def role_checker(
#         current_user = Depends(get_current_user)
#     ):

#         if current_user.role != required_role:

#             raise HTTPException(
#                 status_code=403,
#                 detail="Access denied"
#             )

#         return current_user

#     return role_checker

from fastapi import (
    Depends,
    HTTPException,
    Request
)

from sqlalchemy.orm import Session

from app.core.database import get_db

from app.models.user import User

from app.services.token_service import (
    verify_token
)


# GET CURRENT USER
def get_current_user(
    request: Request,
    db: Session = Depends(get_db)
):

    # GET COOKIE TOKEN
    token = request.cookies.get(
        "access_token"
    )

    # NO TOKEN
    if not token:

        raise HTTPException(
            status_code=401,
            detail="Not authenticated"
        )

    # VERIFY TOKEN
    payload = verify_token(token)

    if not payload:

        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token"
        )

    # GET EMAIL
    email = payload.get("sub")

    if not email:

        raise HTTPException(
            status_code=401,
            detail="Invalid token payload"
        )

    # FIND USER
    user = (
        db.query(User)
        .filter(User.email == email)
        .first()
    )

    if not user:

        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return user


# ROLE PROTECTION
def require_role(required_role: str):

    def role_checker(
        current_user = Depends(
            get_current_user
        )
    ):

        # INVALID ROLE
        if current_user.role != required_role:

            raise HTTPException(
                status_code=403,
                detail="Access denied"
            )

        return current_user

    return role_checker