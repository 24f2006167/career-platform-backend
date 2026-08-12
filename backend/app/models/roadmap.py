from sqlalchemy import (
    Column,
    String,
    Text,
    Integer,
    ForeignKey
)

from sqlalchemy.orm import relationship

from app.core.database import Base
from app.db.mixins import UUIDMixin, TimestampMixin


class Roadmap(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "roadmaps"

    title = Column(
        String(150),
        nullable=False
    )

    description = Column(
        Text,
        nullable=True
    )

    estimated_salary = Column(
        String(100),
        nullable=True
    )

    difficulty = Column(
        String(50),
        nullable=True
    )

    created_by_role_id = Column(
        ForeignKey("roles.id"),
        nullable=True
    )

    steps = relationship(
        "RoadmapStep",
        back_populates="roadmap",
        cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f"<Roadmap(title={self.title})>"


class RoadmapStep(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "roadmap_steps"

    roadmap_id = Column(
        ForeignKey("roadmaps.id"),
        nullable=False
    )

    skill_id = Column(
        ForeignKey("skills.id"),
        nullable=True
    )

    title = Column(
        String(150),
        nullable=False
    )

    description = Column(
        Text,
        nullable=True
    )

    step_order = Column(
        Integer,
        default=1
    )

    roadmap = relationship(
        "Roadmap",
        back_populates="steps"
    )

    skill = relationship(
        "Skill"
    )

    def __repr__(self):
        return f"<RoadmapStep(title={self.title})>"