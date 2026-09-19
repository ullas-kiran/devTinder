const { User } = require("../models/user");
const ApiError = require("../utils/apiError");

const publicProfileFields =
  "firstName lastName age gender photoUrl about skills";

// POST /users
const signup = async (req, res) => {
  const { firstName, lastName, emailId, password, age, gender } = req.body;

  const user = await User.create({
    firstName,
    lastName,
    emailId,
    password,
    age,
    gender,
  });

  return res.status(201).json({
    success: true,
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      emailId: user.emailId,
      age: user.age,
      gender: user.gender,
      photoUrl: user.photoUrl,
      about: user.about,
      skills: user.skills,
    },
  });
};

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

// PATCH /users/:userId
const updateUser = async (req, res) => {
  const { userId } = req.params;

  const user = await User.findByIdAndUpdate(
    userId,
    {
      $set: req.body,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .select(publicProfileFields)
    .lean();

  if (!user) {
    throw ApiError.notFound("User not found");
  }

  return res.status(200).json({
    success: true,
    message: "User updated successfully",
    user,
  });
};

// DELETE /users/:userId
const deleteUser = async (req, res) => {
  const { userId } = req.params;

  const user = await User.findByIdAndDelete(userId);

  if (!user) {
    throw ApiError.notFound("User not found");
  }

  return res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
};

// GET /users
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

module.exports = {
  signup,
  getUser,
  updateUser,
  deleteUser,
  getFeed,
};
