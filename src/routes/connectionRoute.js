const express = require("express");
const validate = require("../middleware/validate");
const asyncHandler = require("../utils/asyncHandler");
const {
  sendConnectionRequestSchema,
} = require("../validations/connectionValidation");
const {
  sendConnectionRequest,
} = require("../controllers/connectionController");
const router = express.Router();

router.post(
  "/sendConnectionRequest",
  validate(sendConnectionRequestSchema),
  asyncHandler(sendConnectionRequest),
);

module.exports = router;
