from typing import List, Union
from fastapi import Depends, HTTPException, status
from app.dependencies.auth import get_current_active_user
from app.models.user import User


class PermissionChecker:
    """
    Dependency class to enforce granular permission checks.
    """

    def __init__(self, required_permissions: Union[str, List[str]]):
        if isinstance(required_permissions, str):
            self.required_permissions = [required_permissions]
        else:
            self.required_permissions = required_permissions

    def __call__(self, user: User = Depends(get_current_active_user)) -> User:
        user_role = user.role
        if not user_role:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="User has no assigned role",
            )

        # Admin super-role override
        if user_role.name.lower() == "admin":
            return user

        # Extract permission names associated with role
        user_permissions = []
        if hasattr(user_role, "role_permissions"):
            for rp in user_role.role_permissions:
                if hasattr(rp, "permission") and rp.permission:
                    user_permissions.append(rp.permission.name)

        for perm in self.required_permissions:
            if perm not in user_permissions:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail=f"Missing required permission: '{perm}'",
                )

        return user


def require_permission(permission_name: str) -> PermissionChecker:
    return PermissionChecker(permission_name)
