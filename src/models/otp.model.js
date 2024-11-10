const mongoose = require("mongoose");
const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      expires: 60,
    },
  },
  { versionKey: false }
);
otpSchema.index = { email: 1 };
module.exports = mongoose.model("Otp", otpSchema);
