# Documentation

This document contains the API documentation details and local development setup instructions for the Personal Finance Tracker project.

---

## Project Repository

```bash
git clone https://github.com/aryanchaudhary8/finance-tracker.git
cd finance-tracker
```

---

## API Documentation

This project uses Swagger/OpenAPI for backend API documentation.

After starting the backend server, open this URL in your browser:

```txt
http://localhost:5000/api-docs
```

Swagger/OpenAPI documentation includes:

- Authentication APIs
- Transaction APIs
- Analytics APIs
- User management APIs
- Request body examples
- Response formats
- Protected route behavior
- Role-based route access

---

## Local Development Setup

### Prerequisites

Make sure these are installed on your system:

- Node.js
- npm
- PostgreSQL or MySQL
- Redis
- Git

---

## Backend Setup

### 1. Go to Backend Folder

```bash
cd backend
```

### 2. Install Backend Dependencies

```bash
npm install
```

### 3. Create Environment File

Create a `.env` file inside the `backend` folder.

Example:

```env
PORT=5000
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/finance_tracker
JWT_SECRET=your_jwt_secret_key
REDIS_URL=redis://localhost:6379
```

> Replace `your_password` with your actual PostgreSQL password.

---

## Database Setup

### 1. Create Database

For PostgreSQL:

```bash
createdb finance_tracker
```

### 2. Run Schema File

From the project root:

```bash
psql -d finance_tracker -f backend/schema.sql
```

This will create the required tables such as:

- users
- transactions

The `users` table contains a `role` field with default value:

```txt
user
```

Supported roles:

- admin
- user
- read-only

---

## Redis Setup

Redis is used for caching frequently accessed analytics data.

### Option 1: Run Redis Locally

```bash
redis-server
```

### Option 2: Run Redis Using Docker

```bash
docker run --name redis-server -p 6379:6379 -d redis
```

Check Redis connection:

```bash
docker exec -it redis-server redis-cli ping
```

Expected output:

```txt
PONG
```

---

## Run Backend Server

Inside the `backend` folder:

```bash
npm run dev
```

Backend runs on:

```txt
http://localhost:5000
```

Swagger/OpenAPI documentation runs on:

```txt
http://localhost:5000/api-docs
```

---

## Frontend Setup

Open a new terminal from the project root.

### 1. Go to Frontend Folder

```bash
cd frontend
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Create Frontend Environment File

Create a `.env` file inside the `frontend` folder.

Example:

```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Run Frontend Server

```bash
npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

---

## API Routes

### Authentication Routes

| Method | Route | Access |
|---|---|---|
| POST | `/api/auth/register` | Public |
| POST | `/api/auth/login` | Public |

---

### Transaction Routes

| Method | Route | Access |
|---|---|---|
| GET | `/api/transactions` | admin, user, read-only |
| POST | `/api/transactions` | admin, user |
| PUT | `/api/transactions/:id` | admin, user |
| DELETE | `/api/transactions/:id` | admin, user |

---

### Analytics Routes

| Method | Route | Access |
|---|---|---|
| GET | `/api/analytics` | admin, user, read-only |

---

### User Management Routes

| Method | Route | Access |
|---|---|---|
| GET | `/api/users` | admin only |
| PUT | `/api/users/:id/role` | admin only |
| PUT | `/api/users/me/role` | user, read-only |

---

## Role-Based Access Control

The application supports three roles:

| Role | Permission |
|---|---|
| admin | Full access to all features, including user and data management |
| user | Can manage only their own transactions and view own analytics |
| read-only | Can only view own transactions and analytics |

---

## RBAC Behavior

### Admin

Admin can:

- View dashboard
- Add transactions
- Delete transactions
- View analytics
- View users page
- Promote user to admin
- Demote admin to user

Admin role management rule:

- Admin can change users between `admin` and `user`
- Admin cannot assign `read-only` from the users page

---

### User

User can:

- View dashboard
- Add transactions
- Delete transactions
- Search transactions
- View analytics
- Switch own role to `read-only` from navbar

---

### Read-only

Read-only user can:

- View dashboard
- View transactions
- View analytics
- Switch own role back to `user` from navbar

Read-only user cannot:

- Add transactions
- Edit transactions
- Delete transactions

---

## Caching

Redis is used for caching analytics data.

Caching behavior:

| Data | Cache Duration |
|---|---|
| Analytics data | 15 minutes |
| Category data | 1 hour |

Cache is invalidated after:

- Creating a transaction
- Updating a transaction
- Deleting a transaction

---

## Rate Limiting

Different rate limits are applied to different API groups.

| Endpoint Type | Limit |
|---|---|
| Auth endpoints | 5 requests per 15 minutes |
| Transaction endpoints | 100 requests per hour |
| Analytics endpoints | 50 requests per hour |

---

## Security

Security features implemented:

- JWT authentication
- Protected backend routes
- Role-based middleware
- Password hashing using bcrypt
- XSS protection
- SQL injection prevention using parameterized queries
- Rate limiting for API abuse protection
- Token-based API calling mechanism

---

## React Implementation Details

### useContext

Used for:

- Authentication state
- Logged-in user data
- Theme/global app state

### useCallback

Used for:

- Transaction submit handler
- Fetch transaction function
- Preventing unnecessary function recreation

### useMemo

Used for:

- Total income calculation
- Total expense calculation
- Balance calculation
- Filtered transaction data

### React.lazy and Suspense

Used for route-based code splitting:

- Dashboard page
- Transactions page
- Users page

---

## Charts

The dashboard includes interactive charts for financial analytics:

- Pie chart for category-wise expense distribution
- Line chart for monthly income and expense trends
- Bar chart for income vs expense comparison

---

## Assignment Requirements Covered

- React 18+ frontend
- Node.js with Express.js backend
- PostgreSQL / MySQL database support
- Redis caching
- JWT authentication
- Protected routes
- Role-Based Access Control
- Admin, user, and read-only roles
- Transaction CRUD
- Search and filter transactions
- Dashboard analytics
- Pie chart
- Line chart
- Bar chart
- Lazy loading
- Virtual scrolling
- Rate limiting
- XSS protection
- SQL injection prevention
- Swagger/OpenAPI documentation
- Local development setup instructions
- Organized GitHub repository with frontend and backend folders

---

## Author

Aryan Chaudhary

GitHub: `aryanchaudhary8`