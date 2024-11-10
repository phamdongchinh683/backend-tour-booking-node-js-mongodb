const Tour = require("../../models/tour.model");
const { responseStatus } = require("../../utils/handler");
const { nowDate } = require("../../controllers/auth/auth.method");
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
  async updateTour(infoTour, res) {
    const result = await Tour.updateOne(
      { _id: infoTour.id },
      {
        $set: {
          city: infoTour.city,
          attractions: infoTour.attractions,
          days: infoTour.days,
          prices: {
            adult: infoTour.prices.adult,
            child: infoTour.prices.child,
          },
          guides: infoTour.guides,
          images: infoTour.images,
          updateAt: nowDate(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return responseStatus(res, 400, "failed", "No tours were updated");
    }
    return responseStatus(res, 200, "success", "Updated");
  }
  async deleteTour(list, res) {
    let removeTours = await Tour.deleteMany({ _id: { $in: list } });
    if (removeTours.modifiedCount > 0) {
      return responseStatus(res, 400, "failed", "No tours were Deleted");
    }
    return responseStatus(res, 200, "success", "Deleted");
  }
}

module.exports = new TourService();
