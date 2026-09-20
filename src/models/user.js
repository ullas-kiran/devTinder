const argon2 = require("argon2");
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
    emailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationTokenHash: {
      type: String,
      select: false,
    },
    emailVerificationExpiresAt: {
      type: Date,
      select: false,
    },
    password: {
      type: String,
      required: true,
      select: false,
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
userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await argon2.hash(this.password);
  }
});

/*
 * Compare plain password with stored password hash.
 */
userSchema.methods.comparePassword = async function (plainPassword) {
  return argon2.verify(this.password, plainPassword);
};

exports.User = mongoose.model("User", userSchema);
