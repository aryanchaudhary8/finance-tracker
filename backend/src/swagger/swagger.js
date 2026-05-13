const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Personal Finance Tracker API",
      version: "1.0.0",
      description: "API documentation for Personal Finance Tracker project",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
    tags: [
      {
        name: "Auth",
        description: "Authentication APIs",
      },
      {
        name: "Transactions",
        description: "Transaction management APIs",
      },
      {
        name: "Analytics",
        description: "Dashboard analytics APIs",
      },
      {
        name: "Users",
        description: "User and role management APIs",
      },
    ],
    paths: {
      "/api/auth/register": {
        post: {
          tags: ["Auth"],
          summary: "Register a new user",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["name", "email", "password"],
                  properties: {
                    name: {
                      type: "string",
                      example: "Aryan",
                    },
                    email: {
                      type: "string",
                      example: "aryan@gmail.com",
                    },
                    password: {
                      type: "string",
                      example: "password123",
                    },
                  },
                },
              },
            },
          },
          responses: {
            201: {
              description: "User registered successfully",
            },
            400: {
              description: "Invalid input or user already exists",
            },
          },
        },
      },

      "/api/auth/login": {
        post: {
          tags: ["Auth"],
          summary: "Login user",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["email", "password"],
                  properties: {
                    email: {
                      type: "string",
                      example: "aryan@gmail.com",
                    },
                    password: {
                      type: "string",
                      example: "password123",
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Login successful",
            },
            401: {
              description: "Invalid credentials",
            },
          },
        },
      },

      "/api/transactions": {
        get: {
          tags: ["Transactions"],
          summary: "Get transactions of logged-in user",
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            200: {
              description: "Transactions fetched successfully",
            },
            401: {
              description: "Unauthorized",
            },
          },
        },
        post: {
          tags: ["Transactions"],
          summary: "Create a new transaction",
          description: "Allowed for admin and user roles only",
          security: [
            {
              bearerAuth: [],
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["type", "amount", "category", "date"],
                  properties: {
                    type: {
                      type: "string",
                      example: "expense",
                    },
                    amount: {
                      type: "number",
                      example: 500,
                    },
                    category: {
                      type: "string",
                      example: "Food",
                    },
                    description: {
                      type: "string",
                      example: "Lunch",
                    },
                    date: {
                      type: "string",
                      example: "2026-05-13",
                    },
                  },
                },
              },
            },
          },
          responses: {
            201: {
              description: "Transaction created successfully",
            },
            403: {
              description: "Read-only users cannot create transactions",
            },
          },
        },
      },

      "/api/transactions/{id}": {
        put: {
          tags: ["Transactions"],
          summary: "Update transaction by ID",
          description: "Allowed for admin and user roles only",
          security: [
            {
              bearerAuth: [],
            },
          ],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: {
                type: "integer",
              },
              example: 1,
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    type: {
                      type: "string",
                      example: "income",
                    },
                    amount: {
                      type: "number",
                      example: 10000,
                    },
                    category: {
                      type: "string",
                      example: "Job",
                    },
                    description: {
                      type: "string",
                      example: "Salary",
                    },
                    date: {
                      type: "string",
                      example: "2026-05-13",
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Transaction updated successfully",
            },
            403: {
              description: "Read-only users cannot update transactions",
            },
            404: {
              description: "Transaction not found",
            },
          },
        },
        delete: {
          tags: ["Transactions"],
          summary: "Delete transaction by ID",
          description: "Allowed for admin and user roles only",
          security: [
            {
              bearerAuth: [],
            },
          ],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: {
                type: "integer",
              },
              example: 1,
            },
          ],
          responses: {
            200: {
              description: "Transaction deleted successfully",
            },
            403: {
              description: "Read-only users cannot delete transactions",
            },
            404: {
              description: "Transaction not found",
            },
          },
        },
      },

      "/api/analytics": {
        get: {
          tags: ["Analytics"],
          summary: "Get dashboard analytics",
          description: "Accessible to admin, user, and read-only roles",
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            200: {
              description: "Analytics fetched successfully",
            },
            401: {
              description: "Unauthorized",
            },
          },
        },
      },

      "/api/users": {
        get: {
          tags: ["Users"],
          summary: "Get all users",
          description: "Admin only route",
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            200: {
              description: "Users fetched successfully",
            },
            403: {
              description: "Only admin can access this route",
            },
          },
        },
      },

      "/api/users/{id}/role": {
        put: {
          tags: ["Users"],
          summary: "Update user role by admin",
          description: "Admin can change user role between admin and user",
          security: [
            {
              bearerAuth: [],
            },
          ],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: {
                type: "integer",
              },
              example: 2,
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["role"],
                  properties: {
                    role: {
                      type: "string",
                      example: "admin",
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "User role updated successfully",
            },
            403: {
              description: "Only admin can update user roles",
            },
          },
        },
      },

      "/api/users/me/role": {
        put: {
          tags: ["Users"],
          summary: "Update own role",
          description: "User can switch between user and read-only",
          security: [
            {
              bearerAuth: [],
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["role"],
                  properties: {
                    role: {
                      type: "string",
                      example: "read-only",
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Own role updated successfully",
            },
            400: {
              description: "Invalid role update",
            },
          },
        },
      },
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: [],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerUi, swaggerSpec };