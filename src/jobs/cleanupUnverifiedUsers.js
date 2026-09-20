const cron = require("node-cron");

const { deleteUnverifiedUsers } = require("../services/userCleanupService");

const startCleanupJob = () => {
  cron.schedule("0 3 * * *", async () => {
    try {
      await deleteUnverifiedUsers();
    } catch (error) {
      console.error("Failed to cleanup unverified users:", error);
    }
  });

  console.log("Unverified user cleanup job started");
};

module.exports = startCleanupJob;
