const Tour = require("../../models/tour.model");
const { responseStatus } = require("../../utils/handler");

class TourService {
  async tourList(res) {
    let tours = await Tour.find();
    if (!tours || tours.length === 0) {
      return responseStatus(res, 400, "failed", "No tour found");
    }
    return responseStatus(res, 200, "success", tours);
  }

  async createTour(info, res) {
    let createTour = await Tour.create({
      cityName: info.cityName,
      days: info.days,
      price: info.price,
      avatar: info.avatar,
    });

    if (!createTour) {
      return responseStatus(res, 402, "failed", "Enter complete information");
    }
    return responseStatus(res, 200, "success", "create completed successfully");
  }
}

module.exports = new TourService();
