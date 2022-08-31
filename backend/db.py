import motor.motor_asyncio

client = motor.motor_asyncio.AsyncIOMotorClient(
    "mongodb://root:example@localhost:27017",
    uuidRepresentation="standard")

main_db = client.trackmybudget