require("dotenv").config();
const express = require("express");
const app = express();
const connectDb = require("./config/database");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorHandler");
const startCleanupJob = require("./jobs/cleanupUnverifiedUsers");

app.use(express.json());
app.use("/api", userRoutes);

// Global error middleware
app.use(errorHandler);

connectDb()
  .then(() => {
    console.log("db connected success");
    app.listen(3000, () => console.log("app running port 3000"));
  })
  .catch((err) => {
    console.error(err);
    console.log("something went wrong");
  });

startCleanupJob();
