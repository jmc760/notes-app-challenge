#!/bin/bash

# Define the project name for Docker Compose
PROJECT_NAME="notes_app_cerdeira"

echo "--- Stopping and removing any existing containers, networks, and volumes for ${PROJECT_NAME} ---"
# -p: Specify project name
# --remove-orphans: Remove containers for services not defined in the Compose file
# -v: Remove named volumes declared in the `volumes` section of the Compose file
docker compose -p "${PROJECT_NAME}" down --remove-orphans -v

echo "--- Building and starting all services for ${PROJECT_NAME} ---"
# --build: Build images before starting containers. This is crucial for initial setup and code changes.
# -d: Run containers in detached mode (in the background)
# --wait: Wait for services to be healthy or exit (requires healthchecks to be defined)
# --timeout 300: Set a timeout for the --wait condition (e.g., 300 seconds = 5 minutes)
docker compose -p "${PROJECT_NAME}" up --build -d --wait --timeout 300

# Check if the services are healthy after startup
if [ $? -eq 0 ]; then
    echo "--- ${PROJECT_NAME} application started successfully! ---"
    echo "You can access phpMyAdmin at: http://localhost:8081"
    echo "Your frontend application should be available at: http://localhost"
    echo "Backend API base URL: http://localhost:8080/api"
else
    echo "--- Failed to start ${PROJECT_NAME} application. Check logs for details. ---"
    docker compose -p "${PROJECT_NAME}" logs
    exit 1
fi
