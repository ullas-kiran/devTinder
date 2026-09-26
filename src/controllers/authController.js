const { User } = require("../models/user");
const ApiError = require("../utils/apiError");
const { generateVerificationToken, hashToken } = require("../utils/token");
const { EMAIL_VERIFICATION_EXPIRY_MS } = require("../constants/auth");
const { sendVerificationEmail } = require("../services/emailService");
const { generateAccessToken } = require("../utils/jwt");

const { generateRefreshToken } = require("../utils/token");

const RefreshToken = require("../models/refreshToken");

const signup = async (req, res) => {
  const { firstName, lastName, emailId, password, age, gender } = req.body;

  const { token, tokenHash } = generateVerificationToken();

  const user = await User.create({
    firstName,
    lastName,
    emailId,
    password,
    age,
    gender,
    emailVerificationTokenHash: tokenHash,
    emailVerificationExpiresAt: new Date(
      Date.now() + EMAIL_VERIFICATION_EXPIRY_MS,
    ),
  });

  await sendVerificationEmail(emailId, token);

  return res.status(201).json({
    success: true,
    message: "Account created. Please verify your email.",
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

const login = async (req, res) => {
  const { emailId, password } = req.body;

  const user = await User.findOne({ emailId }).select("+password");

  if (!user) {
    throw ApiError.unauthorized("Invalid email or password");
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    throw ApiError.unauthorized("Invalid email or password");
  }

  if (!user.emailVerified) {
    throw ApiError.forbidden("Please verify your email before logging in");
  }

  // Authentication token/session comes here
  const accessToken = generateAccessToken(user._id);
  const { token: refreshToken, tokenHash } = generateRefreshToken();

  await RefreshToken.create({
    userId: user._id,
    tokenHash,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    success: true,
    message: "Login successful",
    accessToken,
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

const verifyEmail = async (req, res) => {
  const { token } = req.query;

  if (!token) {
    throw ApiError.badRequest("Verification token is required");
  }

  const tokenHash = hashToken(token);

  const user = await User.findOne({
    emailVerificationTokenHash: tokenHash,
    emailVerificationExpiresAt: { $gt: new Date() },
  });

  if (!user) {
    throw ApiError.badRequest("Invalid or expired verification token");
  }

  user.emailVerified = true;
  user.emailVerificationTokenHash = undefined;
  user.emailVerificationExpiresAt = undefined;

  await user.save();

  return res.status(200).json({
    success: true,
    message: "Email verified successfully",
  });
};

module.exports = {
  signup,
  login,
  verifyEmail,
};
