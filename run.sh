#!/bin/bash

# Stop and remove existing containers, networks, and volumes for the project
echo "Stopping and removing existing containers, networks, and volumes for note_app_cerdeira..."
docker compose -p note_app_cerdeira down -v

# Build (or rebuild) services
echo "Building (or rebuilding) services for note_app_cerdeira..."
docker compose -p note_app_cerdeira build --no-cache

# Start the application in detached mode
echo "Starting note_app_cerdeira in detached mode..."
docker compose -p note_app_cerdeira up -d

echo "note_app_cerdeira application started successfully!"
echo "You can access phpMyAdmin at: http://localhost:8081"
echo "Your frontend application should be available at: http://localhost:80"