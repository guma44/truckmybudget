import os

from fastapi import FastAPI, Body, HTTPException, status, File, UploadFile
from fastapi.responses import Response, JSONResponse
from fastapi.encoders import jsonable_encoder
from typing import Optional, List
import uuid

from fastapi import Depends, FastAPI

from beanie import init_beanie
from fastapi import Depends, FastAPI
from fastapi.staticfiles import StaticFiles

from db import main_db
from routes.expenses import router as expenses_router
from routes.categories import router as categories_router
from routes.tags import router as tags_router
from models.users import (
    User,
    UserCreate,
    UserRead,
    UserUpdate,
    auth_backend,
    current_active_user,
    fastapi_users,
)
from models.expenses import Expense
from models.categories import Category
from models.tags import Tag

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
app.include_router(
    fastapi_users.get_auth_router(auth_backend), prefix="/auth/jwt", tags=["auth"]
)

app.include_router(expenses_router, tags=["expenses"], prefix="/expenses")
app.include_router(categories_router, tags=["categories"], prefix="/categories")
app.include_router(tags_router, tags=["tags"], prefix="/tags")
app.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
    prefix="/auth",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_reset_password_router(),
    prefix="/auth",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_verify_router(UserRead),
    prefix="/auth",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_users_router(UserRead, UserUpdate),
    prefix="/users",
    tags=["users"],
)


@app.on_event("startup")
async def on_startup():
    await init_beanie(
        database=main_db,
        document_models=[User, Expense, Category, Tag],
    )


@app.post("/upload_invoice", tags=["uploads"])
def upload(file: UploadFile = File(...)):
    try:
        contents = file.file.read()
        filename = uuid.uuid4().hex + os.path.splitext(file.filename)[-1]
        with open(os.path.join("static/invoices", filename), "wb") as f:
            f.write(contents)
    except Exception:
        raise HTTPException(
            status_code=500, detail="There was an error uploading the file"
        )
    finally:
        file.file.close()

    return {"message": f"Successfully uploaded", "name": filename}
