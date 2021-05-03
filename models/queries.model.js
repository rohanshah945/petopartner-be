const mongoose = require("mongoose");

const querySchema = mongoose.Schema({
  firstName: {
    type: String,
    require: "First Name is required",
  },
  lastName: {
    type: String,
  },
  message: {
    type: String,
    require: "Message is required",
  },
  email: {
    type: String,
    require: "Email is required",
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("queries", querySchema);
