from beanie import PydanticObjectId
from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from typing import List, Optional
import datetime
import uuid
import os
from beanie import WriteRules, Link

from models.expenses import Expense, UpdateExpense
from models.tags import Tag
from models.categories import Category


router = APIRouter()

async def upload_file(file, directory):
    filepath = None
    if file is not None:
        try:
            contents = file.file.read()
            filename = uuid.uuid4().hex + os.path.splitext(file.filename)[-1]
            with open(os.path.join("static", directory, filename), "wb") as f:
                f.write(contents)
            filepath = os.path.join("static", directory, filename)
        except Exception as exc:
            raise HTTPException(status_code=500, detail=str(exc))
        finally:
            file.file.close()
    return filepath

@router.post("/", response_description="Expense added to the database")
async def add_expense(
    name: str = Form(...),
    price: float = Form(...),
    date: datetime.date = Form(...),
    description: str = Form(None),
    category: str = Form(None),
    tags: List[str] = Form(None),
    invoice: UploadFile = File(None),
) -> Expense:
    invoice_path = await upload_file(invoice, "invoices")
    expense = Expense(
        name=name,
        price=price,
        date=date,
        description=description,
        category=category,
        tags=[tag for tag in tags if tag is not None and tag],
        invoice=invoice_path,
    )
    await expense.create()
    return expense


@router.get("/{id}", response_description="Expense record retrieved")
async def get_expense_record(id: PydanticObjectId) -> Expense:
    expense = await Expense.get(id, fetch_links=True)
    return expense


@router.get("/", response_description="Expense records retrieved")
async def get_expenses() -> List[Expense]:
    expenses = await Expense.find_all(fetch_links=True).to_list()
    return expenses


@router.put("/{id}", response_description="Expense record updated")
async def update_expense_data(
    id: PydanticObjectId,
    name: str = Form(None),
    price: float = Form(None),
    date: datetime.date = Form(None),
    description: str = Form(None),
    category: str = Form(None),
    tags: List[str] = Form(None),
    invoice: UploadFile = File(None),
) -> Expense:
    invoice_path = await upload_file(invoice, "invoices")
    req = {
        "name": name,
        "price": price,
        "date": date,
        "description": description,
        "category": category,
        "tags": [tag for tag in tags if tag is not None and tag],
        "invoice": invoice_path,
    }
    req = {k: v for k, v in req.items() if v is not None}
    update_query = {"$set": {field: value for field, value in req.items()}}

    expense = await Expense.get(id)
    if not expense:
        raise HTTPException(status_code=404, detail="Expense record not found!")

    await expense.update(update_query)
    return expense


@router.delete("/{id}", response_description="Expense record deleted from the database")
async def delete_expense_data(id: PydanticObjectId) -> dict:
    record = await Expense.get(id)

    if not record:
        raise HTTPException(status_code=404, detail="Expense record not found!")

    await record.delete()
    return {"message": "Record deleted successfully"}
