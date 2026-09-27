const { Connection } = require("../models/connection");
const { User } = require("../models/user");
const ApiError = require("../utils/apiError");

const sendConnectionRequest = async (req, res) => {
  const senderId = req.user._id;
  const { receiverId } = req.body;

  // Cannot send request to yourself
  if (senderId.toString() === receiverId) {
    throw ApiError.badRequest(
      "You cannot send a connection request to yourself",
    );
  }

  // Check receiver exists
  const receiver = await User.findById(receiverId);

  if (!receiver) {
    throw ApiError.notFound("User not found");
  }

  // Check existing request
  const existingRequest = await Connection.findOne({
    sender: senderId,
    receiver: receiverId,
  });

  if (existingRequest) {
    throw ApiError.conflict("Connection request already exists");
  }

  const connection = await Connection.create({
    sender: senderId,
    receiver: receiverId,
    status: "pending",
  });

  return res.status(201).json({
    success: true,
    message: "Connection request sent",
    connection,
  });
};

module.exports = {
  sendConnectionRequest,
};
