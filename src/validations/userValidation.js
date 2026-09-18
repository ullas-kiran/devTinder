const { z } = require("zod");

const signupSchema = z.object({
  firstName: z.string().min(2).max(30).trim(),
  lastName: z.string().max(30).trim().optional(),
  emailId: z.string().email().trim().toLowerCase(),
  password: z.string().min(8).max(100),
  age: z.number().min(18).max(100),
  gender: z.enum(["male", "female", "other"]),
});

const updateUserSchema = z
  .object({
    firstName: z.string().min(2).max(30).trim().optional(),
    lastName: z.string().max(30).trim().optional(),
    age: z.number().min(18).max(100).optional(),
    gender: z.enum(["male", "female", "other"]).optional(),
    photoUrl: z.string().url().optional(),
    about: z.string().max(500).trim().optional(),
    skills: z.array(z.string()).max(20).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required to update",
  });

const userIdSchema = z.object({
  userId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid user ID"),
});

module.exports = {
  signupSchema,
  updateUserSchema,
  userIdSchema,
};
