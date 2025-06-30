const mongoose = require("mongoose");
const { Schema } = mongoose;

const userDetails = new Schema({
  googleId: String,
  email: String,
  name: String,
});

module.exports = mongoose.model("users", userDetails);
