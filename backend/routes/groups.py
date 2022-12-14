from beanie import PydanticObjectId
from fastapi import APIRouter, HTTPException, Depends
from typing import List

from models.groups import Group, ReadGroup, CreateGroup, UpdateGroup
from models.expenses import Expense
from models.users import current_active_user


router = APIRouter()


@router.post("", response_description="Group added to the database")
async def add_group(group: CreateGroup, user=Depends(current_active_user)) -> ReadGroup:
    group_data = group.dict()
    group_data["user"] = user.id
    new_group = Group(**group_data)
    await new_group.create()
    return ReadGroup(**group.dict())


@router.get("/{id}", response_description="Group record retrieved")
async def get_group_record(id: PydanticObjectId, user=Depends(current_active_user)) -> ReadGroup:
    group = await Group.get(id)
    return ReadGroup(group.dict())


@router.get("", response_description="Group records retrieved")
async def get_groups(user=Depends(current_active_user)) -> List[ReadGroup]:
    groups = await Group.find_all().to_list()
    return groups


@router.put("/{id}", response_description="Group record updated")
async def update_group_data(id: PydanticObjectId, req: UpdateGroup, user=Depends(current_active_user)) -> ReadGroup:
    req = {k: v for k, v in req.dict().items() if v is not None}
    update_query = {"$set": {
        field: value for field, value in req.items()
    }}

    group = await Group.get(id)
    if not group:
        raise HTTPException(
            status_code=404,
            detail="Group record not found!"
        )

    await group.update(update_query)
    return group


@router.delete("/{id}", response_description="Group record deleted from the database")
async def delete_group_data(id: PydanticObjectId, user=Depends(current_active_user)) -> dict:
    record = await Group.get(id)
    expenses = await Expense.find(Expense.group.id == id).to_list()
    num_expenses = len(expenses)
    if num_expenses == 1:
        raise HTTPException(
            status_code=400,
            detail=f"{num_expenses} expense uses this group"
        )
    elif num_expenses > 1:
        raise HTTPException(
            status_code=400,
            detail=f"{num_expenses} expenses use this group"
        )
    if not record:
        raise HTTPException(
            status_code=404,
            detail="Group record not found!"
        )

    await record.delete()
    return {
        "message": "Record deleted successfully"
    }