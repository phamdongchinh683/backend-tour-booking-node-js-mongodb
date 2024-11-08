const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const paymentSchema = new Schema({
  booking_id: {
    type: mongoose.Schema.ObjectId,
    ref: "Booking",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "complete"],
  },
  card_number: {
    type: String,
  },
  total_amount: {
    type: Number,
  },
  createAt: {
    type: Date.now(),
  },
});

module.exports = mongoose.model("Payment", paymentSchema);
