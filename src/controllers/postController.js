const Post = require("../models/postModel");

// Controller function to create a new post
exports.createPost = async (req, res) => {
  try {
    const {title, description, imageUrl, clothes} = req.body;
    const userId = req.user.id; // Assuming you have middleware to extract the user ID from the JWT

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

    res.status(201).json({success: true, data: post});
  } catch (error) {
    console.error(error);
    res.status(500).json({success: false, error: "Server Error"});
  }
};
