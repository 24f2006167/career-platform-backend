from pydantic import (
    BaseModel,
    Field
)

from uuid import UUID


class SkillCreateSchema(
    BaseModel
):

    name: str = Field(
        min_length=2,
        max_length=100
    )

    description: str | None = None

    category_id: UUID