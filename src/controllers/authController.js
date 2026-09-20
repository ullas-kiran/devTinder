const { User } = require("../models/user");
const ApiError = require("../utils/apiError");
const { generateVerificationToken } = require("../utils/token");
const { EMAIL_VERIFICATION_EXPIRY_MS } = require("../constants/auth");
const { sendVerificationEmail } = require("../services/emailService");

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

  return res.status(200).json({
    success: true,
    message: "Login successful",
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

module.exports = {
  signup,
  login,
};
