const express = require("express");
const colors = require("colors");
const mongoose = require("mongoose");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const app = express();
const userRoute = require("./routes/user.js");
// Connection URL
const url = process.env.DATABASE_URL;

// Use mongoose to connect to MongoDB
mongoose
  .connect(url)
  .then(() =>
    console.log("[INFO]".green, "MongoDB connection successful 😀 ".yellow)
  )
  .catch((err) => console.error("😬[MongoDB connection error]:".red, err));

// middleware for json
app.use(express.json());

// Middleware for checking JWT
app.use("/users", userRoute);

app.listen(5000, () => {
  console.log("[INFO] ".green, "hello from the Adia api 🙂".yellow);
});
