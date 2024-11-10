const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema(
  {
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
    images: [
      {
        type: String,
      },
    ],
    comments: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Comment",
      },
    ],
    createAt: {
      type: Date,
    },
    updateAt: {
      type: Date,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
blogSchema.index({ user_id: 1 });
module.exports = mongoose.model("Blog", blogSchema);
