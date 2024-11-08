const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const reviewSchema = new Schema({
  user_id: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  guide_id: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  content: {
    type: String,
    trim: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  createAt: {
    type: Date,
  },
});

module.exports = mongoose.model("Review", reviewSchema);
