const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require("dotenv").config();

// Login controller
exports.login = async (req, res) => {
  const {email, password} = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({email});
    if (!user) {
      return res.status(404).json({message: "User not found"});
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({message: "Invalid password"});
    }

    // Generate JWT token
    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({token});
  } catch (error) {
    res.status(500).json({message: "Internal server error"});
  }
};

// Register controller
exports.register = async (req, res) => {
  const {username, email, password, birthDate} = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({email});
    if (existingUser) {
      return res.status(409).json({message: "User already exists"});
    }

    // Check if the username is already taken
    const existingUsername = await User.findOne({username});
    if (existingUsername) {
      return res.status(409).json({message: "Username already taken"});
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      birthDate,
      registrationDate: new Date(),
      postCount: 0,
      likeCount: 0,
    });

    await newUser.save();

    res.status(201).json({message: "User created successfully"});
  } catch (error) {
    res.status(500).json({message: "Internal server error"});
  }
};
