const express = require("express");

const {
  signup,
  login,
  verifyEmail,
  logout,
  refreshToken,
} = require("../controllers/authController");

const { signupSchema, loginSchema } = require("../validations/authValidation");

const validate = require("../middleware/validate");
const asyncHandler = require("../utils/asyncHandler");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

router.post("/signup", validate(signupSchema), asyncHandler(signup));
router.get("/verify-email", asyncHandler(verifyEmail));
router.post("/login", validate(loginSchema), asyncHandler(login));
router.post("/logout", authenticate, asyncHandler(logout));
router.post("/refresh", asyncHandler(refreshToken));

module.exports = router;
