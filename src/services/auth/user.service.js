const User = require("../../models/user.model");
const Role = require("../../models/role.model");
const Blog = require("../../models/blog.model");
const Comment = require("../../models/comment.model");
const Payment = require("../../models/payment.model");
const Booking = require("../../models/booking.model");
const Review = require("../../models/review.model");
const { _tokenLife, _tokenSecret } = require("../../globals/secretKey");
const { comparePassword } = require("../../utils/hashHelper");
const { nowDate } = require("../../utils/formatDate");
const { generateToken } = require("../../utils/tokenGenerator");
const { responseStatus } = require("../../globals/handler");
const { decodeToken } = require("../../utils/decodeToken");
class UserService {
  async decodeByUsername(username, token, res) {
    let decoded = await decodeToken(token, _tokenSecret);
    if (!decoded) {
      return responseStatus(res, 400, "failed", "token is not invalid");
    }

    let user = await User.findOne({ username: username })
      .select("username")
      .lean();
    if (!user) {
      return responseStatus(res, 400, "failed", "Not found user");
    }
    let data = {
      username: user.username,
    };

    let newToken = await generateToken(data, _tokenSecret, _tokenLife);
    if (!newToken) {
      return responseStatus(res, 400, "failed", "generateToken failed");
    }
    return responseStatus(res, 200, "success", newToken);
  }
  async isUser(username, res) {
    let getRole = await User.find({ username: username })
      .select("role_id")
      .populate("role_id", "name")
      .lean();
    if (getRole.length === 0) {
      throw new Error("This account does not exist");
    }
    return getRole[0];
  }
  async getRoleIdByName(roleName) {
    const role = await Role.findOne({ name: roleName }).lean();
    if (!role) {
      throw new Error(`Role "${roleName}" not found`);
    }
    return role._id;
  }
  async userRole(username, res) {
    let getRole = await User.findOne({ username: username })
      .select("role_id")
      .populate("role_id", "name")
      .lean();
    if (!getRole) {
      throw new Error("This account does not exist");
    }
    return getRole;
  }
  async saveUser(param, password, res) {
    const roleId = await this.getRoleIdByName(param.role);
    let userCreated = await User.create({
      username: param.username,
      password: password,
      images: param.images,
      fullName: {
        firstName: param.firstName,
        lastName: param.lastName,
      },
      age: param.age,
      city: param.city,
      contact: {
        email: param.email,
        phone: param.phone,
      },
      role_id: roleId,
      createdAt: nowDate(),
    });
    if (userCreated) {
      return responseStatus(res, 200, "success", "Signup successful");
    }
  }
  async findUser(username, password, res) {
    let user = await User.findOne({ username: username })
      .select("username password _id")
      .lean();
    if (!user) {
      return responseStatus(
        res,
        402,
        "failed",
        "Username you entered isn't connected to an account."
      );
    }

    const passwordMatch = await comparePassword(password, user.password);

    if (!passwordMatch) {
      return responseStatus(
        res,
        404,
        "failed",
        "The password that you've entered is incorrect."
      );
    }
    const data = { username: user.username, id: user._id };
    let accessToken = await generateToken(data, _tokenSecret, _tokenLife);
    return responseStatus(res, 200, "success", accessToken);
  }
  async profile(id, res) {
    let userInfo = await User.findOne({ _id: id })
      .select("-role_id -username -password -__v")
      .lean();
    if (!userInfo) {
      return responseStatus(res, 402, "failed", "Not found your profile");
    }
    return responseStatus(res, 200, "success", userInfo);
  }
  async newPasswordByOtp(email, newPassword, res) {
    let updatePassword = await User.updateOne(
      { "contact.email": email },
      { $set: { password: newPassword } }
    );
    if (updatePassword.matchedCount === 0) {
      return responseStatus(res, 402, "failed", "Update failed");
    }

    return responseStatus(
      res,
      200,
      "success",
      "New password updated successfully"
    );
  }
  async addBlog(id, infoBlog, res) {
    let create = await Blog.create({
      user_id: id,
      title: infoBlog.title,
      content: infoBlog.content,
      images: infoBlog.images,
      createdAt: nowDate(),
    });
    if (create) {
      return responseStatus(res, 200, "success", "Post a blog successfully");
    }
  }
  async editBlog(id, newInfo, res) {
    let updateBlog = await Blog.findByIdAndUpdate(id, {
      title: newInfo.title,
      content: newInfo.content,
      images: newInfo.images,
      updateAt: nowDate(),
    });
    if (!updateBlog) {
      return responseStatus(res, 400, "failed", "Nothing has changed");
    }
    return responseStatus(res, 200, "success", "updated my blog");
  }
  async deleteBlog(id, res) {
    let removeBlog = await Blog.findByIdAndDelete(id);
    if (removeBlog) {
      return responseStatus(res, 200, "success", "The blog has been deleted");
    }
    return responseStatus(res, 400, "failed", "This blog does not exist");
  }
  async commentBlog(blogId, userId, commentContent, res) {
    let comment = await Comment.create({
      blog_id: blogId,
      user_id: userId,
      comment_content: commentContent,
      createAt: nowDate(),
    });
    let blog = await Blog.findById(blogId);
    blog.comments.push(comment._id);
    await blog.save();

    if (comment) {
      return responseStatus(res, 200, "success", "commented");
    }
  }
  async editComment(id, comment, res) {
    let updateComment = await Comment.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          comment_content: comment,
          updateAt: nowDate(),
        },
      }
    );

    if (updateComment.modifiedCount > 0) {
      return responseStatus(res, 200, "success", "updated comment");
    }
    return responseStatus(res, 400, "failed", "Nothing has changed");
  }
  async deleteComment(id, res) {
    let removeComment = await Comment.findByIdAndDelete(id);
    if (removeComment) {
      return responseStatus(
        res,
        200,
        "success",
        "The comment has been deleted"
      );
    }
    return responseStatus(res, 400, "failed", "This comment does not exist");
  }
  async getAllBlog(id, res) {
    let blogs = await Blog.find({
      user_id: id,
    })
      .select("-user_id -comments")
      .lean();

    if (blogs.length === 0) {
      return responseStatus(
        res,
        400,
        "failed",
        "You haven't posted any blogs yet"
      );
    }
    return responseStatus(res, 200, "success", blogs);
  }
  async detailBlog(id, res) {
    let blog = await Blog.findById(id)
      .select("-user_id -updatedAt")
      .populate({
        path: "comments",
        select: "-blog_id",
        populate: {
          path: "user_id",
          select: "contact.email",
        },
      })
      .exec();

    if (!blog) {
      return responseStatus(res, 400, "failed", "Blog not found");
    }
    return responseStatus(res, 200, "success", blog);
  }
  async bookTour(tourId, userId, infoBooking, res) {
    let bookingTour = await Booking.create({
      tour_id: tourId,
      user_id: userId,
      guide_id: infoBooking.guideId,
      number_visitors: infoBooking.numberVisitor,
      start_tour: infoBooking.startTour,
      time: {
        start_time: infoBooking.startTime,
        end_time: infoBooking.endTime,
      },
    });
    bookingTour
      ? responseStatus(res, 200, "success", "Successfully booked the tour")
      : null;
  }
  async tourPayment(infoBook, tourId, userId, res) {
    let createBook = new Booking({
      tour_id: tourId,
      user_id: userId,
      guide_id: infoBook.guideId,
      number_visitors: infoBook.numberVisitor,
      start_tour: infoBook.startTour,
      time: {
        start_time: infoBook.startTime,
        end_time: infoBook.endTime,
      },
      createAt: nowDate(),
    });
    await createBook.save();

    let createPayment = await Payment.create({
      booking_id: createBook._id,
      user_id: userId,
      status: infoBook.status,
      card_number: infoBook.cardNumber,
      total_amount: infoBook.totalAmount,
      createdAt: nowDate(),
    });
    return responseStatus(res, 200, "success", createPayment);
  }
  async bookedList(id, res) {
    let getBooked = await Booking.find({ user_id: id })
      .populate([
        { path: "user_id", select: "fullName -_id" },
        { path: "guide_id", select: "fullName -_id" },
        { path: "tour_id", select: "city -_id" },
      ])
      .lean()
      .exec();

    getBooked.length > 0
      ? responseStatus(res, 200, "success", getBooked)
      : responseStatus(
          res,
          400,
          "failed",
          "You haven't booked any tours yet, try booking one"
        );
  }
  async evaluateGuide(guideId, id, review, res) {
    let postEvaluate = new Review({
      user_id: id,
      content: review.evaluateContent,
      rating: review.rating,
      createAt: nowDate(),
    });

    let pushEvaluate = postEvaluate.save();
    let guide = await User.findById(guideId);

    const [saveEvaluate, pushReviews] = await Promise.all([
      pushEvaluate,
      guide,
    ]);

    pushReviews.reviews.push(saveEvaluate._id);
    await pushReviews.save();

    pushReviews
      ? responseStatus(res, 200, "success", "Thank you for your review")
      : responseStatus(res, 400, "failed", "Please try again");
  }
}

module.exports = new UserService();
