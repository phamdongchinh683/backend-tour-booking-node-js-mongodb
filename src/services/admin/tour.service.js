const Tour = require("../../models/tour.model");
const { responseStatus } = require("../../utils/handler");

class TourService {
  async tourList(res) {
    let tours = await Tour.find().populate("guides", "fullName").lean();
    if (!tours || tours.length === 0) {
      return responseStatus(res, 400, "failed", "No tour found");
    }
    return responseStatus(res, 200, "success", tours);
  }

  async createTours(infoTours, res) {
    let tours = infoTours.map((tour) => {
      let locations = tour.attractions.map((attraction) => {
        return attraction;
      });

      let imageAttractions = tour.images.map((image) => {
        return image;
      });

      let guideTour = tour.guides.map((guide) => {
        return guide;
      });

      return {
        city: tour.city,
        attractions: locations,
        days: tour.days,
        prices: {
          adult: tour.prices.adult,
          child: tour.prices.child,
        },
        guides: guideTour,
        images: imageAttractions,
        createdAt: tour.createAt || nowDate(),
      };
    });

    let createTour = await Tour.insertMany(tours);
    if (!createTour) {
      return responseStatus(res, 402, "failed", "Enter complete information");
    }
    return responseStatus(res, 200, "success", "Tour created successfully");
  }

  async updateTours(infoTour, res) {}

  async deleteTour(infoTour, res) {}
}

module.exports = new TourService();
