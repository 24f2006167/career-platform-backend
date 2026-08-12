from pydantic import BaseModel, EmailStr, Field
from typing import Literal


class RegisterSchema(BaseModel):

    full_name: str = Field(
        min_length=2,
        max_length=100
    )

    username: str = Field(
        min_length=3,
        max_length=50
    )

    email: EmailStr

    password: str = Field(
        min_length=8
    )

    role: Literal[
        "candidate",
        "recruiter"
    ] = "candidate"