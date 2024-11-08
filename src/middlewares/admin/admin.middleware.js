const { Admin } = require("mongodb");
const {
  checkPasswordStrength,
  checkUsername,
} = require("../../controllers/auth/auth.method");
const adminService = require("../../services/admin/admin.service");
const otpService = require("../../services/auth/otp.service");
const { responseStatus } = require("../../utils/handler");
const roleModel = require("../../models/role.model");

class AdminMiddleware {
  async adminRole(req, res, next) {
    try {
      let role = await adminService.adminRole(req.user.username, res);
      if (role === "Admin") {
        req.user;
        next();
      } else {
        responseStatus(res, 403, "failed", "Access Denied. Admin only route!");
      }
    } catch (error) {
      responseStatus(res, 400, "failed", error.message);
    }
  }

  async verifyOtp(req, res, next) {
    const { otp } = req.body;
    try {
      let verify = await otpService.verifyOtp(otp, res);
      if (verify) {
        req.user = verify;
        next();
      }
    } catch (e) {
      responseStatus(res, 400, "failed", e.message);
    }
  }
}

module.exports = new AdminMiddleware();
