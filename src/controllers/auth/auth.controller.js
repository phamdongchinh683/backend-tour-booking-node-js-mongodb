const UserService = require("../../services/auth/user.service");
const roleService = require("../../services/admin/role.service");
const { responseStatus } = require("../../utils/handler");
const { hashPassword } = require("../../utils/hashHelper");
const TourService = require("../../services/admin/tour.service");
const otpService = require("../../services/auth/otp.service");
const Booking = require("../../models/booking.model");
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
      await UserService.profile(req.user._id, res);
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

  async postBlog(req, res) {
    const { title, content, images } = req.body;
    try {
      await UserService.addBlog(req.user._id, { title, content, images }, res);
    } catch (e) {
      responseStatus(res, 400, "failed", e.message);
    }
  }

  async commentBlog(req, res) {
    let { commentContent } = req.body;
    let blogId = req.params.id;
    try {
      await UserService.commentBlog(blogId, req.user._id, commentContent, res);
    } catch (e) {
      responseStatus(res, 400, "failed", e.message);
    }
  }

  async getAllBlog(req, res) {
    try {
      await UserService.getAllBlog(req.user._id, res);
    } catch (e) {
      responseStatus(res, 400, "failed", e.message);
    }
  }

  async detailBlog(req, res) {
    let blogId = req.params.id;
    try {
      await UserService.detailBlog(blogId, res);
    } catch (e) {
      responseStatus(res, 400, "failed", e.message);
    }
  }

  async tourPayment(req, res) {
    try {
      await UserService.tourPayment(req.infoBook, res);
    } catch (e) {
      responseStatus(res, 400, "failed", e.message);
    }
  }
}

module.exports = new AuthController();
