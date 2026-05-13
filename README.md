# Personal Finance Tracker

Full-stack assignment project using React, Node.js, Express, PostgreSQL, Redis, JWT, RBAC, Recharts, rate limiting, and Swagger.

## Features

- Register/Login
- JWT authentication
- RBAC: admin, user, read-only
- Transaction CRUD
- Read-only user can only view
- Dashboard analytics
- Pie, line, and bar charts
- Redis caching for analytics
- Rate limiting
- Basic security with helmet, xss-clean, parameterized SQL queries
- Swagger endpoint

## Setup

### 1. Database

Create PostgreSQL database:

```bash
createdb finance_tracker
```

Run schema:

```bash
psql -d finance_tracker -f backend/schema.sql
```

### 2. Redis

Run Redis locally:

```bash
redis-server
```

### 3. Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Backend runs on:

```txt
http://localhost:5000
```

Swagger:

```txt
http://localhost:5000/api-docs
```

### 4. Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

## Test Roles

During register, select:
- admin
- user
- read-only

In production, role selection should not be open to normal users. It is kept here only for assignment testing.

## API Routes

Auth:
- POST /api/auth/register
- POST /api/auth/login

Transactions:
- GET /api/transactions
- POST /api/transactions
- PUT /api/transactions/:id
- DELETE /api/transactions/:id

Analytics:
- GET /api/analytics

Users:
- GET /api/users
