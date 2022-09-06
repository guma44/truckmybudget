import os
import uuid
from beanie import PydanticObjectId
from fastapi import APIRouter, HTTPException, UploadFile, File
from typing import List

from models.invoices import Invoice


router = APIRouter()


async def upload_file(file, directory):
    filepath = None
    if file is not None:
        try:
            contents = file.file.read()
            filename = uuid.uuid4().hex + os.path.splitext(file.filename)[-1]
            with open(os.path.join("files", directory, filename), "wb") as f:
                f.write(contents)
            filepath = os.path.join("files", directory, filename)
        except Exception as exc:
            raise HTTPException(status_code=500, detail=str(exc))
        finally:
            file.file.close()
    return filepath


@router.post("/", response_description="Invoice added to the database")
async def upload_invoice(file: UploadFile = File(...)) -> Invoice:
    invoice_path = await upload_file(file, "invoices")
    invoice = Invoice(path=invoice_path, name=file.filename)
    await invoice.create()
    return invoice


@router.get("/{id}", response_description="Invoice record retrieved")
async def get_invoice_record(id: PydanticObjectId) -> Invoice:
    invoice = await Invoice.get(id)
    return invoice


@router.get("/", response_description="Invoice records retrieved")
async def get_invoices() -> List[Invoice]:
    invoices = await Invoice.find_all().to_list()
    return invoices


@router.put("/{id}", response_description="Invoice record updated")
async def update_invoice_data(id: PydanticObjectId, req: Invoice) -> Invoice:
    req = {k: v for k, v in req.dict().items() if v is not None}
    update_query = {"$set": {field: value for field, value in req.items()}}

    invoice = await Invoice.get(id)
    if not invoice:
        raise HTTPException(status_code=404, detail="Invoice record not found!")

    await invoice.update(update_query)
    return invoice


@router.delete("/{id}", response_description="Invoice record deleted from the database")
async def delete_invoice_data(id: PydanticObjectId) -> dict:
    record = await Invoice.get(id)

    if not record:
        raise HTTPException(status_code=404, detail="Invoice record not found!")

    await record.delete()
    return {"message": "Record deleted successfully"}
