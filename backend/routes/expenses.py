from beanie import PydanticObjectId
from fastapi import APIRouter, HTTPException, Depends
from typing import List, Optional
import datetime
import uuid
import os

from models.expenses import Expense, CreateExpense, ReadExpense, UpdateExpense
from models.users import current_active_user
from models.accounts import Account


router = APIRouter()



@router.post("/", response_description="Expense added to the database")
async def add_expense(expense: CreateExpense, user=Depends(current_active_user)) -> ReadExpense:
    account = await expense.account.fetch()
    new_account_amount = account.amount - expense.price
    if new_account_amount < 0:
        raise HTTPException(
            status_code=400,
            detail="Not enough money on account"
        )
    expense_data = expense.dict()
    expense_data["user"] = user.id
    print(expense_data)
    new_expense = Expense(**expense_data)
    await new_expense.create()
    await account.update({"$set": {"amount": new_account_amount}})
    return new_expense


@router.get("/{id}", response_description="Expense record retrieved")
async def get_expense_record(id: PydanticObjectId, user=Depends(current_active_user)) -> ReadExpense:
    expense = await Expense.get(id, fetch_links=True)
    return expense


@router.get("/", response_description="Expense records retrieved")
async def get_expenses(user=Depends(current_active_user)) -> List[ReadExpense]:
    expenses = await Expense.find_all(fetch_links=True).to_list()
    return expenses


@router.put("/{id}", response_description="Expense record updated")
async def update_expense_data(id: PydanticObjectId, req: UpdateExpense, user=Depends(current_active_user)) -> ReadExpense:
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
async def delete_expense_data(id: PydanticObjectId, user=Depends(current_active_user)) -> dict:
    record = await Expense.get(id)
    if not record:
        raise HTTPException(status_code=404, detail="Expense record not found!")
    account = await record.account.fetch()
    new_account_amount = account.amount + record.price
    await record.delete()
    await account.update({"$set": {"amount": new_account_amount}})
    return {"message": "Record deleted successfully"}
