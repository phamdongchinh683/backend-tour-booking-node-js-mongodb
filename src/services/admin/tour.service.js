const Tour = require("../../models/tour.model");
const { responseStatus } = require("../../utils/handler");
const { nowDate } = require("../../controllers/auth/auth.method");
class TourService {
  async tourList(cursor, direction = "next", res) {
    let limit = 5;
    let query = {};

    if (direction === "next" && cursor) {
      query._id = { $gt: cursor };
    } else if (direction === "prev" && cursor) {
      query._id = { $lt: cursor };
    }

    let tours = await Tour.find()
      .find(query)
      .populate("guide", "fullName")
      .sort({ createAt: direction === "next" ? -1 : 1 })
      .limit(Number(limit))
      .lean()
      .exec();
    if (!tours || tours.length === 0) {
      return responseStatus(res, 400, "failed", "No tour found");
    }
    const nextCursor = tours.length > 0 ? tours[tours.length - 1]._id : null;
    const prevCursor = tours.length > 0 ? tours[0]._id : null;

    const results = {
      nextCursor,
      prevCursor,
      totalResults: tours.length,
      tours,
    };

    return responseStatus(res, 200, "success", results);
  }
  async createTours(infoTours, res) {
    const tours = infoTours.map((tour) => {
      const imageAttractions = tour.images.map((image) => image);

      return {
        city: tour.city.trim(),
        attractions: tour.attractions,
        days: parseInt(tour.days, 10),
        prices: {
          adult: parseFloat(tour.prices.adult),
          child: parseFloat(tour.prices.child),
        },
        guide: tour.guide,
        images: imageAttractions,
        createdAt: nowDate(),
      };
    });

    let createTour = await Tour.insertMany(tours);
    if (!createTour) {
      return responseStatus(res, 402, "failed", "Enter complete information");
    }
    return responseStatus(res, 200, "success", "Tour created successfully");
  }
  async detailTour(id, res) {
    let tour = await Tour.findById(id).populate("guide", "fullName").lean();
    if (!tour) {
      return responseStatus(res, 400, "failed", "Not found this tour");
    }
    return responseStatus(res, 200, "success", tour);
  }

  async updateTour(infoTour, res) {
    const result = await Tour.updateOne(
      { _id: infoTour.id || infoTour._id },
      {
        $set: {
          city: infoTour.city,
          attractions: infoTour.attractions,
          days: infoTour.days,
          prices: {
            adult: infoTour.prices.adult,
            child: infoTour.prices.child,
          },
          guide: infoTour.guide,
          images: infoTour.images,
          updateAt: nowDate(),
        },
      }
    );

    if (result.nModified === 0) {
      return responseStatus(res, 400, "failed", "No tours were updated");
    }
    return responseStatus(res, 200, "success", "Updated");
  }
  async deleteTour(list, res) {
    let removeTours = await Tour.deleteMany({ _id: { $in: list } });
    if (removeTours.deletedCount === 0) {
      return responseStatus(res, 400, "failed", "No tours were Deleted");
    }
    return responseStatus(res, 200, "success", "Deleted");
  }
}

module.exports = new TourService();
