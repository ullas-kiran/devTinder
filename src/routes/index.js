const express = require("express");

const authRoutes = require("./authRoutes");
const profileRoutes = require("./profileRoutes");
const requestRoutes = require("./requestRoutes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/profile", profileRoutes);
router.use("/requests", requestRoutes);

module.exports = router;
