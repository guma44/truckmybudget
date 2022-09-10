from typing import Optional, List
import datetime

from pydantic import BaseModel
from beanie import Document, Link

from models.invoices import Invoice
from models.groups import Group
from models.tags import Tag


class Account(Document):
    name: str
    amount: float
    account_type: str

    class Settings:
        name = "accounts"

    class Config:
        schema_extra = {
            "example": {
                "name": "Foo",
                "amount": 20000,
                "account_type": "bank"
            }
        }


class UpdateAccount(BaseModel):
    name: Optional[str]
    amount: Optional[float]
    account_type: Optional[float]


class AmendAccount(BaseModel):
    amount: float