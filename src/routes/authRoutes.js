const express = require("express");

const { signup, login } = require("../controllers/authController");

const { signupSchema, loginSchema } = require("../validations/authValidation");

const validate = require("../middleware/validate");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

router.post("/signup", validate(signupSchema), asyncHandler(signup));

router.post("/login", validate(loginSchema), asyncHandler(login));

module.exports = router;
