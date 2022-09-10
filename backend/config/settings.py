from pydantic import BaseSettings

class Settings(BaseSettings):
    TMB_BACKEND_DB_URL: str

    # class Config:
    #     prefix="TMB_BACKEND_"

settings = Settings()