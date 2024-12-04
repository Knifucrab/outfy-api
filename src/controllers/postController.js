const Post = require("../models/postModel");
const User = require("../models/userModel");

// Controller function to create a new post
exports.createPost = async (req, res) => {
  try {
    const {title, description, imageUrl, clothes} = req.body;
    const userId = req.user.id; // Assuming you have middleware to extract the user ID from the JWT

    console.log("User ID:", userId); // Debug statement

    // Create a new post
    const post = new Post({
      title,
      description,
      imageUrl,
      clothes,
      userId,
    });

    // Save the post to the database
    await post.save();

    // Update the user's post count
    await User.findByIdAndUpdate(userId, {$inc: {postCount: 1}});

    res.status(201).json({success: true, data: post});
  } catch (error) {
    console.error(error);
    res.status(500).json({success: false, error: "Server Error"});
  }
};

// Controller function to list all posts of the authenticated user
exports.listMyPosts = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you have middleware to extract the user ID from the JWT

    console.log("User ID:", userId); // Debug statement

    // Find all posts by the authenticated user
    const posts = await Post.find({userId});

    res.status(200).json({success: true, data: posts});
  } catch (error) {
    console.error(error);
    res.status(500).json({success: false, error: "Server Error"});
  }
};

// Controller function to list all posts of all users
exports.listAllPosts = async (req, res) => {
  console.log("blabla");
  try {
    // Find all posts
    const posts = await Post.find();

    res.status(200).json({success: true, data: posts});
  } catch (error) {
    console.error(error);
    res.status(500).json({success: false, error: "Server Error"});
  }
};
// Controller function to add a like to a post
exports.addLike = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you have middleware to extract the user ID from the JWT
    const {postId} = req.params;

    console.log("User ID:", userId); // Debug statement

    // Find the post
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({success: false, error: "Post not found"});
    }

    // Check if the user has already liked the post
    if (post.likes.includes(userId)) {
      return res
        .status(400)
        .json({success: false, error: "User has already liked this post"});
    }

    // Add the userId to the likes array
    post.likes.push(userId);

    // Save the post to the database
    await post.save();

    // Update the user's like count
    await User.findByIdAndUpdate(userId, {$inc: {likeCount: 1}});

    // Fetch the updated post data
    const updatedPost = await Post.findById(postId);

    res.status(200).json({success: true, data: updatedPost});
  } catch (error) {
    console.error(error);
    res.status(500).json({success: false, error: "Server Error"});
  }
};

// Controller function to remove a like from a post
exports.removeLike = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you have middleware to extract the user ID from the JWT
    const {postId} = req.params;

    console.log("User ID:", userId); // Debug statement

    // Find the post and remove the userId from the likes array
    const post = await Post.findByIdAndUpdate(
      postId,
      {$pull: {likes: userId}}, // $pull removes the userId from the array
      {new: true}
    );

    if (!post) {
      return res.status(404).json({success: false, error: "Post not found"});
    }

    // Update the user's like count
    await User.findByIdAndUpdate(userId, {$inc: {likeCount: -1}});

    // Fetch the updated post data
    const updatedPost = await Post.findById(postId);

    res.status(200).json({success: true, data: updatedPost});
  } catch (error) {
    console.error(error);
    res.status(500).json({success: false, error: "Server Error"});
  }
};

// Controller function to add a comment to a post
exports.addComment = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you have middleware to extract the user ID from the JWT
    const {postId} = req.params;
    const {text} = req.body;

    console.log("User ID:", userId); // Debug statement

    // Find the post
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({success: false, error: "Post not found"});
    }

    // Add the comment to the comments array
    post.comments.push({userId, text});

    // Save the post to the database
    await post.save();

    // Fetch the updated comments
    const updatedPost = await Post.findById(postId);

    res.status(200).json({success: true, comments: updatedPost.comments});
  } catch (error) {
    console.error(error);
    res.status(500).json({success: false, error: "Server Error"});
  }
};

// Controller function to get a post by ID
exports.getPostById = async (req, res) => {
  try {
    const {postId} = req.params;

    // Find the post by ID
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({success: false, error: "Post not found"});
    }

    res.status(200).json({success: true, data: post});
  } catch (error) {
    console.error(error);
    res.status(500).json({success: false, error: "Server Error"});
  }
};
