const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    blog_id: {
      type: Schema.Types.ObjectId,
      ref: "Blog",
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    comment_content: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Comment", commentSchema);
