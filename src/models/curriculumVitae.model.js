const mongoose = require("mongoose");

const cvSchema = new mongoose.Schema({
  
});

const CurriculumVitae = mongoose.model("CurriculumVitae", cvSchema);

module.exports = CurriculumVitae;
