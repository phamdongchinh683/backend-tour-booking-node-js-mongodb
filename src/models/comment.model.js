const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    blog_id: {
      type: Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comment_content: {
      type: String,
      required: true,
    },
    createAt: {
      type: Date,
    },
    updateAt: {
      type: Date,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Comment", commentSchema);
