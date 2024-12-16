const Comment = require("../../models/comment.model");
const { nowDate } = require("../../utils/formatDate");
const { responseStatus } = require("../../globals/handler");
class CommentService {
  async getAllComment(cursor, direction = "next", res) {
    let limit = 6;
    let query = {};

    if (direction === "next" && cursor) {
      query._id = { $gt: cursor };
    } else if (direction === "prev" && cursor) {
      query._id = { $lt: cursor };
    }

    let commentList = await Comment.find(query)
      .populate([
        { path: "blog_id", select: "title -_id" },
        { path: "user_id", select: "fullName -_id" },
      ])
      .sort({ createAt: -1 })
      .limit(Number(limit))
      .lean()
      .exec();

    if (!commentList || commentList.length === 0) {
      return responseStatus(
        res,
        400,
        "failed",
        "There are currently no commentList available"
      );
    }
    const nextCursor =
      commentList.length > 0 ? commentList[commentList.length - 1]._id : null;
    const prevCursor = commentList.length > 0 ? commentList[0]._id : null;

    const results = {
      nextCursor,
      prevCursor,
      totalResults: commentList.length,
      commentList,
    };

    return responseStatus(res, 200, "success", results);
  }
  async createComment(info, res) {
    let save = await Comment.create({
      blog_id: info.blogId,
      user_id: info.userId,
      comment_content: info.comment,
      createAt: nowDate(),
    });
    if (save) {
      return responseStatus(res, 200, "success", "Created comment tour");
    }
  }
  async detailComment(id, res) {
    let comment = await Comment.findById(id)
      .populate([
        { path: "blog_id", select: "title -_id" },
        { path: "user_id", select: "fullName -_id" },
      ])
      .lean()
      .exec();
    if (!comment) {
      return responseStatus(res, 402, "failed", "Not found comment");
    }
    return responseStatus(res, 200, "success", comment);
  }
  async updateComment(id, info, res) {
    let update = await Comment.findByIdAndUpdate(id, {
      blog_id: info.blogId,
      user_id: info.userId,
      comment_content: info.comment,
      updateAt: nowDate(),
    });
    if (!update) {
      return responseStatus(res, 402, "failed", "No changes were made");
    }
    return responseStatus(res, 200, "success", "Updated this comment");
  }
  async deleteComments(ids, res) {
    let remove = await Comment.deleteMany({ _id: { $in: ids } });
    if (remove.deletedCount > 0) {
      return responseStatus(res, 200, "success", "Deleted This comment");
    }
    return responseStatus(res, 402, "failed", "This comments does not exist");
  }
}

module.exports = new CommentService();
