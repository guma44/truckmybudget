from pydantic import BaseSettings, DirectoryPath, MongoDsn, AnyHttpUrl

class Settings(BaseSettings):
    DB_URL: MongoDsn
    ALLOW_NEW_USERS: bool = False
    ROOT_PATH: str = ""
    ORIGIN: AnyHttpUrl = "http://localhost:3000"
    FILES_DIR: DirectoryPath = "/data/files"

    class Config:
        env_prefix = "TMB_BACKEND_"

settings = Settings()