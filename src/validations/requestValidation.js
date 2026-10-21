const { z } = require("zod");

const ALLOWED_STATUSES = ["interested", "ignored"];

const sendRequestSchema = z
  .object({
    toUserId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid user ID"),
    status: z.enum(ALLOWED_STATUSES, {
      message: `Invalid status. Allowed: ${ALLOWED_STATUSES.join(", ")}`,
    }),
  })
  .strict();

module.exports = { sendRequestSchema };
