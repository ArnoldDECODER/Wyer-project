Wyer Take-Home Assessment
A multi-tenant SaaS prototype with role-based access control (RBAC).Built with:

Frontend: React + TypeScript
Backend: ElysiaJS + PostgreSQL
Environment: Docker for local setup

Prerequisites
Before you begin, ensure you have the following installed:

Node.js (LTS)
Docker Desktop
PostgreSQL (optional if not using Docker)

Setup

Clone the Repository
git clone https://github.com/ArnoldDECODER/arnold-take-home-test.git
cd arnold-take-home-test


Configure Environment Variables

Create wyer-backend/.env:
DATABASE_URL=postgres://postgres:pass@1@localhost:5432/wyer_db
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password


Create wyer-frontend/.env:
REACT_APP_API_URL=http://localhost:3000




Running the Application

Start with Docker:
docker compose up --build

This builds and starts:

Frontend
Backend
PostgreSQL




Run Database Migrations
docker compose exec backend npx drizzle-kit migrate


Seed the Database
docker compose exec backend node dist/db/seed.js


Access the App

Frontend: http://localhost:3001
Backend API: http://localhost:3000
Test with:
Email: user1@example.com
Authentication: OTP sent via email




Stopping the App
docker compose down



