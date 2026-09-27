const { z } = require("zod");

const sendConnectionRequestSchema = z.object({
  receiverId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid receiver ID"),
});

module.exports = {
  sendConnectionRequestSchema,
};
