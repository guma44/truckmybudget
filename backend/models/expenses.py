from typing import Optional, List
import datetime

from pydantic import BaseModel, HttpUrl
from beanie import Document, Link

from models.invoices import Invoice
from models.groups import Group
from models.accounts import Account
from models.tags import Tag
from models.users import User


class Expense(Document):
    name: str
    price: float
    date: datetime.date
    invoice: Optional[Link[Invoice]]
    invoice_url: Optional[HttpUrl]
    description: Optional[str]
    tags: List[Link[Tag]] = []
    group: Optional[Link[Group]]
    account: Link[Account]
    user: Link[User]
    include_in_total: Optional[bool] = True
    forecast: Optional[bool] = False

    class Settings:
        name = "expenses"
        bson_encoders = {
            datetime.date: lambda dt: datetime.datetime(
                year=dt.year, month=dt.month, day=dt.day, hour=0, minute=0, second=0
            )
        }

class CreateExpense(BaseModel):
    name: str
    price: float
    date: datetime.date
    invoice: Optional[Link[Invoice]]
    invoice_url: Optional[HttpUrl]
    description: Optional[str]
    tags: List[Link[Tag]] = []
    group: Optional[Link[Group]]
    account: Link[Account]
    include_in_total: Optional[bool] = True
    forecast: Optional[bool] = False
    class Config:
        schema_extra = {
            "example": {
                "name": "Foo",
                "description": "A very nice Item",
                "price": 35.4,
                "date": "2022-02-04",
                "tags": ["TAG_ID"],
                "group": "GROUP_ID",
                "account": "ACCOUNT_ID",
                "include_in_total": True,
                "forecast": False
            }
        }

class ReadExpense(CreateExpense):
    ...

class UpdateExpense(BaseModel):
    name: Optional[str]
    price: Optional[float]
    date: Optional[datetime.date]
    invoice: Optional[Link[Invoice]] = None
    invoice_url: Optional[HttpUrl]
    description: Optional[str]
    tags: Optional[List[Link[Tag]]]
    group: Optional[Link[Group]]
    account: Optional[Link[Account]]
    include_in_total: Optional[bool] = True
    forecast: Optional[bool] = False