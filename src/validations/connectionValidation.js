const { z } = require("zod");

const connectionSchema = z.object({
  toUserId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid user ID"),
  status: z.enum(["interested", "ignored"]),
});

module.exports = { connectionSchema };
