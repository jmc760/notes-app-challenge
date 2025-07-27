# Use a Java base image
FROM openjdk:21-jdk-slim

# Create a non-root user and group for security
RUN groupadd -r springgroup && useradd -r -g springgroup springuser

# Set the working directory inside the container and ensure it's owned by the new user
WORKDIR /home/springuser/app
RUN chown -R springuser:springgroup /home/springuser/app

# Copy Maven Wrapper files (these define the Maven version)
COPY .mvn .mvn
COPY mvnw .
COPY mvnw.cmd .

# Ensure mvnw is executable
RUN chmod +x mvnw

# Copy pom.xml to leverage layer caching
COPY pom.xml .

# Download project dependencies using the Maven Wrapper
# Note: The Maven Wrapper will download the specific Maven version defined in .mvn/wrapper/maven-wrapper.properties
RUN ./mvnw dependency:go-offline

# Copy the rest of the source code
COPY src ./src

# Compile the Spring Boot application using the Maven Wrapper
RUN ./mvnw clean install -DskipTests

# Copy the generated JAR
COPY target/*.jar app.jar

# Switch to the non-root user for running the application
USER springuser

# Expose the default Spring Boot port
EXPOSE 8080

# Command to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]