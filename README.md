# Personal Finance Tracker

## 🚀 Live Demo

### 🔗 [Click here to open the Live Personal Finance Tracker](https://loquacious-lokum-d2be12.netlify.app/)

A full-stack Personal Finance Tracker assignment project that allows users to manage income, expenses, and view financial analytics with role-based access control.

---

## Project Overview

This application allows users to:

- Register and login
- Manage income and expense transactions
- Categorize transactions
- Search and filter transactions
- View financial analytics
- Access features based on role
- Use admin controls for user role management

---

## Tech Stack Requirements

- Frontend: React 18+
- Backend: Node.js with Express.js
- Database: PostgreSQL / MySQL
- Caching: Redis
- Charts: Chart.js or Recharts

---

## Features Implemented

### Performance Metrics

Upstash Redis is used to cache frequently accessed analytics data.

Caching behavior:

| Metric | Description |
|---|---|
| Cache provider | Upstash Redis |
| Cached data | Dashboard analytics |
| Cache duration | 15 minutes |
| Cache invalidation | Cache is cleared when transactions are added or deleted |
| Redis activity proof | Upstash metrics show GET, SETEX, DEL, EXISTS commands |

The Upstash Redis dashboard confirms that the backend is using Redis commands such as `GET`, `SETEX`, and `DEL`, showing that analytics data is being cached and invalidated correctly.

### Redis Caching Page

![Redis Dashboard](./frontend/public/screenshots/Redis%20Dashboard.png)

### User Authentication

- User registration and login
- JWT-based authentication
- Protected routes
- Role-Based Access Control

### Role-Based Access Control

The application supports three roles:

| Role | Access |
|---|---|
| admin | Full access to all features, including user and data management |
| user | Can manage only their own transactions and view their own analytics |
| read-only | Can only view their own transactions and analytics, but cannot add, edit, or delete anything |

### Role Management Logic

- Admin can change users between `admin` and `user`
- Admin cannot directly assign `read-only` from the users page
- User can switch own account between `user` and `read-only`
- Read-only user can switch back to `user`
- Read-only users can view data only

### Transaction Management

- Add income and expense transactions
- Delete transactions
- Categorize transactions
- Search and filter transactions
- Read-only users can view transaction list only

### Dashboard with Analytics

- Monthly spending overview
- Category-wise expense breakdown
- Income vs expense trends
- Interactive charts and graphs
- Dashboard accessible to all roles

### Performance Features

- Lazy loading for pages/components
- Virtual scrolling for transaction list
- Redis caching for analytics data
- Rate limiting for API endpoints

### Security

- JWT token-based API calling
- Protected backend routes
- Role-based middleware
- Password hashing
- XSS protection
- SQL injection prevention using parameterized queries

---

## Screenshots

### Login Page

![Login Page](./frontend/public/screenshots/Login%20Page.png)

### Register Page

![Register Page](./frontend/public/screenshots/Register%20Page.png)

### Admin Dashboard

![Admin Dashboard](./frontend/public/screenshots/Admin%20Dashboard.png)

### Admin Users Page

![Admin Users Page](./frontend/public/screenshots/Admin%20Dashboard2.png)

### User Dashboard

![User Dashboard](./frontend/public/screenshots/User%20Dashboard.png)

### Read-only Dashboard

![Read-only Dashboard](./frontend/public/screenshots/read-only%20dashboard.png)

---

## Documentation

Detailed API documentation and local setup instructions are available in a separate file:

[View Documentation](./DOCUMENTATION.md)

To view Swagger/OpenAPI documentation locally:

1. Clone the repository
2. Run the backend server
3. Open this URL in your browser:

```txt
http://localhost:5000/api-docs
