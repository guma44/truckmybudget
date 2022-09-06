from beanie import PydanticObjectId
from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from typing import List, Optional
import datetime
import uuid
import os

from models.expenses import Expense


router = APIRouter()



@router.post("/", response_description="Expense added to the database")
async def add_expense(expense: Expense) -> Expense:
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
async def update_expense_data(id: PydanticObjectId, req: Expense) -> Expense:
    req = {k: v for k, v in req.dict().items() if v is not None}
    update_query = {"$set": {
        field: value for field, value in req.items()
    }}

    expense = await Expense.get(id)
    if not expense:
        raise HTTPException(
            status_code=404,
            detail="Expense record not found!"
        )

    await expense.update(update_query)
    return expense


@router.delete("/{id}", response_description="Expense record deleted from the database")
async def delete_expense_data(id: PydanticObjectId) -> dict:
    record = await Expense.get(id)

    if not record:
        raise HTTPException(status_code=404, detail="Expense record not found!")

    await record.delete()
    return {"message": "Record deleted successfully"}
