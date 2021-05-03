const mongoose = require("mongoose");

const dogSchema = mongoose.Schema({
  name: {
    type: String,
    require: "Dog Name is required",
  },
  age: {
    type: Number,
    require: "Age is required",
  },
  breed: {
    type: String,
    require: "Breed is required",
  },
  photoURL: {
    type: String,
  },
  description: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("dogs", dogSchema);
