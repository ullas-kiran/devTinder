const express = require("express");

const {
  getMyProfile,
  updateMyProfile,
  deleteMyProfile,
  getFeed,
  getProfileById,
} = require("../controllers/profileController");

const {
  updateProfileSchema,
  userIdParamSchema,
  feedQuerySchema,
} = require("../validations/profileValidation");

const validate = require("../middleware/validate");
const asyncHandler = require("../utils/asyncHandler");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

router.use(authenticate);

// Static paths must be declared before "/:userId"
router.get("/me", asyncHandler(getMyProfile));
router.patch("/me", validate(updateProfileSchema), asyncHandler(updateMyProfile));
router.delete("/me", asyncHandler(deleteMyProfile));
router.get("/feed", validate(feedQuerySchema, "query"), asyncHandler(getFeed));
router.get(
  "/:userId",
  validate(userIdParamSchema, "params"),
  asyncHandler(getProfileById),
);

module.exports = router;
