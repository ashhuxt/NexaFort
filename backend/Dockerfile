# ---- Build stage ----
FROM maven:3.9.6-eclipse-temurin-21-alpine AS builder
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline -q
COPY src ./src
RUN mvn clean package -DskipTests -q

# ---- Run stage ----
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
RUN addgroup -S nexafort && adduser -S nexafort -G nexafort
COPY --from=builder /app/target/*.jar app.jar
USER nexafort
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
