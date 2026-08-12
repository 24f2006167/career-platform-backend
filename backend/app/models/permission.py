from sqlalchemy import Column, String, Text
from sqlalchemy.orm import relationship

from app.core.database import Base
from app.db.mixins import UUIDMixin, TimestampMixin


class Permission(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "permissions"

    name = Column(
        String(100),
        unique=True,
        nullable=False
    )

    description = Column(
        Text,
        nullable=True
    )

    roles = relationship(
        "RolePermission",
        back_populates="permission"
    )

    def __repr__(self):
        return f"<Permission(name={self.name})>"