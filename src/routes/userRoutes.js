const express = require("express");

const {
  getUser,
  getFeed,
  deleteUser,
  updateUser,
} = require("../controllers/userController");

const {
  updateUserSchema,
  userIdSchema,
  feedQuerySchema,
} = require("../validations/userValidation");

const validate = require("../middleware/validate");
const asyncHandler = require("../utils/asyncHandler");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

router.use(authenticate);

router.get("/:userId", validate(userIdSchema, "params"), asyncHandler(getUser));

router.patch(
  "/:userId",
  validate(userIdSchema, "params"),
  validate(updateUserSchema),
  asyncHandler(updateUser),
);

router.delete(
  "/:userId",
  validate(userIdSchema, "params"),
  asyncHandler(deleteUser),
);

router.get("/feed", validate(feedQuerySchema, "query"), asyncHandler(getFeed));

module.exports = router;
