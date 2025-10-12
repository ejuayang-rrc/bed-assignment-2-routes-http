import express, { Express } from "express";
import morgan from "morgan";

import employeeRoutes from "./api/v1/routes/employeeRoutes";
import branchRoutes from "./api/v1/routes/branchRoutes";

// Initialize Express application
const app: Express = express();

// Morgan for HTTP request logging
app.use(morgan("combined"));

// Ensures incoming body is correctly parsed to JSON
app.use(express.json());

/**
 * Health check route that returns server status details
 * @returns server health metrics in a json response
 */
app.get("/api/v1/health", (req, res) => {
    res.json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    });
});

// Route Imports
app.use("/api/v1/employees", employeeRoutes);
app.use("/api/v1/branch", branchRoutes);

export default app;
