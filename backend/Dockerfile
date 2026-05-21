# ---- Build stage ----
FROM maven:3.9.6-eclipse-temurin-21-alpine AS builder
WORKDIR /app

# Update the paths to look inside the 'backend' folder
COPY backend/pom.xml .
RUN mvn dependency:go-offline -q

# Copy the src directory from the backend folder
COPY backend/src ./src
RUN mvn clean package -DskipTests -q

# ---- Run stage ----
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Create a non-root user for security
RUN addgroup -S nexafort && adduser -S nexafort -G nexafort

# Copy the jar from the builder stage
# Note: we use /app/target/*.jar because the builder worked in /app
COPY --from=builder /app/target/*.jar app.jar

USER nexafort
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]