const Blog = require("../../models/blog.model");
const { nowDate } = require("../../controllers/auth/auth.method");
const { responseStatus } = require("../../utils/handler");
class BlogService {
  async getAllBlog(res) {
    let blogs = await Blog.find().select("-comments").lean().exec();
    if (blogs.length === 0) {
      return responseStatus(
        res,
        402,
        "failed",
        "There are currently no listings"
      );
    }
    return responseStatus(res, 200, "success", blogs);
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
    let blog = await Blog.findById(id).populate("comments").lean().exec();
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
