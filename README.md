
<div align="center">

# 🛡️ NexaFort  
### Enterprise Multi-Role Project Workspace Platform

### ⚡ Production-Grade Full Stack Infrastructure System  
### Built with Java 21 • Spring Boot 3 • PostgreSQL • Redis • React • Docker

<br>

![Java](https://img.shields.io/badge/Java-21-orange?style=for-the-badge&logo=openjdk)
![Spring Boot](https://img.shields.io/badge/SpringBoot-3.x-brightgreen?style=for-the-badge&logo=springboot)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue?style=for-the-badge&logo=postgresql)
![Redis](https://img.shields.io/badge/Redis-Caching-red?style=for-the-badge&logo=redis)
![React](https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react)
![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?style=for-the-badge&logo=docker)
![Security](https://img.shields.io/badge/Security-JWT%20%2B%20RBAC-success?style=for-the-badge)

<br><br>

> **A production-oriented enterprise workspace system engineered with modern backend architecture, scalable infrastructure patterns, and secure multi-role access control.**

</div>

---

# 🧠 Engineering Context

NexaFort was designed as a **real-world backend infrastructure system**, not a traditional CRUD portfolio application.

The project focuses on:

- Enterprise authentication flows  
- Role-based authorization systems  
- Infrastructure-aware backend engineering  
- API scalability and observability  
- Distributed caching strategies  
- Production deployment readiness  

The architecture intentionally mirrors patterns commonly found in internal enterprise products and SaaS management systems.

---

# 🚀 Executive Overview

Modern enterprise workspace platforms require solving significantly more than basic CRUD operations.

Real systems must address:

- Secure authentication lifecycles  
- Permission isolation  
- Stateless scalability  
- Infrastructure orchestration  
- Request tracing  
- Caching efficiency  
- Frontend state synchronization  
- Deployment portability  

NexaFort addresses these challenges through a modular full-stack architecture combining:

- Spring Boot backend infrastructure  
- JWT security pipelines  
- Redis caching  
- PostgreSQL persistence  
- Dockerized deployment  
- Modern React frontend systems  

---

# 🎯 Problem Statement

Many portfolio projects demonstrate only superficial functionality:

❌ Weak authentication flows  
❌ No refresh token lifecycle  
❌ No scalable architecture  
❌ No caching strategy  
❌ No security hardening  
❌ No deployment orchestration  
❌ No infrastructure thinking  

As a result, they fail to represent real production engineering.

---

# 💡 Solution: Production-Oriented Workspace Platform

NexaFort introduces a modular architecture inspired by enterprise backend systems.

The platform provides:

✅ Stateless JWT authentication  
✅ Refresh token lifecycle management  
✅ Role-based access control  
✅ Secure API boundaries  
✅ Redis caching  
✅ Request tracing  
✅ Audit logging  
✅ Dockerized infrastructure  
✅ Premium frontend experience  

---

# 🏗️ System Architecture

```text
React + Vite + Tailwind Frontend
                ↓
Spring Boot REST API
        ↓                ↓
PostgreSQL          Redis Cache
        ↓
Security + Audit + Observability Layer
````

---

# ⚙️ Core Backend Features

## 🔐 JWT Authentication Infrastructure

* Access token + refresh token lifecycle
* Stateless Spring Security configuration
* Secure token validation pipelines

---

## 🛡️ Role-Based Access Control (RBAC)

Supports:

* `ROLE_USER`
* `ROLE_ADMIN`

Authorization is enforced at API boundary level using Spring Security.

---

## 📦 Project Workspace Engine

Features:

* CRUD operations
* Pagination
* Sorting
* Status filtering
* Priority filtering

Designed for scalable API consumption.

---

## ⚡ Redis Caching Layer

Implements:

* Read optimization
* Cache eviction on writes
* Reduced database load

Improving backend throughput and response times.

---

## 📋 Admin Operations Layer

Administrative capabilities include:

* Viewing all users
* Updating user roles
* Removing users
* Inspecting all projects

---

## 📊 Request Tracing & Audit Logging

Includes:

* Correlation ID tracing
* Audit event logging
* Async logging architecture

Enhancing production observability and debugging.

---

## 🚦 Authentication Rate Limiting

Authentication endpoints protected via:

* Bucket4j token bucket strategy

Reducing brute-force attack vectors.

---

## 🧼 Input Sanitization Layer

Implemented through:

```text
InputSanitizer.java
```

Protecting persistence layers against unsafe payload injection.

---

# 🎨 Frontend Features

## 🌗 Dark & Light Themes

Adaptive theme support with responsive rendering.

---

## 🔒 Protected Route System

Supports:

* JWT persistence
* Automatic token refresh
* Auth-aware route protection

---

## 📈 Analytics Dashboard

Built using:

* Recharts
* Dynamic visualizations
* Responsive dashboard layouts

---

## ✨ Premium UI Experience

Frontend includes:

* Glassmorphism-inspired UI
* Framer Motion transitions
* Route-based code splitting
* Responsive layouts

---

# 🛠️ Tech Stack

| Layer            | Technology            |
| ---------------- | --------------------- |
| Backend          | Java 21               |
| Framework        | Spring Boot 3         |
| Database         | PostgreSQL            |
| Cache            | Redis                 |
| Frontend         | React + Vite          |
| Styling          | Tailwind CSS          |
| Security         | Spring Security + JWT |
| Documentation    | Swagger/OpenAPI       |
| Containerization | Docker                |

---

# 📂 Project Structure

```text
nexafort-complete/
├── backend/
│   ├── src/main/java/com/nexafort/
│   │   ├── audit/
│   │   ├── cache/
│   │   ├── config/
│   │   ├── controller/
│   │   ├── dto/
│   │   ├── entity/
│   │   ├── exception/
│   │   ├── logging/
│   │   ├── mapper/
│   │   ├── repository/
│   │   ├── security/
│   │   ├── service/
│   │   └── util/
│   └── Dockerfile
│
├── frontend/
├── postman/
├── docs/
│   └── screenshots/
├── docker-compose.yml
└── render.yaml
```

---

# 📸 Screenshots

Included preview assets:

* Login Dashboard
* Analytics Workspace
* Project Management View
* Admin Operations Panel

---

# 📡 API Overview

## 🔐 Authentication APIs

```http
POST /api/v1/auth/register
POST /api/v1/auth/login
POST /api/v1/auth/refresh
```

---

## 📦 Project APIs

```http
POST   /api/v1/projects
GET    /api/v1/projects
GET    /api/v1/projects/{id}
PUT    /api/v1/projects/{id}
DELETE /api/v1/projects/{id}
```

Supports:

* Pagination
* Sorting
* Filtering

---

## 👑 Admin APIs

```http
GET    /api/v1/admin/users
PUT    /api/v1/admin/users/{id}/role
DELETE /api/v1/admin/users/{id}
GET    /api/v1/admin/projects
```

---

# 🔒 Security Engineering

NexaFort implements multiple production-grade security layers.

## ✅ Credential Security

* BCrypt password hashing
* Secure credential validation

---

## ✅ Token Lifecycle Security

* Short-lived JWT access tokens
* Refresh token persistence
* Stateless auth architecture

---

## ✅ Brute Force Protection

Rate-limited authentication endpoints using Bucket4j.

---

## ✅ Secure Persistence Layer

* DTO validation
* Input sanitization
* Parameterized JPA queries

Reducing SQL injection risk.

---

## ✅ Controlled CORS Policies

Environment-configurable origin restrictions.

---

# ⚡ Scalability & Infrastructure Design

## 🚀 Stateless Authentication

Supports:

* Horizontal scaling
* Multi-instance deployments

---

## ⚡ Redis Optimization

Caching reduces repeated database reads and improves response latency.

---

## 🧩 Modular Package Architecture

Backend package boundaries support:

* Future microservice extraction
* Independent scaling
* Easier maintainability

---

## 📋 Async Audit Logging

Improves request throughput while preserving observability.

---

# ⚠️ Engineering Limitations & Research Direction

While NexaFort demonstrates strong production-oriented architecture, several important system challenges remain:

* Current deployment is monolithic, not microservice-based
* No distributed event streaming implemented
* No real-time collaborative synchronization layer
* Limited observability beyond request tracing
* No distributed authorization gateway architecture

These limitations create future opportunities involving:

* Event-driven systems
* Real-time infrastructure
* Distributed backend orchestration
* Cloud-native deployments

---

# 🚀 Future Roadmap

## 🌐 Real-Time Collaboration

* WebSocket synchronization
* Multi-user project editing
* Live workspace updates

---

## ☁️ Kubernetes Deployment

* Container orchestration
* Horizontal autoscaling
* Infrastructure resilience

---

## 📡 Event-Driven Architecture

* Kafka integration
* Distributed messaging
* Async event pipelines

---

## 🔍 Advanced Observability

* OpenTelemetry integration
* Metrics dashboards
* Distributed tracing systems

---

## 🤖 AI Workspace Intelligence

* AI-generated project summaries
* Smart workflow insights
* Automated productivity suggestions

---

# 🚀 Local Development

## Prerequisites

* Java 21
* Maven
* Node.js 20+
* Docker Desktop

---

# 🐳 Run with Docker

```bash
cp .env.example .env
docker-compose up --build
```

---

## Services

| Service    | URL                                                                            |
| ---------- | ------------------------------------------------------------------------------ |
| Backend    | [http://localhost:8080](http://localhost:8080)                                 |
| Swagger UI | [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html) |
| Frontend   | [http://localhost:5173](http://localhost:5173)                                 |

---

# 💻 Run Locally

## Backend

```bash
cd backend
mvn "-Dmaven.repo.local=.m2" spring-boot:run
```

---

## Frontend

```bash
cd frontend
npm install
npm run dev
```

---

# 🚀 Deployment

Deployment configurations included for:

* Render
* Vercel

Files:

```text
render.yaml
frontend/vercel.json
```

Suggested deployed URLs:

```text
Backend  → https://nexafort-backend.onrender.com
Frontend → https://nexa-fort.vercel.app
```

---

# 📮 Postman Collection

Ready-to-import collection:

```text
postman/NexaFort.postman_collection.json
```

---

# 🌟 Why This Project Stands Out

Unlike basic CRUD portfolio systems, NexaFort demonstrates:

✅ Enterprise backend architecture
✅ Secure authentication engineering
✅ Infrastructure-aware development
✅ Production deployment readiness
✅ Full-stack scalability thinking
✅ Security-focused API design
✅ Modern frontend architecture
✅ Dockerized infrastructure workflows

---

# 👨‍💻 Developer

## Ashish Patel

Focused on building:

* Enterprise Backend Systems
* AI Infrastructure Platforms
* Scalable Full-Stack Architectures
* Production-Oriented Engineering Solutions

---

<div align="center">

# 🌟 Final Statement

> **NexaFort is not a simple CRUD application.**
> It is a production-oriented enterprise workspace platform engineered using real-world backend architecture principles.

<br>

# 🛡️ NexaFort Engineers Reliability at Scale.

</div>

