from beanie import Document


class Tag(Document):
    name: str

    class Settings:
        name = "tags"

    class Config:
        schema_extra = {"example": {"name": "test_tag"}}
