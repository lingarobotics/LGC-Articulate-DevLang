// server/middleware/authMiddleware.js

const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports = function (req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    // 🔥 CHECK HEADER
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        error: "Authorization token missing"
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        error: "Token malformed"
      });
    }

    // 🔥 VERIFY USING CONFIG
    const decoded = jwt.verify(token, config.jwtSecret);

    req.user = decoded; // { id: ... }

    next();

  } catch (err) {
    // 🔥 BETTER ERROR HANDLING
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        error: "Token expired"
      });
    }

    return res.status(401).json({
      error: "Invalid token"
    });
  }
};