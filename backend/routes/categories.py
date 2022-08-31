from beanie import PydanticObjectId
from fastapi import APIRouter, HTTPException
from typing import List

from models.categories import Category


router = APIRouter()


@router.post("/", response_description="Category added to the database")
async def add_category(category: Category) -> dict:
    await category.create()
    return {"message": "Category added successfully"}


@router.get("/{id}", response_description="Category record retrieved")
async def get_category_record(id: PydanticObjectId) -> Category:
    category = await Category.get(id)
    return category


@router.get("/", response_description="Category records retrieved")
async def get_categories() -> List[Category]:
    categories = await Category.find_all().to_list()
    return categories


@router.put("/{id}", response_description="Category record updated")
async def update_category_data(id: PydanticObjectId, req: Category) -> Category:
    req = {k: v for k, v in req.dict().items() if v is not None}
    update_query = {"$set": {
        field: value for field, value in req.items()
    }}

    category = await Category.get(id)
    if not category:
        raise HTTPException(
            status_code=404,
            detail="Category record not found!"
        )

    await category.update(update_query)
    return category


@router.delete("/{id}", response_description="Category record deleted from the database")
async def delete_category_data(id: PydanticObjectId) -> dict:
    record = await Category.get(id)

    if not record:
        raise HTTPException(
            status_code=404,
            detail="Category record not found!"
        )

    await record.delete()
    return {
        "message": "Record deleted successfully"
    }