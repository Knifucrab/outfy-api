const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dbConfig = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes");

// Set Mongoose strictQuery option
mongoose.set("strictQuery", true);

// Connect to MongoDB Atlas
mongoose
  .connect(dbConfig.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB Atlas", error);
  });

// Middleware
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/posts", postRoutes);
app.use("/users", userRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
