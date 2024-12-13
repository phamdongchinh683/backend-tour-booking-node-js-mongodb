const mongoose = require("mongoose");
const tourSchema = new mongoose.Schema(
  {
    city: {
      type: String,
    },
    attractions: {
      type: String,
      required: true,
    },
    days: {
      type: String,
    },
    prices: {
      adult: {
        type: String,
      },
      child: {
        type: String,
      },
    },
    guide: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    images: [
      {
        type: String,
        required: [true, "Please select a image"],
      },
    ],
    createAt: {
      type: Date,
      default: Date.now(),
    },
    updateAt: {
      type: Date,
    },
  },
  { versionKey: false }
);
module.exports = mongoose.model("Tour", tourSchema);
