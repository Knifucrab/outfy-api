const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const authMiddleware = require("../middleware/authMiddleware");

// Route for creating a post
router.post(
  "/createPost",
  authMiddleware.authenticateToken,
  postController.createPost
);
router.get(
  "/listMyPosts",
  authMiddleware.authenticateToken,
  postController.listMyPosts
);

module.exports = router;
