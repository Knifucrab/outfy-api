const User = require("../models/userModel");

// Controller function to retrieve user data
const getUserData = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({message: "User not found"});
    }
    // Exclude sensitive fields like password from the response
    const {password, ...userData} = user._doc;
    res.status(200).json(userData);
  } catch (error) {
    console.error("Error in getUserData:", error); // Log detailed error on the server
    res.status(500).json({message: "Internal server error"}); // Return generic error message to the client
  }
};

// Controller function to list all users
const listAllUsers = (req, res) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((error) => {
      console.error("Error in listAllUsers:", error); // Log detailed error on the server
      res.status(500).json({message: "Internal server error"}); // Return generic error message to the client
    });
};

//Fetch user data with token
const getCurrentUser = async (req, res) => {
  try {
    console.log("req.user:", req.user); // Debug statement
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({message: "User not found"});
    }
    //Remove sensitive fields like password
    const {password, ...userData} = user._doc;
    res.status(200).json(userData);
  } catch (error) {
    console.error("Error in getCurrentUser:", error); // Log detailed error on the server
    res.status(500).json({message: "Internal server error"}); // Return generic error message to the client
  }
};
module.exports = {
  getUserData,
  listAllUsers,
  getCurrentUser,
};
