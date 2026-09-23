require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const connectDb = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorHandler");
const startCleanupJob = require("./jobs/cleanupUnverifiedUsers");

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Global error middleware
app.use(errorHandler);

connectDb()
  .then(() => {
    console.warn("db connected success");
    app.listen(3000, () => console.warn("app running on port 3000"));
    startCleanupJob();
  })
  .catch((err) => {
    console.error(err);
    console.error("something went wrong");
  });
