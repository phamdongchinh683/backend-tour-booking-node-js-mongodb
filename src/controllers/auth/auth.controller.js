const UserService = require("../../services/auth/user.service");
const roleService = require("../../services/admin/role.service");
const { responseStatus } = require("../../utils/handler");
const { hashPassword } = require("../../utils/hashHelper");
const TourService = require("../../services/admin/tour.service");
const otpService = require("../../services/auth/otp.service");
class AuthController {
  async signUp(req, res) {
    const password = await hashPassword(req.user.password);
    try {
      await UserService.saveUser(req.user, password, res);
    } catch (e) {
      responseStatus(res, 400, "failed", e.message);
    }
  }
  async login(req, res) {
    const { username, password } = req.body;
    try {
      await UserService.findUser(username, password, res);
    } catch (e) {
      responseStatus(res, 400, "failed", e.message);
    }
  }
  async getProfile(req, res) {
    try {
      await UserService.profile(req.user.username, res);
    } catch (e) {
      responseStatus(res, 400, "failed", e.message);
    }
  }
  async forgotPassword(req, res) {
    const { email } = req.body;
    try {
      await otpService.sendOtp(email, res);
      return;
    } catch (e) {
      responseStatus(res, 400, "failed", e.message);
    }
  }
  async newPassword(req, res) {
    const { password } = req.body;
    let newPassword = await hashPassword(password);
    try {
      await UserService.newPasswordByOtp(req.user, newPassword, res);
    } catch (e) {
      responseStatus(res, 400, "failed", e.message);
    }
  }

}

module.exports = new AuthController();
