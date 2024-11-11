const Review = require("../../models/review.model");
const { nowDate } = require("../../controllers/auth/auth.method");
const { responseStatus } = require("../../utils/handler");
class ReviewService {
  async getAllReview(res) {
    let reviewList = await Review.find()
      .populate("user_id", "fullName -_id")
      .lean()
      .exec();
    if (reviewList.length === 0) {
      return responseStatus(
        res,
        402,
        "failed",
        "There are currently no listings"
      );
    }
    return responseStatus(res, 200, "success", reviewList);
  }
  async createReview(info, res) {
    let save = await Review.create({
      user_id: info.userId,
      guide_id: info.guideId,
      content: info.content,
      rating: info.rating,
      createAt: nowDate(),
    });
    if (save) {
      return responseStatus(res, 200, "success", "Created Review");
    }
  }
  async detailReview(id, res) {
    let review = await Review.findById(id)
      .populate("user_id", "fullName -_id")
      .lean()
      .exec();
    if (review) {
      return responseStatus(res, 200, "success", review);
    }
  }
  async updateReview(id, info, res) {
    let update = await Review.findByIdAndUpdate(id, {
      user_id: info.userId,
      guide_id: info.guideId,
      content: info.content,
      rating: info.rating,
      updateAt: nowDate(),
    });
    if (!update) {
      return responseStatus(res, 402, "failed", "No changes were made");
    }
    return responseStatus(res, 200, "success", "Updated this review");
  }
  async deleteReview(ids, res) {
    let remove = await Review.deleteMany({ _id: { $in: ids } });
    if (!remove) {
      return responseStatus(res, 402, "failed", "This review does not exist");
    }
    return responseStatus(res, 200, "success", "Deleted this review ");
  }
}

module.exports = new ReviewService();
