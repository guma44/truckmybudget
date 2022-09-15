from typing import Optional

from pydantic import BaseModel
from beanie import Document, Link

from models.users import User


class Account(Document):
    name: str
    amount: float
    account_type: str
    user: Link[User]

    class Settings:
        name = "accounts"




class CreateAccount(BaseModel):
    name: str
    amount: float
    account_type: str

    class Config:
        schema_extra = {
            "example": {
                "name": "Foo",
                "amount": 20000,
                "account_type": "bank"
            }
        }


class ReadAccount(CreateAccount):
    ...


class UpdateAccount(BaseModel):
    name: Optional[str]
    amount: Optional[float]
    account_type: Optional[str]


class AmendAccount(BaseModel):
    amount: float