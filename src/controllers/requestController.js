const Connection = require("../models/connection");
const { User } = require("../models/user");
const ApiError = require("../utils/apiError");

// POST /requests  { toUserId, status }
const sendRequest = async (req, res) => {
  const fromUserId = req.user.id;
  const { toUserId, status } = req.body;

  // Prevent swiping on yourself
  if (fromUserId.toString() === toUserId.toString()) {
    throw ApiError.badRequest("You cannot swipe on yourself");
  }

  // Check receiver exists
  const receiver = await User.exists({ _id: toUserId });

  if (!receiver) {
    throw ApiError.notFound("User not found");
  }

  // Check if this user already swiped on receiver
  const existingRequest = await Connection.findOne({
    $or: [
      { fromUserId, toUserId },
      { fromUserId: toUserId, toUserId: fromUserId },
    ],
  });

  if (existingRequest) {
    throw ApiError.conflict("You have already swiped on this user");
  }

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

module.exports = { sendRequest };
