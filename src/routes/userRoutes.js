const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

// Route to get user data
router.get(
  "/:id",
  // authMiddleware.authenticateToken,
  userController.getUserData
);

// Route to list all users
router.get(
  "/",
  // authMiddleware.authenticateToken,
  userController.listAllUsers
);

module.exports = router;
