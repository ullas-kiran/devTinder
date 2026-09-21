const ApiError = require("../utils/apiError");
const { verifyAccessToken } = require("../utils/jwt");

const authenticate = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization?.startsWith("Bearer ")) {
    throw ApiError.unauthorized("Authentication required");
  }

  const token = authorization.split(" ")[1];

  try {
    const payload = verifyAccessToken(token);

    req.user = {
      id: payload.sub,
    };

    next();
  } catch {
    throw ApiError.unauthorized("Invalid or expired access token");
  }
};

module.exports = authenticate;
