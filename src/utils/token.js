const crypto = require("crypto");

const generateRefreshToken = () => {
  const token = crypto.randomBytes(64).toString("hex");

  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

  return {
    token,
    tokenHash,
  };
};

module.exports = {
  generateRefreshToken,
};
