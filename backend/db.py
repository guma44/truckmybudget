import motor.motor_asyncio
from config.settings import settings

print("Settings")
print(settings)
client = motor.motor_asyncio.AsyncIOMotorClient(
    settings.DB_URL,
    uuidRepresentation="standard")

main_db = client.trackmybudget