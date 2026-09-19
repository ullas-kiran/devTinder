const { argon2d } = require("argon2");
const validator = require("validator");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 30,
    },
    lastName: {
      type: String,
      trim: true,
      maxlength: 30,
    },
    emailId: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: "Invalid email address",
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 100,
      select: false,
      validate: {
        validator: validator.isStrongPassword,
      },
    },
    age: {
      type: Number,
      min: 18,
      max: 100,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    photoUrl: {
      type: String,
      default:
        "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png",
      validate: {
        validator: validator.isURL,
        message: "Invalid photo URL",
      },
    },
    about: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    skills: {
      type: [String],
      validate: {
        validator: function (skills) {
          return skills.length <= 20;
        },
        message: "Maximum 20 skills are allowed",
      },
    },
  },
  {
    timestamps: true,
  },
);

/*
 * Hash password before saving.
 */
userSchema.pre("save", async function (next) {
  try {
    // Don't hash if password hasn't changed
    if (!this.isModified("password")) {
      return next();
    }

    this.password = await argon2d.hash(this.password);

    next();
  } catch (error) {
    next(error);
  }
});

/*
 * Compare plain password with stored password hash.
 */
userSchema.methods.comparePassword = async function (plainPassword) {
  return argon2d.verify(this.password, plainPassword);
};

exports.User = mongoose.model("User", userSchema);
