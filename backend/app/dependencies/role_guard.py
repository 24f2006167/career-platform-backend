from fastapi import (
    Depends,
    HTTPException,
    status
)

from app.dependencies.current_user import (
    get_current_user
)

from app.models.user import User


# ROLE CHECKER
def require_role(
    allowed_roles: list[str]
):

    def role_checker(
        current_user: User = Depends(get_current_user)
    ):

        role_name = current_user.role.name

        if role_name not in allowed_roles:

            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied"
            )

        return current_user

    return role_checker