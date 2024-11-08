const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
  },
  comments: [
    {
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      comment_content: {
        type: String,
        trim: true,
      },
      createAt: {
        type: Date,
      },
    },
  ],
  updateAt: {
    type: Date,
  },
});

module.exports = mongoose.model("Blog", blogSchema);
