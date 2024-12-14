const Review = require("../../models/review.model");
const { nowDate } = require("../../utils/formatDate");
const { responseStatus } = require("../../utils/handler");
class ReviewService {
  async getAllReview(cursor, direction = "next", res) {
    let limit = 6;
    let query = {};

    if (direction === "next" && cursor) {
      query._id = { $gt: cursor };
    } else if (direction === "prev" && cursor) {
      query._id = { $lt: cursor };
    }

    let reviews = await Review.find(query)
      .populate("user_id", "fullName -_id")
      .sort({ createAt: -1 })
      .limit(Number(limit))
      .lean()
      .exec();

    if (!reviews || reviews.length === 0) {
      return responseStatus(
        res,
        400,
        "failed",
        "There are currently no reviews available"
      );
    }
    const nextCursor =
      reviews.length > 0 ? reviews[reviews.length - 1]._id : null;
    const prevCursor = reviews.length > 0 ? reviews[0]._id : null;

    const results = {
      nextCursor,
      prevCursor,
      totalResults: reviews.length,
      reviews,
    };
    return responseStatus(res, 200, "success", results);
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
