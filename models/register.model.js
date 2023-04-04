const mongoose = require("mongoose");

const registerSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const registerModel = mongoose.model("register", registerSchema);

module.exports = { registerModel };