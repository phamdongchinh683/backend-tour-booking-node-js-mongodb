const adminService = require("../../services/admin/admin.service");
const { responseStatus } = require("../../utils/handler");

class AdminMiddleware {
  async isAdmin(req, res, next) {
    const { username } = req.body;
    try {
      const role = await adminService.isAdmin(username, res);
      if (role.role_id.name === "Admin") {
        next();
      } else {
        throw new Error("Only administrators can log in!");
      }
    } catch (e) {
      return responseStatus(res, 400, "failed", e.message);
    }
  }
  async adminRole(req, res, next) {
    try {
      const role = await adminService.adminRole(req.user.username, res);
      if (role.role_id.name === "Admin") {
        req.user = role;
        return next();
      }
      return responseStatus(
        res,
        403,
        "failed",
        "Access Denied. Admin only route!"
      );
    } catch (error) {
      return responseStatus(res, 400, "failed", error.message);
    }
  }
}

module.exports = new AdminMiddleware();
