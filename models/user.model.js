const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    require: "First Name is required",
  },
  lastName: {
    type: String,
    require: "First Name is required",
  },
  photoURL: {
    type: String,
  },
  email: {
    type: String,
    require: "Email is required",
  },
  password: {
    type: String,
    require: "Password is required",
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("users", userSchema);
