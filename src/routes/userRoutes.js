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
} = require("../validations/userValidation");
const validate = require("../middleware/validate");

const router = express.Router();

router.post("/users", validate(signupSchema), signup);

router.get("/users/:userId", validate(userIdSchema, "params"), getUser);

router.patch(
  "/users/:userId",
  validate(userIdSchema, "params"),
  validate(updateUserSchema),
  updateUser,
);

router.delete("/users/:userId", validate(userIdSchema, "params"), deleteUser);

router.get("/users", getFeed);

module.exports = router;
