const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRouter");
const finderRoutes = require("./routes/finderRoutes");
const rateLimit = require('express-rate-limit');

dotenv.config();
const app = express();

app.use(express.json());

app.use(cors({
  origin: ['https://baseservices.vercel.app', 'http://localhost:3000']
}));

// MongoDB Connection Middleware for Serverless Environment
let isConnected = false;
const connectDB = async (req, res, next) => {
  if (isConnected && mongoose.connection.readyState >= 1) {
    return next();
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    next();
  } catch (error) {
    console.error("MongoDB connection failure:", error.message);
    return res.status(500).json({
      success: false,
      message: "Database connection failure",
      error: error.message
    });
  }
};

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: "Too many requests, please try again later" }
});

app.get('/', (req, res) => {
  res.json({ message: 'API is running ✅' });
});

// Enforce DB connection on API routes
app.use("/api", connectDB);

app.use("/api/auth", limiter, authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/finder", finderRoutes);

if (process.env.NODE_ENV !== 'production') {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`);
  });
}

module.exports = app;