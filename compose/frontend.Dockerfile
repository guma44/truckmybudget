FROM node:18

# Set the working directory to /app inside the container
WORKDIR /app
# Copy app files
RUN echo "BEFORE"
COPY ./frontend .
RUN ls

# ==== BUILD =====
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm ci 
# Build the app

# ==== RUN =======

# Set the env to "production"
ENV NODE_ENV pro
RUN chmod +x /app/entrypoint.sh
# Expose the port on which the app will be running (3000 is the default that `serve` uses)
EXPOSE 3000

# Start the app
ENTRYPOINT [ "./entrypoint.sh" ]