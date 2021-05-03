const mongoose = require("mongoose");

const matchSchema = mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  isMatch: {
    type: Boolean,
    default: false,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("matches", matchSchema);
