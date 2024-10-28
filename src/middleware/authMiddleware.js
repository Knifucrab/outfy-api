// authMiddleware.js

const jwt = require("jsonwebtoken");
const {secret} = require("../config/db");

// Middleware function to verify JWT token
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({message: "No token provided"});
  }

  jwt.verify(token, secret, (err, user) => {
    if (err) {
      return res.status(403).json({message: "Invalid token"});
    }

    req.user = user;
    next();
  });
};

module.exports = {authenticateToken};
