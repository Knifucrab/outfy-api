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

// Route for adding a like to a post
router.post(
  "/:postId/like",
  authMiddleware.authenticateToken,
  postController.addLike
);

// Route for removing a like from a post
router.post(
  "/:postId/unlike",
  authMiddleware.authenticateToken,
  postController.removeLike
);

router.post(
  "/:postId/comment",
  authMiddleware.authenticateToken,
  postController.addComment
);

module.exports = router;
