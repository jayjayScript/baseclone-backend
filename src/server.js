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
  origin: ['https://basesupport.services', 'http://localhost:3000']
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: "Too many requests, please try again later" }
});

app.get('/', (req, res) => {
  res.json({ message: 'API is running ✅' });
});

app.use("/api/auth", limiter, authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/finder", finderRoutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected ✅'))
  .catch((error) => console.log(error));

if (process.env.NODE_ENV !== 'production') {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`);
  });
}

module.exports = app;