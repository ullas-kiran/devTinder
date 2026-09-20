const { UNVERIFIED_ACCOUNT_RETENTION_MS } = require("../constants/auth");
const { User } = require("../models/user");

const deleteUnverifiedUsers = async () => {
  const cutoffDate = new Date(Date.now() - UNVERIFIED_ACCOUNT_RETENTION_MS);

  const result = await User.deleteMany({
    emailVerified: false,
    createdAt: {
      $lt: cutoffDate,
    },
  });

  console.log(`Deleted ${result.deletedCount} unverified users`);

  return result.deletedCount;
};

module.exports = {
  deleteUnverifiedUsers,
};
