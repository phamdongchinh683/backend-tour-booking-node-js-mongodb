const mongoose = require("mongoose");
const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    describe: {
      type: String,
      required: true,
    },
    createdAt: Date,
    updatedAt: Date,
  },
  { versionKey: false }
);
serviceSchema.index = { name: 1 };
module.exports = mongoose.model("Service", serviceSchema);
