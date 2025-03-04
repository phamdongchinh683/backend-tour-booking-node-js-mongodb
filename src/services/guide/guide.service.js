const { responseStatus } = require("../../globals/handler");
const Role = require("../../models/role.model");
const User = require("../../models/user.model");

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
    let userInfo = await User.findOne({ username: username }).lean();
    if (!userInfo) {
      return responseStatus(res, 402, "failed", "Not found your profile");
    }
    return responseStatus(res, 200, "success", userInfo);
  }
}

module.exports = new GuildService();
