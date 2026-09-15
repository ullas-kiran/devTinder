const express = require("express");

const {
  signup,
  getUser,
  getFeed,
  deleteUser,
  updateUser
} = require("../controllers/userController");
const { signupSchema } = require("../validations/userValidation");

const router = express.Router();

router.post("/signup", validate(signupSchema), signup);

router.get("/user", getUser);

router.get("/feed", getFeed);

router.delete("/user", deleteUser);

router.patch("/user", updateUser);

module.exports = router;