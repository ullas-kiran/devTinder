const mongoose = require("mongoose");
const Connection = require("../models/connection");
const { User } = require("../models/user");
const ApiError = require("../utils/apiError");

const sendConnectionRequest = async (req, res) => {
  const fromUserId = req.user.id;
  const { toUserId, status } = req.body;

  // Validate swipe status
  if (!["interested", "ignored"].includes(status)) {
    throw ApiError.badRequest("Invalid swipe status");
  }

  // Validate user ID
  if (!mongoose.isValidObjectId(toUserId)) {
    throw ApiError.badRequest("Invalid user ID");
  }

  // Prevent swiping on yourself
  if (fromUserId.toString() === toUserId.toString()) {
    throw ApiError.badRequest("You cannot swipe on yourself");
  }

  // Check receiver exists
  const receiver = await User.findById(toUserId);

  if (!receiver) {
    throw ApiError.notFound("User not found");
  }

  // Check if this user already swiped on receiver
  const existingRequest = await Connection.findOne({
    fromUserId,
    toUserId,
  });

  if (existingRequest) {
    throw ApiError.conflict("You have already swiped on this user");
  }

  // Create swipe
  const connection = await Connection.create({
    fromUserId,
    toUserId,
    status,
  });

  return res.status(201).json({
    success: true,
    message:
      status === "interested"
        ? "Interest sent successfully"
        : "Profile ignored successfully",
    connection,
  });
};

module.exports = {
  sendConnectionRequest,
};
