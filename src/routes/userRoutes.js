const express = require("express");

const {
  getUser,
  getFeed,
  deleteUser,
  updateUser,
} = require("../controllers/userController");
const { signup } = require("../controllers/authController");

const {
  signupSchema,
  updateUserSchema,
  userIdSchema,
  feedQuerySchema,
} = require("../validations/userValidation");
const validate = require("../middleware/validate");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

router.post("/signup", validate(signupSchema), asyncHandler(signup));

router.get(
  "/users/:userId",
  validate(userIdSchema, "params"),
  asyncHandler(getUser),
);

router.patch(
  "/users/:userId",
  validate(userIdSchema, "params"),
  validate(updateUserSchema),
  asyncHandler(updateUser),
);

router.delete(
  "/users/:userId",
  validate(userIdSchema, "params"),
  asyncHandler(deleteUser),
);

router.get("/users", validate(feedQuerySchema, "query"), asyncHandler(getFeed));

module.exports = router;
