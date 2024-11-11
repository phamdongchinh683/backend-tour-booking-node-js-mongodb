const adminService = require("../../services/admin/admin.service");
const { responseStatus } = require("../../utils/handler");

class AdminMiddleware {
  async adminRole(req, res, next) {
    try {
      let role = await adminService.adminRole(req.user.username, res);
      if (role.role_id.name === "Admin") {
        req.user = role;
        next();
      } else {
        responseStatus(res, 403, "failed", "Access Denied. Admin only route!");
      }
    } catch (error) {
      responseStatus(res, 400, "failed", error.message);
    }
  }
}

module.exports = new AdminMiddleware();
