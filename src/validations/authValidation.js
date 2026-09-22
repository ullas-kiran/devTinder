const { z } = require("zod");

const signupSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(2, "First name must be at least 2 characters")
      .max(30, "First name must be 30 characters or less"),

    lastName: z
      .string()
      .trim()
      .max(30, "Last name must be 30 characters or less")
      .optional(),

    emailId: z
      .email({
        message: "Invalid email address",
      })
      .trim()
      .toLowerCase(),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(100, "Password must be 100 characters or less"),

    age: z
      .number()
      .int()
      .min(18, "Age must be at least 18")
      .max(100, "Age must be 100 or less"),

    gender: z.enum(["male", "female", "other"], {
      message: "Gender must be male, female, or other",
    }),
  })
  .strict();

const loginSchema = z
  .object({
    emailId: z
      .email({
        message: "Invalid email address",
      })
      .trim()
      .toLowerCase(),

    password: z.string().min(1, {
      message: "Password is required",
    }),
  })
  .strict();

module.exports = {
  loginSchema,
  signupSchema,
};
