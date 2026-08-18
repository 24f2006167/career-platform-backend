from typing import List, Union
from fastapi import Depends, HTTPException, status
from app.dependencies.auth import get_current_active_user
from app.models.user import User


class RoleChecker:
    """
    Dependency class to enforce role-based access control (RBAC).
    """

    def __init__(self, allowed_roles: Union[str, List[str]]):
        if isinstance(allowed_roles, str):
            self.allowed_roles = [allowed_roles.lower()]
        else:
            self.allowed_roles = [r.lower() for r in allowed_roles]

    def __call__(self, user: User = Depends(get_current_active_user)) -> User:
        user_role_name = user.role.name.lower() if user.role and hasattr(user.role, "name") else ""
        if user_role_name not in self.allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Access forbidden: User role '{user_role_name}' does not match allowed roles: {self.allowed_roles}",
            )
        return user


require_admin = RoleChecker(["admin"])
require_candidate = RoleChecker(["candidate", "admin"])
require_recruiter = RoleChecker(["recruiter", "admin"])
