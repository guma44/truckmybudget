from beanie import Document
from pydantic.color import Color


class Tag(Document):
    name: str
    color: Color

    class Settings:
        name = "tags"

    class Config:
        schema_extra = {"example": {"name": "test_tag", "color": "red"}}
