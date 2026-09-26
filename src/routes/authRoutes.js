const express = require("express");

const { signup, login, verifyEmail } = require("../controllers/authController");

const { signupSchema, loginSchema } = require("../validations/authValidation");

const validate = require("../middleware/validate");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

router.post("/signup", validate(signupSchema), asyncHandler(signup));
router.get("/verify-email", asyncHandler(verifyEmail));
router.post("/login", validate(loginSchema), asyncHandler(login));

module.exports = router;
