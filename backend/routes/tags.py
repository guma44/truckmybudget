from beanie import PydanticObjectId
from fastapi import APIRouter, HTTPException, Depends
from typing import List

from models.tags import Tag
from models.expenses import Expense
from models.users import current_active_user


router = APIRouter()


@router.post("/", response_description="Tag added to the database")
async def add_tag(tag: Tag, user=Depends(current_active_user)) -> dict:
    await tag.create()
    return {"message": "Tag added successfully"}


@router.get("/{id}", response_description="Tag record retrieved")
async def get_tag_record(id: PydanticObjectId, user=Depends(current_active_user)) -> Tag:
    tag = await Tag.get(id)
    return tag


@router.get("/", response_description="Tag records retrieved")
async def get_tags(user=Depends(current_active_user)) -> List[Tag]:
    tags = await Tag.find_all().to_list()
    return tags


@router.put("/{id}", response_description="Tag record updated")
async def update_tag_data(id: PydanticObjectId, req: Tag, user=Depends(current_active_user)) -> Tag:
    req = {k: v for k, v in req.dict().items() if v is not None}
    update_query = {"$set": {
        field: value for field, value in req.items()
    }}

    tag = await Tag.get(id)
    if not tag:
        raise HTTPException(
            status_code=404,
            detail="Tag record not found!"
        )

    await tag.update(update_query)
    return tag


@router.delete("/{id}", response_description="Tag record deleted from the database")
async def delete_tag_data(id: PydanticObjectId, user=Depends(current_active_user)) -> dict:
    record = await Tag.get(id)
    expenses = await Expense.find(Expense.tags.id == id).to_list()
    num_expenses = len(expenses)
    if num_expenses == 1:
        raise HTTPException(
            status_code=400,
            detail=f"{num_expenses} expense uses this tag"
        )
    elif num_expenses > 1:
        raise HTTPException(
            status_code=400,
            detail=f"{num_expenses} expenses use this tag"
        )
    if not record:
        raise HTTPException(
            status_code=404,
            detail="Tag record not found!"
        )

    await record.delete()
    return {
        "message": "Record deleted successfully"
    }