const { responseStatus } = require("../../globals/handler");
const { hashPassword } = require("../../utils/hashHelper");
const UserService = require("../../services/auth/user.service");
const otpService = require("../../services/auth/otp.service");
const commentService = require("../../services/admin/comment.service");
const tourService = require("../../services/admin/tour.service");
const guideService = require("../../services/guide/guide.service");
class AuthController {
  // auth
  async signUp(req, res) {
    const password = await hashPassword(req.user.password);
    try {
      await UserService.saveUser(req.user, password, res);
    } catch (e) {
      if (e.code === 11000) {
        return responseStatus(
          res,
          422,
          "failed",
          `${Object.keys(e.keyValue)} existed`
        );
      }
      return responseStatus(res, 400, "failed", e);
    }
  }
  async login(req, res) {
    const { password } = req.body;
    const username = req.user;
    try {
      await UserService.findUser(username, password, res);
    } catch (e) {
      return responseStatus(res, 400, "failed", e.message);
    }
  }
  async refreshToken(req, res) {
    const username = req.user.username;
    const token = req.token;
    try {
      await UserService.decodeByUsername(username, token, res);
    } catch (e) {
      return responseStatus(res, 400, "failed", e.message);
    }
  }
  async logout(req, res) {
    const token = req.token;
    if (token) {
      res.status(200).json({ message: "Logged out successfully" });
    } else {
      res.status(400).json({ message: "No token provided" });
    }
  }
  async getProfile(req, res) {
    try {
      await UserService.profile(req.user._id, res);
    } catch (e) {
      return responseStatus(res, 400, "failed", e.message);
    }
  }
  async forgotPassword(req, res) {
    let email = req.value.email;
    try {
      await otpService.sendOtp(email, res);
    } catch (e) {
      return responseStatus(res, 400, "failed", e.message);
    }
  }
  async newPassword(req, res) {
    const { password } = req.body;
    let newPassword = await hashPassword(password);
    try {
      await UserService.newPasswordByOtp(req.user, newPassword, res);
    } catch (e) {
      return responseStatus(res, 400, "failed", e.message);
    }
  }
  // blog
  async postBlog(req, res) {
    try {
      await UserService.addBlog(req.user._id, req.value, res);
    } catch (e) {
      return responseStatus(res, 400, "failed", e.message);
    }
  }
  async editBlog(req, res) {
    let blogId = req.params.id;

    try {
      await UserService.editBlog(blogId, req.value, res);
    } catch (e) {
      return responseStatus(res, 400, "failed", e.message);
    }
  }
  async removeBlog(req, res) {
    let blogId = req.params.id;
    try {
      await UserService.deleteBlog(blogId, res);
    } catch (e) {
      return responseStatus(res, 400, "failed", e.message);
    }
  }
  async commentBlog(req, res) {
    let commentContent = req.value.comment;
    let blogId = req.params.id;
    try {
      await UserService.commentBlog(blogId, req.user._id, commentContent, res);
    } catch (e) {
      return responseStatus(res, 400, "failed", e.message);
    }
  }
  async updateComment(req, res) {
    let commentId = req.params.id;
    const { newComment } = req.body;
    try {
      await UserService.editComment(commentId, newComment, res);
    } catch (e) {
      return responseStatus(res, 400, "failed", e.message);
    }
  }
  async removeComment(req, res) {
    let { commentIds } = req.body;
    try {
      await commentService.deleteComments(commentIds, res);
    } catch (e) {
      return responseStatus(res, 400, "failed", e.message);
    }
  }
  async getAllBlog(req, res) {
    let userId = req.user._id;
    try {
      await UserService.getAllBlog(userId, res);
    } catch (e) {
      return responseStatus(res, 400, "failed", e.message);
    }
  }
  async detailBlog(req, res) {
    let blogId = req.params.id;
    try {
      await UserService.detailBlog(blogId, res);
    } catch (e) {
      return responseStatus(res, 400, "failed", e.message);
    }
  }
  // tour payment
  async tourPayment(req, res) {
    let userId = req.user._id;
    let tourId = req.params.tourId;
    let infoBook = req.infoBook;
    try {
      await UserService.tourPayment(infoBook, tourId, userId, res);
    } catch (e) {
      return responseStatus(res, 400, "failed", e.message);
    }
  }
  // getBooked
  async getBookedList(req, res) {
    let userId = req.user._id;
    try {
      await UserService.bookedList(userId, res);
    } catch (e) {
      return responseStatus(res, 400, "failed", e.message);
    }
  }
  async evaluateGuide(req, res) {
    let userId = req.user._id;
    const guideId = req.params.guideId;

    const { evaluateContent, rating } = req.body;
    try {
      await UserService.evaluateGuide(
        guideId,
        userId,
        { evaluateContent, rating },
        res
      );
    } catch (e) {
      return responseStatus(res, 400, "failed", e.message);
    }
  }
  async getTours(req, res) {
    const { cursor, direction } = req.query;
    try {
      await tourService.tourList(cursor, direction, res);
    } catch (e) {
      return responseStatus(res, 400, "failed", e.message);
    }
  }
  async detailTour(req, res) {
    const tourId = req.params.id;
    try {
      await tourService.detailTour(tourId, res);
    } catch (e) {
      return responseStatus(res, 400, "failed", e.message);
    }
  }

  async getAllGuide() {
    try {
      await guideService.getGuides();
    } catch (e) {
      return responseStatus(res, 400, "failed", e.message);
    }
  }
}

module.exports = new AuthController();
