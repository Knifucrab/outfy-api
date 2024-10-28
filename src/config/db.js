const mongoose = require("mongoose");
require("dotenv").config();

// Correctly URL-encoded password
const mongoURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@outfy-db.zbby1.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=outfy-db`;

// Set Mongoose strictQuery option
mongoose.set("strictQuery", false);

// Connect to MongoDB Atlas
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas:", error);
  });

module.exports = {
  mongoURI,
};
