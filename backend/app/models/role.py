# from sqlalchemy import (
#     Column,
#     String,
#     Text
# )

# from sqlalchemy.orm import relationship

# from app.core.database import Base
# from app.db.mixins import UUIDMixin, TimestampMixin


# class Role(Base, UUIDMixin, TimestampMixin):
#     __tablename__ = "roles"

#     name = Column(
#         String(50),
#         unique=True,
#         nullable=False,
#         index=True
#     )

#     description = Column(
#         Text,
#         nullable=True
#     )

#     users = relationship(
#         "User",
#         back_populates="role"
#     )

#     def __repr__(self):
#         return f"<Role(name={self.name})>"

from sqlalchemy import (
    Column,
    String,
    Text
)

from sqlalchemy.orm import relationship

from app.core.database import Base
from app.db.mixins import UUIDMixin, TimestampMixin


class Role(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "roles"

    name = Column(
        String(50),
        unique=True,
        nullable=False,
        index=True
    )

    description = Column(
        Text,
        nullable=True
    )

    users = relationship(
        "User",
        back_populates="role"
    )

    permissions = relationship(
        "RolePermission",
        back_populates="role",
        cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f"<Role(name={self.name})>"