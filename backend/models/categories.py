from beanie import Document


class Category(Document):
    name: str

    class Settings:
        name = "categories"
    class Config:
        schema_extra = {"example": {"name": "test_category"}}