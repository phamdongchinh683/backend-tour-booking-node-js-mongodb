const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String,
  address: String,
  phoneNumber: String,
  email: String,
  age: Number,
  role_id: {
    type: mongoose.Schema.ObjectId,
    ref: "Role",
    required: [ true, "Please Select a Role"],
  },
  city: String,
  createdAt: Date,
  updatedAt: Date,
});

module.exports = mongoose.model("User", userSchema);
