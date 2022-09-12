import os
import uuid
from beanie import PydanticObjectId
from fastapi import APIRouter, HTTPException, UploadFile, File, Depends
from fastapi.responses import FileResponse
from typing import List

from models.invoices import Invoice
from models.users import current_active_user


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


@router.post("/", response_description="Invoice added to the database")
async def upload_invoice(file: UploadFile = File(...), user=Depends(current_active_user)) -> Invoice:
    invoice_path = await upload_file(file, "invoices")
    invoice = Invoice(path=invoice_path, name=file.filename)
    await invoice.create()
    return invoice


@router.get("/{id}", response_description="Invoice record retrieved")
async def get_invoice_record(id: PydanticObjectId, user=Depends(current_active_user)) -> Invoice:
    invoice = await Invoice.get(id)
    return invoice

@router.get("/{id}/download")
async def download_invoice(id: PydanticObjectId, user=Depends(current_active_user)):
    invoice = await Invoice.get(id)
    file_extension = os.path.splitext(invoice.name)[-1]
    if file_extension.lower() in ["pdf"]:
        media_type = "application/pdf"
    elif file_extension.lower() in ["jpeg", "jpg", "png"]:
        media_type = "image/jpg"
    else:
        media_type = "text/plain"
    return FileResponse(
        path=os.path.join("static", "invoices", invoice._id),
        filename=invoice.name,
        media_type=media_type)

@router.get("/", response_description="Invoice records retrieved")
async def get_invoices(user=Depends(current_active_user)) -> List[Invoice]:
    invoices = await Invoice.find_all().to_list()
    return invoices


@router.put("/{id}", response_description="Invoice record updated")
async def update_invoice_data(id: PydanticObjectId, req: Invoice, user=Depends(current_active_user)) -> Invoice:
    req = {k: v for k, v in req.dict().items() if v is not None}
    update_query = {"$set": {field: value for field, value in req.items()}}

    invoice = await Invoice.get(id)
    if not invoice:
        raise HTTPException(status_code=404, detail="Invoice record not found!")

    await invoice.update(update_query)
    return invoice


@router.delete("/{id}", response_description="Invoice record deleted from the database")
async def delete_invoice_data(id: PydanticObjectId, user=Depends(current_active_user)) -> dict:
    record = await Invoice.get(id)

    if not record:
        raise HTTPException(status_code=404, detail="Invoice record not found!")

    await record.delete()
    return {"message": "Record deleted successfully"}
