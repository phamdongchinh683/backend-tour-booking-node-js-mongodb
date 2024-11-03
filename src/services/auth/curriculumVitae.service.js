const CurriculumVitae = require("../../models/curriculumVitae.model");
const { nowDate } = require("../../controllers/auth/auth.method");
const { responseStatus } = require("../../utils/handler");

class CurriculumVitaeService {
  async myCurriculumVitae(id, res) {
    let myCv = await CurriculumVitae.findOne({
      user_id: id,
    });
    if (!myCv || myCv.length === 0) {
      return responseStatus(res, 400, "failed", "No users found");
    }
    return responseStatus(res, 200, "success", myCv);
  }
  async createCurriculumVitae(info, id, res) {
    const educations = info.education.map((value) => {
      return value;
    });
    let infoDetails = info.personal_details;
    let infoSkills = info.skills;

    let createCv = await CurriculumVitae.create({
      user_id: id,
      personal_details: {
        name: infoDetails.name,
        address: infoDetails.address,
        email: infoDetails.email,
        phone: infoDetails.phoneNumber,
        github: infoDetails.github,
        website: infoDetails.website,
      },
      education: educations,
      skills: infoSkills,
    });

    if (!createCv) {
      return responseStatus(res, 402, "failed", "Enter complete information");
    }
    return responseStatus(res, 200, "success", "Upload completed successfully");
  }
}

module.exports = new CurriculumVitaeService();
