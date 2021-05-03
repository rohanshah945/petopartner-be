const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    require: "Title is required",
  },
  slug: {
    type: String,
    require: "Slug is required",
  },
  description: {
    type: String,
    require: "Description is required",
  },
  body: {
    type: String,
    require: "Blog Body is required",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("blogs", blogSchema);
