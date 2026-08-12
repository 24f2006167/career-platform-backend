from sqlalchemy import Column, ForeignKey
from sqlalchemy.orm import relationship

from app.core.database import Base
from app.db.mixins import UUIDMixin, TimestampMixin


class RolePermission(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "role_permissions"

    role_id = Column(
        ForeignKey("roles.id"),
        nullable=False
    )

    permission_id = Column(
        ForeignKey("permissions.id"),
        nullable=False
    )

    role = relationship(
        "Role",
        back_populates="permissions"
    )

    permission = relationship(
        "Permission",
        back_populates="roles"
    )

    def __repr__(self):
        return (
            f"<RolePermission(role_id={self.role_id}, "
            f"permission_id={self.permission_id})>"
        )