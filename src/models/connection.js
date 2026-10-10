const mongoose = require("mongoose");

const connectionSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["interested", "ignored", "accepted"],
        message: "{VALUE} is not a valid status",
      },
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Connection", connectionSchema);
