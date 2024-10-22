const mongoose = require("mongoose");
const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Add Role"],
  },
  createdAt: Date,
  updatedAt: Date,
});

module.exports = mongoose.model("Role", roleSchema);
