const express = require("express");

const { sendRequest } = require("../controllers/requestController");
const { sendRequestSchema } = require("../validations/requestValidation");

const validate = require("../middleware/validate");
const asyncHandler = require("../utils/asyncHandler");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

router.use(authenticate);

router.post("/", validate(sendRequestSchema), asyncHandler(sendRequest));

module.exports = router;
