import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import summaryRoutes from "./routes/summaryRoutes.js";

dotenv.config();

const app = express();

// Enhanced CORS configuration
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001", "http://localhost:3002"],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Log all incoming requests
app.use((req, res, next) => {
  console.log(`📍 ${req.method} ${req.path}`);
  next();
});

// Routes
app.use("/api", summaryRoutes);

// Test route to verify server is working
app.get("/health", (req, res) => {
  res.json({ 
    status: "OK", 
    message: "Server is running successfully 🚀",
    timestamp: new Date().toISOString()
  });
});

// Default route
app.get("/", (req, res) => {
  res.json({ 
    message: "Meeting Summarizer API Server", 
    version: "1.0.0",
    endpoints: {
      health: "/health",
      summarize: "/api/summarize (POST)",
      summaries: "/api/summaries (GET)"
    }
  });
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
    console.log("📊 Database:", mongoose.connection.db.databaseName);
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// Error handling for unhandled routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error("🔥 Global error handler:", error);
  res.status(500).json({ 
    error: "Internal server error",
    message: error.message 
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/health`);
  console.log(`📚 API docs: http://localhost:${PORT}/`);
  console.log(`🔗 Frontend should connect to: http://localhost:${PORT}/api/summarize`);
});