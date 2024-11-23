const mongoose = require("mongoose");
const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    createdAt: Date,
    updatedAt: Date,
  },
  { versionKey: false }
);
roleSchema.index = { name: 1 };
module.exports = mongoose.model("Role", roleSchema);


