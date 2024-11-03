const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  user_id: {
    ref: "User",
    type: mongoose.Schema.ObjectId,
  },
  comment_content: {
    type: String,
    required: true,
  },
  createdAt: Date,
  updatedAt: Date,
});

module.exports = mongoose.model("Comment", cvSchema);
