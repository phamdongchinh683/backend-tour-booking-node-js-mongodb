const mongoose = require("mongoose");
const tourSchema = new mongoose.Schema({
  cityName: {
    type: String,
    required: true,
  },
  days: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Tour", tourSchema);
