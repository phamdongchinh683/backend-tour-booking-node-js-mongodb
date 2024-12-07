const mongoose = require("mongoose");
const reservationSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    service_id: {
      type: mongoose.Schema.ObjectId,
      ref: "Service",
      required: true,
    },
    numberPeople: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    createdAt: Date,
    updatedAt: Date,
  },
  { versionKey: false }
);
module.exports = mongoose.model("Reservation", reservationSchema);
