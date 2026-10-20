const { User } = require("../models/user");
const ApiError = require("../utils/apiError");

const publicProfileFields =
  "firstName lastName age gender photoUrl about skills";

// GET /profile/me
const getMyProfile = async (req, res) => {
  const user = await User.findById(req.user.id)
    .select(publicProfileFields)
    .lean();

  if (!user) {
    throw ApiError.notFound("User not found");
  }

  return res.status(200).json({ success: true, user });
};

// PATCH /profile/me
const updateMyProfile = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { $set: req.body },
    { new: true, runValidators: true },
  )
    .select(publicProfileFields)
    .lean();

  if (!user) {
    throw ApiError.notFound("User not found");
  }

  return res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user,
  });
};

// DELETE /profile/me
const deleteMyProfile = async (req, res) => {
  const user = await User.findByIdAndDelete(req.user.id);

  if (!user) {
    throw ApiError.notFound("User not found");
  }

  return res.status(200).json({
    success: true,
    message: "Profile deleted successfully",
  });
};

// GET /profile/feed
const getFeed = async (req, res) => {
  const { page, limit } = req.query;

  const skip = (page - 1) * limit;

  const [users, total] = await Promise.all([
    User.find({})
      .select(publicProfileFields)
      .sort({ createdAt: -1, _id: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),

    User.countDocuments({}),
  ]);

  return res.status(200).json({
    success: true,
    data: users,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
};

// GET /profile/:userId
const getProfileById = async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId).select(publicProfileFields).lean();

  if (!user) {
    throw ApiError.notFound("User not found");
  }

  return res.status(200).json({ success: true, user });
};

module.exports = {
  getMyProfile,
  updateMyProfile,
  deleteMyProfile,
  getFeed,
  getProfileById,
};
