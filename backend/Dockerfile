# --- Build Stage ---
# Use an official Maven image which includes JDK
FROM maven:3.9.6-eclipse-temurin-21 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy Maven files (pom.xml) and source code
# This leverages Docker's layer caching: if pom.xml doesn't change,
# dependencies won't be downloaded again.
COPY pom.xml .
COPY src ./src

# Compile the Spring Boot application
# -B: Batch mode (no interaction)
# -DskipTests: Skips test execution
# -e: Shows more detailed errors
RUN mvn -B clean install -DskipTests -e

# --- Final Stage (Runtime Stage) ---
# Use a lightweight OpenJDK image for the runtime environment
FROM openjdk:21-jdk-slim

# Install curl for healthcheck (necessary in the final image)
# apt-get update is needed before apt-get install
RUN apt-get update && apt-get install -y curl --no-install-recommends && rm -rf /var/lib/apt/lists/*

# Create a non-root user and group for security
RUN groupadd -r springgroup && useradd -r -g springgroup springuser

# Set the working directory inside the container
WORKDIR /home/springuser/app

# Copy the generated JAR from the build stage
# 'build' is the name of the previous stage (FROM ... AS build)
COPY --from=build /app/target/*.jar app.jar

# Switch to the non-root user to run the application
USER springuser

# Expose the default Spring Boot port
EXPOSE 8080

# Command to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
