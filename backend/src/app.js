const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const userRoutes = require("./routes/userRoutes");
const { swaggerUi, swaggerSpec } = require("./swagger/swagger");

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(xss());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => res.send("Personal Finance Tracker API running"));

module.exports = app;
