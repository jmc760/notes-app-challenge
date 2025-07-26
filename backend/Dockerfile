# Use a Java base image
FROM openjdk:21-jdk-slim

# Create a non-root user and group for security
RUN groupadd -r springgroup && useradd -r -g springgroup springuser

# Set the working directory inside the container and ensure it's owned by the new user
WORKDIR /home/springuser/app
RUN chown -R springuser:springgroup /home/springuser/app

# Copy Maven (pom.xml) file to leverage layer caching
COPY pom.xml .
COPY src ./src

# Download project dependencies.
RUN apt-get update && apt-get install -y maven \
    && mvn dependency:go-offline

# Compile the Spring Boot application
RUN mvn clean install -DskipTests

# Copy the generated JAR
COPY target/*.jar app.jar

# Switch to the non-root user for running the application
USER springuser

# Expose the default Spring Boot port
EXPOSE 8080

# Command to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
