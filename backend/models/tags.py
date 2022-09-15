from typing import Optional
from beanie import Document, Link
from pydantic.color import Color
from pydantic import BaseModel
from models.users import User

class Tag(Document):
    name: str
    color: Color
    user: Link[User]

    class Settings:
        name = "tags"


class CreateTag(BaseModel):
    name: str
    color: Color

    class Config:
        schema_extra = {"example": {"name": "test_tag", "color": "red"}}


class ReadTag(CreateTag):
    ...


class UpdateTag(BaseModel):
    name: Optional[str]
    color: Optional[Color]