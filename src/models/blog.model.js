const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Please Select a Role"],
  },
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
      reply: [
        {
          userId: String,
          comment: String,
          votes: Number,
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Blog", blogSchema);

setTimeout;
