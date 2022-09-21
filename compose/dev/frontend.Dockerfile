FROM node:18

# Set the working directory to /app inside the container
WORKDIR /opt/frontend
EXPOSE 3000

# Start the app
ENTRYPOINT ["npm", "start"]