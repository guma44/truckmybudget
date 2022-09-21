version: '3.1'

services:
  db:
    image: mongo:4.4
    container_name: tmb_mongodb
    restart: unless-stopped
    volumes:
      - <PATH TO DB DATA STORAGE>:/data/db
    ports:
      - 27017:27017
    environment:
      MONGO_INITDB_DATABASE: trackmybudget
      MONGO_INITDB_ROOT_USERNAME: <ROOT USERNAME>
      MONGO_INITDB_ROOT_PASSWORD: <ROOT PASSWORD>
  tmb:
    image: guma44/tmb:latest
    container_name: tmb_app
    restart: unless-stoppedHi 
    depends_on:
      - db
    volumes:
      - <PATH TO FILES DATA STORAGE>:/data/files:rw
    environment:
      - TMB_BACKEND_DB_URL=mongodb://<ROOT USERNAME>:<ROOT PASSWORD>@db:27017
      - TMB_BACKEND_ALLOW_NEW_USERS=True
      - TMB_BACKEND_ORIGIN=<YOUR DOMAIN>  # eg. https://example.com
      - API_ENTRYPOINT=<YOUR DOMAIN>/api/
    ports:
      - "9001:9001"
      - "8765:80"