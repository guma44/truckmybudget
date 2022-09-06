from typing import Optional
from beanie import Document

class Invoice(Document):
    name: str
    path: str
    description: Optional[str]

    class Settings:
        name = "invoices"