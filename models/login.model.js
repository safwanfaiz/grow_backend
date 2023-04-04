const mongoose = require("mongoose");

const loginSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
}, { versionKey: false },);

const loginModel = mongoose.model("login", loginSchema);

module.exports = { loginModel };