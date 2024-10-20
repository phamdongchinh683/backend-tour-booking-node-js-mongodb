const mongoose = require("mongoose");

const cvSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  contactInfo: {
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: false,
    },
  },
  summary: {
    type: String,
    required: false,
  },
  skills: {
    type: [String],
    required: true,
  },
  workExperience: [
    {
      companyName: { type: String, required: true },
      position: { type: String, required: true },
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: false },
      responsibilities: [String],
    },
  ],
  education: [
    {
      institution: { type: String, required: true },
      degree: { type: String, required: true },
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: false },
      fieldOfStudy: { type: String, required: false },
    },
  ],
  languages: [
    {
      name: { type: String, required: true },
      proficiency: { type: String, required: true },
    },
  ],
  certifications: [
    {
      title: { type: String, required: true },
      issuedBy: { type: String, required: true },
      date: { type: Date, required: true },
    },
  ],
  projects: [
    {
      title: { type: String, required: true },
      description: { type: String, required: false },
      technologies: [String],
      link: { type: String, required: false },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const CurriculumVitae = mongoose.model("CurriculumVitae", cvSchema);

module.exports = CurriculumVitae;
