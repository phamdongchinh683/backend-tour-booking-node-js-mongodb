const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema({
  title: String,
  slug: String,
  published: Boolean,
  author: String,
  content: String,
  createdAt: Date,
  updatedAt: Date,
  comments: [
    {
      user: String,
      content: String,
      votes: Number,
    },
  ],
});

module.exports = mongoose.model("Blog", blogSchema);
