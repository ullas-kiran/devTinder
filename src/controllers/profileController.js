const { User } = require("../models/user");
const ApiError = require("../utils/apiError");

const publicProfileFields =
  "firstName lastName age gender photoUrl about skills";

// GET /users/:userId
const getUser = async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId).select(publicProfileFields).lean();

  if (!user) {
    throw ApiError.notFound("User not found");
  }

  return res.status(200).json({
    success: true,
    user,
  });
};

module.exports = {
  getUser,
};
