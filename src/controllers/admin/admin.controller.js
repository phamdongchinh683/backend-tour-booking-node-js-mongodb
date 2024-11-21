const { responseStatus } = require("../../utils/handler");
const adminService = require("../../services/admin/admin.service");
const roleService = require("../../services/admin/role.service");
const tourService = require("../../services/admin/tour.service");
const bookingService = require("../../services/admin/booking.service");
const reviewService = require("../../services/admin/review.service");
const commentService = require("../../services/admin/comment.service");
const userService = require("../../services/auth/user.service");
const blogService = require("../../services/admin/blog.service");
const paymentService = require("../../services/admin/payment.service");
class AdminController {
  // manage user
  async userList(req, res) {
    try {
      await adminService.getAllUsers(res);
    } catch (e) {
      return responseStatus(res, 400, "failed", e.message);
    }
  }
  async guideList(req, res) {
    try {
      await adminService.getAllGuides(res);
    } catch (e) {
      return responseStatus(res, 400, "failed", e.message);
    }
  }
  async userDetail(req, res) {
    const userId = req.params.id;
    try {
      await adminService.userDetailById(userId, res);
    } catch (e) {
      return responseStatus(res, 400, "failed", e.message);
    }
  }
  async addUsers(req, res) {
    const { users } = req.body;
    try {
      await adminService.saveUsers(users, res);
    } catch (e) {
      if (e.code === 11000) {
        return responseStatus(res, 400, "failed", "Exited");
      }
      return responseStatus(res, 400, "failed", e.message);
    }
  }
  async updateUser(req, res) {
    const { user } = req.body;
    try {
      await adminService.updateUser(user, res);
    } catch (e) {
      return responseStatus(res, 400, "failed", e.message);
    }
  }

  async deleteUsers(req, res) {
    const { users } = req.body;
    try {
      await adminService.deleteUsers(users, res);
    } catch (e) {
      return responseStatus(res, 400, "failed", e.message);
    }
  }
  // manage role
  async roleList(req, res) {
    try {
      await roleService.roleList(res);
    } catch (e) {
      return responseStatus(res, 400, "failed", e.message);
    }
  }
  async createRole(req, res) {
    const { roles } = req.body;
    try {
      await roleService.saveRole(roles, res);
    } catch (e) {
      return responseStatus(res, 400, "failed", e.message);
    }
  }
  async updateRole(req, res) {
    const roleId = req.params.id;
    const { name } = req.body;
    try {
      await roleService.updateRole(roleId, name, res);
    } catch (e) {
      return responseStatus(res, 400, "failed", e.message);
    }
  }
  async deleteRole(req, res) {
    const roleId = req.params.id;
    try {
      await roleService.deleteRole(roleId, res);
    } catch (e) {
      return responseStatus(res, 400, "failed", e.message);
    }
  }

  async deleteRoles(req, res) {
    const { ids } = req.body;
    try {
      await roleService.deleteRoles(ids, res);
    } catch (e) {
      return responseStatus(res, 400, "failed", e);
    }
  }
  // manage tour
  async addTour(req, res) {
    const { tours } = req.body;
    try {
      await tourService.createTours(tours, res);
    } catch (e) {
      return responseStatus(res, 400, "failed", e.message);
    }
  }
  async getTours(req, res) {
    try {
      await tourService.tourList(res);
    } catch (e) {
      return responseStatus(res, 400, "failed", e.message);
    }
  }
  async tourDetail(req, res) {
    const tourId = req.params.id;
    try {
      await tourService.detailTour(tourId, res);
    } catch (e) {
      return responseStatus(res, 400, "failed", e.message);
    }
  }

  async updateTour(req, res) {
    const { tour } = req.body;
    try {
      await tourService.updateTour(tour, res);
    } catch (e) {
      return responseStatus(res, 400, "failed", e.message);
    }
  }
  async deleteTours(req, res) {
    const { tours } = req.body;
    try {
      await tourService.deleteTour(tours, res);
    } catch (e) {
      return responseStatus(res, 400, "failed", e.message);
    }
  }
  // manage booking
  async bookingList(req, res) {
    try {
      await bookingService.getAllBooking(res);
    } catch (e) {
      return responseStatus(res, 400, "failed", e.message);
    }
  }
  async bookingDetail(req, res) {
    let bookingId = req.params.id;
    try {
      await bookingService.detailBooking(bookingId, res);
    } catch (e) {
      return responseStatus(res, 400, "failed", e.message);
    }
  }

  async createBooking(req, res) {
    const {
      userId,
      tourId,
      guideId,
      numberVisitor,
      startTour,
      startTime,
      endTime,
    } = req.body;
    try {
      await bookingService.createBooking(
        {
          userId,
          tourId,
          guideId,
          numberVisitor,
          startTour,
          startTime,
          endTime,
        },
        res
      );
    } catch (e) {
      return responseStatus(res, 400, "failed", e.message);
    }
  }
  async updateBooking(req, res) {
    let bookingId = req.params.id;
    const {
      userId,
      tourId,
      guideId,
      numberVisitor,
      startTour,
      startTime,
      endTime,
    } = req.body;
    try {
      await bookingService.updateBooking(
        bookingId,
        {
          userId,
          tourId,
          guideId,
          numberVisitor,
          startTour,
          startTime,
          endTime,
        },
        res
      );
    } catch (e) {
      return responseStatus(res, 400, "failed", e.message);
    }
  }
  async deleteBooking(req, res) {
    let { bookings } = req.body;
    try {
      await bookingService.deleteBookings(bookings, res);
    } catch (e) {
      return responseStatus(res, 400, "failed", e.message);
    }
  }
  // manage blog
  async blogList(req, res) {
    try {
      await blogService.getAllBlog(res);
    } catch (e) {
      return responseStatus(res, 400, "failed", e.message);
    }
  }
  async blogDetail(req, res) {
    const blogId = req.params.id;
    try {
      await blogService.detailBlog(blogId, res);
    } catch (e) {
      return responseStatus(res, 400, "failed", e.message);
    }
  }
  async createBlog(req, res) {
    const { title, content, images } = req.body;
    try {
      await blogService.createBlog(
        req.user._id,
        { title, content, images },
        res
      );
    } catch (e) {
      return responseStatus(res, 400, "failed", e.message);
    }
  }
  async updateBlog(req, res) {
    let blogId = req.params.id;
    const { title, content, images } = req.body;
    try {
      await blogService.updateBlog(blogId, { title, content, images }, res);
    } catch (e) {
      return responseStatus(res, 400, "failed", e.message);
    }
  }
  async deleteBlogs(req, res) {
    const { deleteList } = req.body;
    try {
      await blogService.deleteBlogs(deleteList, res);
    } catch (e) {
      return responseStatus(res, 400, "failed", e.message);
    }
  }
  // manage comment
  async commentList(req, res) {
    try {
      await commentService.getAllComment(res);
    } catch (e) {
      return responseStatus(res, 400, "failed", e.message);
    }
  }
  async commentDetail(req, res) {
    let commentId = req.params.id;
    try {
      await commentService.detailComment(commentId, res);
    } catch (e) {
      return responseStatus(res, 400, "failed", e.message);
    }
  }

  async createComment(req, res) {
    const { blogId, userId, comment } = req.body;
    try {
      await commentService.createComment({ blogId, userId, comment }, res);
    } catch (e) {
      return responseStatus(res, 400, "failed", e.message);
    }
  }
  async updateComment(req, res) {
    let commentId = req.params.id;
    const { blogId, userId, comment } = req.body;
    try {
      await commentService.updateComment(
        commentId,
        { blogId, userId, comment },
        res
      );
    } catch (e) {
      return responseStatus(res, 400, "failed", e.message);
    }
  }
  async deleteComment(req, res) {
    let { commentIds } = req.body;
    try {
      await commentService.deleteComments(commentIds, res);
    } catch (e) {
      return responseStatus(res, 400, "failed", e.message);
    }
  }
  // manage review
  async reviewList(req, res) {
    try {
      await reviewService.getAllReview(res);
    } catch (e) {
      return responseStatus(res, 400, "failed", e.message);
    }
  }
  async reviewDetail(req, res) {
    let reviewId = req.params.id;
    try {
      await reviewService.detailReview(reviewId, res);
    } catch (e) {
      return responseStatus(res, 400, "failed", e.message);
    }
  }
  async createReview(req, res) {
    const { userId, guideId, content, rating } = req.body;
    try {
      await reviewService.createReview(
        { userId, guideId, content, rating },
        res
      );
    } catch (e) {
      return responseStatus(res, 400, "failed", e.message);
    }
  }
  async updateReview(req, res) {
    let reviewId = req.params.id;
    const { userId, guideId, content, rating } = req.body;
    try {
      await reviewService.updateReview(
        reviewId,
        { userId, guideId, content, rating },
        res
      );
    } catch (e) {
      return responseStatus(res, 400, "failed", e.message);
    }
  }
  async deleteReview(req, res) {
    const { ids } = req.body;
    try {
      await reviewService.deleteReview(ids, res);
    } catch (e) {
      return responseStatus(res, 400, "failed", e.message);
    }
  }
  // manage payment
  async paymentList(req, res) {
    try {
      await paymentService.getAllPayment(res);
    } catch (e) {
      return responseStatus(res, 400, "failed", e.message);
    }
  }
  async paymentDetail(req, res) {
    const paymentId = req.params.id;
    try {
      await paymentService.detailPayment(paymentId, res);
    } catch (e) {
      return responseStatus(res, 400, "failed", e.message);
    }
  }
  async createPayment(req, res) {
    const { bookingId, userId, status, cardNumber, totalAmount } = req.body;
    try {
      await paymentService.createPayment(
        {
          bookingId,
          userId,
          status,
          cardNumber,
          totalAmount,
        },
        res
      );
    } catch (e) {
      return responseStatus(res, 400, "failed", e.message);
    }
  }
  async updatePayment(req, res) {
    let paymentId = req.params.id;
    const { bookingId, userId, status, cardNumber, totalAmount } = req.body;
    try {
      await paymentService.updatePayment(
        paymentId,
        { bookingId, userId, status, cardNumber, totalAmount },
        res
      );
    } catch (e) {
      return responseStatus(res, 400, "failed", e.message);
    }
  }
  async deletePayment(req, res) {
    const { ids } = req.body;
    try {
      await paymentService.deletePayments(ids, res);
    } catch (e) {
      return responseStatus(res, 400, "failed", e.message);
    }
  }
}

module.exports = new AdminController();
