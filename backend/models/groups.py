from typing import Optional
from beanie import Document, Link
from pydantic.color import Color
from pydantic import BaseModel
from models.users import User

class Group(Document):
    name: str
    color: Color
    user: Link[User]

    class Settings:
        name = "groups"


class CreateGroup(BaseModel):
    name: str
    color: Color

    class Config:
        schema_extra = {"example": {"name": "test_group", "color": "red"}}


class ReadGroup(CreateGroup):
    ...


class UpdateGroup(BaseModel):
    name: Optional[str]
    color: Optional[Color]