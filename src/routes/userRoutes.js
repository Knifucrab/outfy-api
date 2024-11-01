const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

//Route to fetch user data with token
router.get(
  "/me",
  authMiddleware.authenticateToken,
  userController.getCurrentUser
);

// Route to get user data
router.get(
  "/:id",
  authMiddleware.authenticateToken,
  userController.getUserData
);

// Route to list all users
router.get("/", authMiddleware.authenticateToken, userController.listAllUsers);

module.exports = router;
