    #!/bin/bash

    # Define the project name for Docker Compose
    PROJECT_NAME="notes_app_cerdeira"

    echo "--- Stopping and removing any existing containers, networks, and volumes for ${PROJECT_NAME} ---"
    # This command stops and removes all services, their networks, and named volumes.
    # It relies on the modern 'docker compose' syntax.
    # -v: Removes named volumes declared in the `volumes` section of the Compose file.
    # Note: '-p' and '--remove-orphans' are often not needed or supported by 'docker compose down' in newer versions.
    docker compose down -v

    echo "--- Building and starting all services for ${PROJECT_NAME} ---"
    # This command builds (or rebuilds) images and starts all services in detached mode.
    # --build: Ensures images are built from their Dockerfiles.
    # -d: Runs containers in detached (background) mode.
    # --wait: Waits for services to reach a 'healthy' state (based on healthchecks in docker-compose.yml).
    # --timeout 300: Sets a 5-minute timeout for the --wait condition.
    docker compose up --build -d --wait --timeout 300

    # Check if the services started successfully (exit code of the last command)
    if [ $? -eq 0 ]; then
        echo "--- ${PROJECT_NAME} application started successfully! ---"
        echo "You can access phpMyAdmin at: http://localhost:8081"
        echo "Your frontend application should be available at: http://localhost"
        echo "Backend API base URL: http://localhost:8080/api"
    else
        echo "--- Failed to start ${PROJECT_NAME} application. Check logs for details. ---"
        # Show logs of all services if startup fails to help diagnose
        docker compose logs
        exit 1
    fi
