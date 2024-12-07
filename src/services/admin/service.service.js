// const { nowDate } = require("../../controllers/auth/auth.method");
const Service = require("../../models/service.model");
const { responseStatus } = require("../../utils/handler");
class ServiceBookService {
  async getAllServiceBook(res) {
    let service = await Service.find().lean().exec();
    if (service.length === 0) {
      return responseStatus(
        res,
        402,
        "failed",
        "There are currently no listings"
      );
    }
    return responseStatus(res, 200, "success", service);
  }
  async createServiceBook(info, res) {
    let save = await Service.create({
      name: info.name,
      describe: info.describe,
      createdAt: nowDate(),
    });
    if (save) {
      return responseStatus(res, 200, "success", "Created ServiceBook");
    }
  }
  async detailServiceBook(id, res) {
    let serviceBookDetail = await Service.findById(id).lean().exec();
    if (!serviceBookDetail) {
      return responseStatus(
        res,
        402,
        "failed",
        "There are currently not service"
      );
    }
    return responseStatus(res, 200, "success", serviceBookDetail);
  }
  async updateServiceBook(id, info, res) {
    let update = await Service.findByIdAndUpdate(id, {
      name: info.name,
      describe: info.describe,
      updatedAt: nowDate(),
    });
    if (!update) {
      return responseStatus(res, 402, "failed", "No changes were made");
    }
    return responseStatus(res, 200, "success", "Updated this serviceBook");
  }
  async deleteServiceBooks(list, res) {
    let remove = await Service.deleteMany({ _id: { $in: list } });
    if (remove.deletedCount > 0) {
      return responseStatus(res, 200, "success", "Deleted service book");
    }
    return responseStatus(
      res,
      402,
      "failed",
      "This service book does not exist"
    );
  }
}

module.exports = new ServiceBookService();
