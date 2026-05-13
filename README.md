# Personal Finance Tracker

A full-stack Personal Finance Tracker assignment project built with React, Node.js, Express, PostgreSQL, Redis, JWT authentication, RBAC, Recharts, rate limiting, and Swagger documentation.

The application allows users to manage income and expenses, view analytics, and use role-based access control for admin, user, and read-only accounts.

---

## Project Overview

This project is a Personal Finance Tracker application where users can:

- Register and login securely
- Manage income and expense transactions
- Categorize transactions
- Search transactions
- View dashboard analytics
- Access features based on user role
- Use admin controls for user role management

---

## Tech Stack

### Frontend

- React 18+
- React Router DOM
- React Context API
- React Hooks
- Recharts
- React Window
- Axios
- CSS

### Backend

- Node.js
- Express.js
- PostgreSQL
- Redis
- JWT
- bcryptjs
- express-rate-limit
- Helmet
- xss-clean
- Swagger

---

## Features

### Authentication

- User registration
- User login
- JWT-based authentication
- Protected routes
- Password hashing using bcrypt
- Token-based API calling mechanism

### Role-Based Access Control

The application supports three roles:

| Role | Access |
|---|---|
| admin | Full access, can manage users and data |
| user | Can manage own transactions and view own analytics |
| read-only | Can only view own transactions and analytics |

### Role Management Logic

- Admin can change users between `admin` and `user`
- Admin page does not provide `read-only` as a role-changing option
- Normal users can switch their own account between `user` and `read-only`
- Read-only users cannot add, edit, or delete transactions
- Read-only users can still view dashboard and transaction data

### Transaction Management

- Add income and expense transactions
- Delete transactions
- Categorize transactions
- Search transactions by category or description
- Role-based transaction access
- Read-only users can view transactions only

### Dashboard Analytics

- Total income
- Total expense
- Net balance
- Category-wise expense breakdown
- Monthly income and expense trends
- Income vs expense chart
- Interactive charts using Recharts

### Admin User Management

- Admin-only users page
- View all registered users
- Promote user to admin
- Demote admin to user
- View user role status

### Performance Features

- Route-based lazy loading using `React.lazy()`
- Loading states using `React.Suspense`
- Virtual scrolling for large transaction lists using `react-window`
- Redis caching for analytics
- Cache invalidation after transaction updates
- Rate limiting for API endpoints

### Security Features

- JWT authentication
- Protected backend routes
- RBAC middleware
- Password hashing
- Helmet for secure headers
- xss-clean for XSS protection
- Parameterized SQL queries to prevent SQL injection
- Rate limiting for API abuse protection

---

## Screenshots

### Login Page

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

## Folder Structure

```txt
personal-finance-tracker/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── schema.sql
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   └── screenshots/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── style.css
│   └── package.json
│
├── .gitignore
└── README.md