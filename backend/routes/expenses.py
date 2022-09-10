from beanie import PydanticObjectId
from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from typing import List, Optional
import datetime
import uuid
import os

from models.expenses import Expense
from models.accounts import Account


router = APIRouter()



@router.post("/", response_description="Expense added to the database")
async def add_expense(expense: Expense) -> Expense:
    account = await expense.account.fetch()
    new_account_amount = account.amount - expense.price
    if new_account_amount < 0:
        raise HTTPException(
            status_code=400,
            detail="Not enough money on account"
        )
    await expense.create()
    await account.update({"$set": {"amount": new_account_amount}})
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
    account = await expense.account.fetch()
    new_account_amount = None
    if "price" in req:
        if req["price"] > expense.price:
            new_account_amount = account.amount - (req["price"] - expense.price)
        elif req["price"] < expense.price:
            new_account_amount = account.amount + (expense.price - req["price"])
        else:
            new_account_amount = req["price"]  # no change in price
        if new_account_amount < 0:
            raise HTTPException(
                status_code=400,
                detail="Not enough money on account"
            )
    await expense.update(update_query)
    if new_account_amount is not None:
        await account.update({"$set": {"amount": new_account_amount}})
    return expense


@router.delete("/{id}", response_description="Expense record deleted from the database")
async def delete_expense_data(id: PydanticObjectId) -> dict:
    record = await Expense.get(id)
    if not record:
        raise HTTPException(status_code=404, detail="Expense record not found!")
    account = await record.account.fetch()
    new_account_amount = account.amount + record.price
    await record.delete()
    await account.update({"$set": {"amount": new_account_amount}})
    return {"message": "Record deleted successfully"}
