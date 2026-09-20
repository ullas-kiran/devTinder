const { z } = require("zod");

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
};
