from beanie import Document
from pydantic.color import Color

class Group(Document):
    name: str
    color: Color

    class Settings:
        name = "groups"
    class Config:
        schema_extra = {"example": {"name": "test_group", "color": "red"}}