const express = require("express");

const {
  signup,
  getUser,
  getFeed,
  deleteUser,
  updateUser,
} = require("../controllers/userController");
const {
  signupSchema,
  updateUserSchema,
  userIdSchema,
  feedQuerySchema,
} = require("../validations/userValidation");
const validate = require("../middleware/validate");

const router = express.Router();

router.post("/signup", validate(signupSchema), signup);

router.get("/users/:userId", validate(userIdSchema, "params"), getUser);

router.patch(
  "/users/:userId",
  validate(userIdSchema, "params"),
  validate(updateUserSchema),
  updateUser,
);

router.delete("/users/:userId", validate(userIdSchema, "params"), deleteUser);

router.get("/users", validate(feedQuerySchema, "query"), getFeed);

module.exports = router;
