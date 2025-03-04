const Guide = require("../../models/guide.model");
const User = require("../../models/user.model");
const { responseStatus } = require("../../globals/handler");

class GuildService {
  async guideRole(username, res) {
    let getRole = await User.findOne({ username: username })
      .select("role_id")
      .populate("role_id", "name")
      .lean();
    if (!getRole) {
      return responseStatus(res, 400, "failed", "You have not role");
    }
    return getRole.role_id.name;
  }
  async profile(username, res) {
    let userInfo = await Guide.findOne({ username: username }).lean();
    if (!userInfo) {
      return responseStatus(res, 402, "failed", "Not found your profile");
    }
    return responseStatus(res, 200, "success", userInfo);
  }
  async getGuides() {
    let getAllGuides = await User.find({ role_id: roleGuide._id })
      .populate("role_id", "name")
      .lean();
    if (!getAllGuides || getAllGuides.length === 0) {
      return responseStatus(res, 400, "failed", "No guides found");
    }
    return responseStatus(res, 200, "success", getAllGuides);
  }
}

module.exports = new GuildService();
