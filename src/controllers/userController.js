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
    res.status(500).json({message: "Internal server error"});
  }
};

// Controller function to list all users
const listAllUsers = (req, res) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((error) => {
      res.status(500).json({message: "Error retrieving users", error});
    });
};

module.exports = {
  getUserData,
  listAllUsers,
};
