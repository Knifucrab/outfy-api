// authMiddleware.js

const jwt = require("jsonwebtoken");
require("dotenv").config(); // Load environment variables from .env file

// Middleware function to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({message: "No token provided"});
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error("Token verification error:", err); // Debug statement
      return res.status(403).json({message: "Invalid token"});
    }

    req.user = {id: user.userId}; // Ensure userId is correctly assigned
    console.log("Authenticated user:", req.user); // Debug statement
    next();
  });
};

module.exports = {authenticateToken};
