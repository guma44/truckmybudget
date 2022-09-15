from typing import Optional
from beanie import Document, Link
from pydantic import BaseModel
from models.users import User

class Invoice(Document):
    name: str
    generated_name: str
    description: Optional[str]
    user: Link[User]

    class Settings:
        name = "invoices"


class CreateInvoice(BaseModel):
    name: str
    generated_name: str
    description: Optional[str]


class ReadInvoice(CreateInvoice):
    ...


class UpdateInvoice(BaseModel):
    name: Optional[str]
    description: Optional[str]