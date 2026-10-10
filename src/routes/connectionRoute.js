const express = require("express");
const validate = require("../middleware/validate");
const asyncHandler = require("../utils/asyncHandler");
const { connectionSchema } = require("../validations/connectionValidation");
const {
  sendConnectionRequest,
} = require("../controllers/connectionController");
const authenticate = require("../middleware/authenticate");
const router = express.Router();

router.post(
  "/sendConnectionRequest",
  authenticate,
  validate(connectionSchema),
  asyncHandler(sendConnectionRequest),
);

module.exports = router;
