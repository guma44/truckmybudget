from beanie import PydanticObjectId
from fastapi import APIRouter, HTTPException, Depends
from typing import List
from models.accounts import Account, AmendAccount
from models.users import current_active_user


router = APIRouter()



@router.post("/", response_description="Account added to the database")
async def add_account(account: Account, user=Depends(current_active_user)) -> Account:
    await account.create()
    return account


@router.get("/{id}", response_description="Account record retrieved")
async def get_account_record(id: PydanticObjectId, user=Depends(current_active_user)) -> Account:
    account = await Account.get(id, fetch_links=True)
    return account


@router.get("/", response_description="Account records retrieved")
async def get_accounts(user=Depends(current_active_user)) -> List[Account]:
    accounts = await Account.find_all(fetch_links=True).to_list()
    return accounts


@router.put("/{id}", response_description="Account record updated")
async def update_account_data(id: PydanticObjectId, req: Account, user=Depends(current_active_user)) -> Account:
    req = {k: v for k, v in req.dict().items() if v is not None}
    update_query = {"$set": {
        field: value for field, value in req.items()
    }}

    account = await Account.get(id)
    if not account:
        raise HTTPException(
            status_code=404,
            detail="Account record not found!"
        )

    await account.update(update_query)
    return account


@router.delete("/{id}", response_description="Account record deleted from the database")
async def delete_account_data(id: PydanticObjectId, user=Depends(current_active_user)) -> dict:
    record = await Account.get(id)

    if not record:
        raise HTTPException(status_code=404, detail="Account record not found!")

    await record.delete()
    return {"message": "Account deleted successfully"}
