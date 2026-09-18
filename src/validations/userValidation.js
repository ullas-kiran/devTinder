const { z } = require("zod");

const signupSchema = z
  .object({
    firstName: z.string().trim().min(2).max(30),

    lastName: z.string().trim().max(30).optional(),

    emailId: z.string().trim().toLowerCase().email(),

    password: z.string().min(8).max(100),

    age: z.number().int().min(18).max(100),

    gender: z.enum(["male", "female", "other"]),
  })
  .strict();

const updateUserSchema = z
  .object({
    firstName: z.string().trim().min(2).max(30).optional(),

    lastName: z.string().trim().max(30).optional(),

    age: z.number().int().min(18).max(100).optional(),

    gender: z.enum(["male", "female", "other"]).optional(),

    photoUrl: z.string().trim().url().optional(),

    about: z.string().trim().max(500).optional(),

    skills: z
      .array(z.string().trim().min(1))
      .max(20)
      .optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required to update",
  });

const userIdSchema = z
  .object({
    userId: z
      .string()
      .regex(/^[0-9a-fA-F]{24}$/, "Invalid user ID"),
  })
  .strict();

const feedQuerySchema = z
  .object({
    page: z.coerce.number().int().min(1).default(1),

    limit: z.coerce.number().int().min(1).max(100).default(20),
  })
  .strict();

module.exports = {
  signupSchema,
  updateUserSchema,
  userIdSchema,
  feedQuerySchema,
};