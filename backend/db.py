import motor.motor_asyncio
# from config.settings import settings


client = motor.motor_asyncio.AsyncIOMotorClient(
    "mongodb://root:trackmybudget@db:27017",
    uuidRepresentation="standard")

main_db = client.trackmybudget