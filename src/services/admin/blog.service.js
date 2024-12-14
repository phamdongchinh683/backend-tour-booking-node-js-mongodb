const Blog = require("../../models/blog.model");
const { nowDate } = require("../../utils/formatDate");
const { responseStatus } = require("../../utils/handler");
class BlogService {
  async getAllBlog(cursor, direction = "next", res) {
    let limit = 6;
    let query = {};

    if (direction === "next" && cursor) {
      query._id = { $gt: cursor };
    } else if (direction === "prev" && cursor) {
      query._id = { $lt: cursor };
    }
    let blogs = await Blog.find(query)
      .select("-comments")
      .sort({ createAt: -1 })
      .limit(Number(limit))
      .lean()
      .exec();

    if (!blogs || blogs.length === 0) {
      return responseStatus(
        res,
        400,
        "failed",
        "There are currently no blogs available"
      );
    }
    const nextCursor = blogs.length > 0 ? blogs[blogs.length - 1]._id : null;
    const prevCursor = blogs.length > 0 ? blogs[0]._id : null;

    const results = {
      nextCursor,
      prevCursor,
      totalResults: blogs.length,
      blogs,
    };

    return responseStatus(res, 200, "success", results);
  }
  async createBlog(id, info, res) {
    let save = await Blog.create({
      user_id: id,
      title: info.title,
      content: info.content,
      images: info.images,
      createAt: nowDate(),
    });
    if (save) {
      return responseStatus(res, 200, "success", "Created Blog");
    }
  }
  async detailBlog(id, res) {
    let blog = await Blog.findById(id)
      .populate({
        path: "comments",
      })
      .lean()
      .exec();
    if (!blog) {
      return responseStatus(
        res,
        402,
        "failed",
        "There are currently no listings"
      );
    }
    return responseStatus(res, 200, "success", blog);
  }
  async updateBlog(id, info, res) {
    let update = await Blog.findByIdAndUpdate(id, {
      user_id: id,
      title: info.title,
      content: info.content,
      images: info.images,
      createAt: nowDate(),
    });
    if (!update) {
      return responseStatus(res, 402, "failed", "No changes were made");
    }
    return responseStatus(res, 200, "success", "Updated this blog");
  }
  async deleteBlogs(list, res) {
    let remove = await Blog.deleteMany({ _id: { $in: list } });
    if (remove.deletedCount > 0) {
      return responseStatus(res, 200, "success", "Deleted blog");
    }
    return responseStatus(res, 402, "failed", "This blog does not exist");
  }
}

module.exports = new BlogService();
