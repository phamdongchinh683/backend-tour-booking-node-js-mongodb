const userService = require("../../services/auth/user.service");
const { responseStatus } = require("../../utils/handler");
class GuideMiddleware {
  async roleGuide(req, res, next) {
    try {
      let role = await userService.userRole(req.user.username, res);
      if (role.role_id.name === "Guide") {
        req.user = role;
        next();
      } else {
        responseStatus(
          res,
          403,
          "failed",
          "Access Denied. Traveler only route!"
        );
      }
    } catch (error) {
      responseStatus(res, 400, "failed", error.message);
    }
  }
}

module.exports = new GuideMiddleware();
