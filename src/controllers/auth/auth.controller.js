const { responseStatus } = require("../../utils/handler");
const { hashPassword } = require("../../utils/hashHelper");
const UserService = require("../../services/auth/user.service");
const otpService = require("../../services/auth/otp.service");
const commentService = require("../../services/admin/comment.service");
const tourService = require("../../services/admin/tour.service");
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
          `${Object.keys(e.keyValue)} exited`
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
  async getProfile(req, res) {
    try {
      await UserService.profile(req.user._id, res);
    } catch (e) {
      return responseStatus(res, 400, "failed", e.message);
    }
  }
  async forgotPassword(req, res) {
    const { email } = req.body;
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
    const { title, content, images } = req.body;
    try {
      await UserService.addBlog(req.user._id, { title, content, images }, res);
    } catch (e) {
      return responseStatus(res, 400, "failed", e.message);
    }
  }
  async editBlog(req, res) {
    let blogId = req.params.id;
    const { title, newContent, images } = req.body;
    try {
      await UserService.editBlog(blogId, { title, newContent, images }, res);
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
    let { commentContent } = req.body;
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
}

module.exports = new AuthController();
