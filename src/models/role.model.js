const mongoose = require("mongoose");
const otpSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Add Role"],
  },
  createdAt: Date,
  updatedAt: Date,
});

module.exports = mongoose.model("Role", otpSchema);
