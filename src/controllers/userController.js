const mongoose = require("mongoose");
const { User } = require("../models/user");
const ApiError = require("../utils/ApiError");

// Fields safe to return in API responses
const publicUserFields =
  "firstName lastName emailId age gender photoUrl about skills";

// Fields allowed to be updated through the profile endpoint
const editableUserFields = [
  "firstName",
  "lastName",
  "age",
  "gender",
  "photoUrl",
  "about",
  "skills",
];

// Validate MongoDB ObjectId
const assertValidUserId = (userId) => {
  if (!mongoose.isObjectIdOrHexString(userId)) {
    throw ApiError.badRequest("Invalid user ID");
  }
};

// Pick only allowed fields from request body
const pickEditableFields = (body) => {
  const updateData = {};

  for (const field of editableUserFields) {
    if (body[field] !== undefined) {
      updateData[field] = body[field];
    }
  }

  return updateData;
};

// POST /users
const signup = async (req, res, next) => {
  try {
    const { firstName, lastName, emailId, password, age, gender } = req.body;

    const user = await User.create({
      firstName,
      lastName,
      emailId,
      password,
      age,
      gender,
    });

    const publicUser = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      emailId: user.emailId,
      age: user.age,
      gender: user.gender,
      photoUrl: user.photoUrl,
      about: user.about,
      skills: user.skills,
    };

    return res.status(201).json({
      success: true,
      user: publicUser,
    });
  } catch (error) {
    next(error);
  }
};

// GET /users/:userId
const getUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    assertValidUserId(userId);

    const user = await User.findById(userId).select(publicUserFields).lean();

    if (!user) {
      throw ApiError.notFound("User not found");
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /users/:userId
const updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    assertValidUserId(userId);

    const updateData = pickEditableFields(req.body);

    if (Object.keys(updateData).length === 0) {
      throw ApiError.badRequest(
        "At least one valid field is required to update",
      );
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      {
        new: true,
        runValidators: true,
      },
    )
      .select(publicUserFields)
      .lean();

    if (!user) {
      throw ApiError.notFound("User not found");
    }

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /users/:userId
const deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    assertValidUserId(userId);

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      throw ApiError.notFound("User not found");
    }

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// GET /users
const getFeed = async (req, res, next) => {
  try {
    const page = Math.max(Number.parseInt(req.query.page, 10) || 1, 1);

    const limit = Math.min(
      Math.max(Number.parseInt(req.query.limit, 10) || 20, 1),
      100,
    );

    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      User.find({})
        .select(publicUserFields)
        .sort({ createdAt: -1 })
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
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  getUser,
  updateUser,
  deleteUser,
  getFeed,
};
