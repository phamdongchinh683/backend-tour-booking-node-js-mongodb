const mongoose = require("mongoose");

const cvSchema = new mongoose.Schema({
  user_id: {
    ref: "User",
    type: mongoose.Schema.ObjectId,
  },
  personal_details: {
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    github: { type: String, required: false },
    website: { type: String, required: false },
  },
  education: [
    {
      degree: { type: String, required: true },
      institution: { type: String, required: true },
      location: { type: String, required: true },
      relevant_coursework: { type: String, required: false },
    },
  ],
  professional_experience: [
    {
      job_title: { type: String, required: true },
      company: { type: String, required: true },
      location: { type: String, required: true },
      start_date: { type: Date, required: true },
      end_date: { type: Date, required: false },
      responsibilities: { type: String, required: true },
      achievements: { type: String, required: false },
    },
  ],
  skills: {
    technical: { type: String, required: true },
    languages: { type: String, required: true },
  },
  createdAt: Date,
  updatedAt: Date,
});

module.exports = mongoose.model("CurriculumVitae", cvSchema);
