# Juan Manuel Cerdeira's Notes App

**[Versión en español de este README: README.es.md]**

This project features a full-stack application designed to manage notes, demonstrating proficiency in modern web development technologies. It includes a React-based frontend, a Spring Boot backend, a MySQL database, and phpMyAdmin for database management, all orchestrated using Docker Compose.

## Features

* **Note Management:**
  * Create new notes.
  * View active notes.
  * View archived notes.
  * Edit existing notes.
  * Archive and unarchive notes.
  * Delete notes.

## Architecture

The application follows a standard microservices-like architecture, with distinct components communicating via REST APIs:

* **Frontend:** Built with React, served by Nginx.
* **Backend:** Developed using Spring Boot (Java) for REST API endpoints.
* **Database:** MySQL for persistent data storage.
* **Database Management:** phpMyAdmin for a web-based interface to the MySQL database.
* **Orchestration:** Docker Compose to manage and run all services in isolated containers.

## Prerequisites

Ensure you have the following installed on your system:

* **Git:** For cloning the repository.
* **Docker Desktop** (or Docker Engine and Docker Compose CLI):
  * **Docker Engine:** Version `20.10.0` or higher (e.g., `20.10.25`).
  * **Docker Compose:** Version `v2.0.0` or higher (e.g., `v2.24.5`).

## Runtimes, Engines, Tools & Concrete Versions

The following tools and runtimes are used within the Docker containers:

* **Java Development Kit (JDK):** `OpenJDK 21` (used in backend Dockerfile).
* **Maven:** Version `3.9.11` (used via Maven Wrapper, specified in `.mvn/wrapper/maven-wrapper.properties`).
* **Spring Boot:** Version `3.3.1` (specified in `pom.xml`).
* **MySQL Database:** Version `8.0` (used in `docker-compose.yml`).
* **phpMyAdmin:** `latest` (used in `docker-compose.yml`).
* **Node.js:** Version `22-alpine` (used in frontend Dockerfile).
* **npm:** Version `10.9.2` (comes with Node.js 22, used for dependency management).
* **React:** Version `19.1.0` (specified in `frontend/package.json`).
* **Vite:** Version `7.0.4` (specified in `frontend/package.json`, used for React build).
* **TypeScript:** Version `5.8.3` (specified in `frontend/package.json`, used for type-checking and compilation).
* **ESLint:** Version `9.30.1` (specified in `frontend/package.json`, used for code linting).
* **React Router DOM:** Version `7.7.1` (specified in `frontend/package.json`, used for client-side routing).
* **Nginx:** `alpine` image (used in frontend Dockerfile for serving React app).

## How to Run the Application

Follow these steps to get the application up and running:

1. **Clone the repository:**

    ```bash
    git clone [https://github.com/jmc760/notes-app-challenge](https://github.com/jmc760/notes-app-challenge)
    ```

2. **Navigate to the project root directory:**

    ```bash
    cd Cerdeira-eb9bc4
    ```

3. **Grant execute permissions to the startup script:**

    ```bash
    chmod +x run.sh
    ```

    *This step is necessary only once after cloning the repository.*

4. **Start the application:**

    ```bash
    ./run.sh
    ```

    This command will build the Docker images (if necessary) and bring up all the services defined in `docker-compose.yml` in detached mode (background), **waiting for them to become healthy** before completing.

    **Important Note for First-Time Execution:**
    The very first time you run `./run.sh`, the process may take several minutes (typically 5-15 minutes, depending on your internet connection and machine specifications). This is because Docker needs to download base images, install project dependencies (Node.js and Maven), and build the applications from scratch. Subsequent executions will be significantly faster due to Docker's build cache.

## Accessing the Application

Once the containers are up and running, you can access the different parts of the application:

* **Frontend (React App):** `http://localhost`
  * This is where you'll interact with the Notes application.
* **Backend API (Spring Boot):** `http://localhost:8080/api`
  * The base URL for all your backend REST API endpoints. (e.g., `http://localhost:8080/api/notes`).
* **phpMyAdmin:** `http://localhost:8081`
  * **Default Credentials:**
    * **Username:** `root`
    * **Password:** `root_password`
    * (Alternatively, you can use `user` / `password` for the `notes_app_db` database).

## How to Stop the Application

To stop and remove all containers, networks, and volumes created by Docker Compose, run the following command from the project root directory:

```bash
docker compose down -v
