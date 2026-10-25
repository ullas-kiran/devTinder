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
        values: ["interested", "ignored", "accepted", "rejected"],
        message: "{VALUE} is not a valid status",
      },
      required: true,
    },
  },
  { timestamps: true },
);

connectionSchema.pre("validate", function () {
  const connectionReq = this;
  if (
    connectionReq.fromUserId &&
    connectionReq.toUserId &&
    connectionReq.fromUserId.equals(connectionReq.toUserId)
  ) {
    connectionReq.invalidate("toUserId", "You cannot connect with yourself");
  }
});

module.exports = mongoose.model("Connection", connectionSchema);
