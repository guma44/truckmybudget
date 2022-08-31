from typing import Optional, List
import datetime
from pydantic import BaseModel
from beanie import Document, Link

from models.categories import Category
from models.tags import Tag


class Expense(Document):
    name: str
    price: float
    date: datetime.date
    invoice: Optional[str]
    description: Optional[str]
    tags: List[Link[Tag]] = []
    category: Optional[Link[Category]]

    class Settings:
        name = "expenses"
        bson_encoders = {
            datetime.date: lambda dt: datetime.datetime(
                year=dt.year, month=dt.month, day=dt.day, hour=0, minute=0, second=0
            )
        }

    class Config:
        schema_extra = {
            "example": {
                "name": "Foo",
                "description": "A very nice Item",
                "price": 35.4,
                "date": "2022-02-04",
                "tags": ["TAG_ID"],
                "category": "CAT_ID"
            }
        }


class UpdateExpense(BaseModel):
    name: Optional[str]
    price: Optional[float]
    date: Optional[datetime.date]
    invoice: Optional[str] = None
    description: Optional[str]
    tags: Optional[List[Link[Tag]]]
    category: Optional[Link[Category]]