import express, { Express } from "express";
import morgan from "morgan";

// Initialize Express application
const app: Express = express();

// Morgan for HTTP request logging
app.use(morgan("combined"));

// Health check route
app.get("/api/v1/health", (req, res) => {
    res.json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    });
});

export default app;
