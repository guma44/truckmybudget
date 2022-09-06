import os

from fastapi import FastAPI, Body, HTTPException, status, File, UploadFile
from fastapi.responses import Response, JSONResponse
from fastapi.encoders import jsonable_encoder
from typing import Optional, List
import uuid

from beanie import init_beanie
from fastapi import Depends, FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

from db import main_db
from routes.expenses import router as expenses_router
from routes.groups import router as groups_router
from routes.tags import router as tags_router
from routes.invoices import router as invoices_router
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
from models.groups import Group
from models.tags import Tag
from models.invoices import Invoice

app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.mount("/static", StaticFiles(directory="static"), name="static")
app.include_router(
    fastapi_users.get_auth_router(auth_backend), prefix="/auth/jwt", tags=["auth"]
)

app.include_router(expenses_router, tags=["expenses"], prefix="/expenses")
app.include_router(groups_router, tags=["groups"], prefix="/groups")
app.include_router(tags_router, tags=["tags"], prefix="/tags")
app.include_router(invoices_router, tags=["invoices"], prefix="/invoices")
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
        document_models=[User, Expense, Group, Tag, Invoice],
    )

