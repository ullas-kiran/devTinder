const { User } = require("../models/user");
const ApiError = require("../utils/ApiError");

const signup = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      emailId,
      password,
      age,
      gender
    } = req.body;

    const user = await User.create({
      firstName,
      lastName,
      emailId,
      password,
      age,
      gender
    });

    return res.status(201).json({
      success: true,
      user
    });

  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const { emailId } = req.query;

    const user = await User.findOne({ emailId });

    if (!user) {
      throw ApiError.notFound("User not found");
    }

    return res.status(200).json({
      success: true,
      user
    });

  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { userId } = req.query;
    const updateData = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      updateData,
      {
        new: true,
        runValidators: true
      }
    );

    if (!user) {
      throw ApiError.notFound("User not found");
    }

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user
    });

  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.query;

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      throw ApiError.notFound("User not found");
    }

    return res.status(200).json({
      success: true,
      message: "User deleted successfully"
    });

  } catch (error) {
    next(error);
  }
};

const getFeed = async (req, res, next) => {
  try {
    const users = await User.find({});

    return res.status(200).json({
      success: true,
      users
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
  getFeed
};