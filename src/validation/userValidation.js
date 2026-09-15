const { z } = require("zod");

const signupSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  emailId: z.string().email(),
  password: z.string().min(8),
  age: z.number().int().min(18),
  gender: z.enum(["male", "female", "other"])
});

const updateUserSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  age: z.number().int().min(18).optional(),
  photoUrl: z.string().url().optional(),
  about: z.string().max(200).optional(),
  skills: z.array(z.string()).optional()
});

module.exports = {
  signupSchema,
  updateUserSchema
};