const express = require("express");
const { userIdSchema } = require("../validations/userValidation");
const validate = require("../middleware/validate");
const asyncHandler = require("../utils/asyncHandler");
const { getUser } = require("../controllers/userController");
const router = express.Router();

router.get("/:userId", validate(userIdSchema, "params"), asyncHandler(getUser));

module.exports = router;
