const Booking = require("../../models/booking.model");
const { nowDate } = require("../../utils/formatDate");
const { responseStatus } = require("../../utils/handler");
class BookingService {
  async getAllBooking(cursor, direction = "next", res) {
    let limit = 1;
    let query = {};

    if (direction === "next" && cursor) {
      query._id = { $gt: cursor };
    } else if (direction === "prev" && cursor) {
      query._id = { $lt: cursor };
    }
    let bookingList = await Booking.find(query)
      .populate([
        { path: "user_id", select: "fullName -_id" },
        { path: "guide_id", select: "fullName -_id" },
        { path: "tour_id", select: "city -_id" },
      ])
      .sort({ createAt: -1 })
      .limit(Number(limit))
      .lean()
      .exec();

    if (!bookingList || bookingList.length === 0) {
      return responseStatus(
        res,
        400,
        "failed",
        "There are currently no bookingList available"
      );
    }
    const nextCursor =
      bookingList.length > 0 ? bookingList[bookingList.length - 1]._id : null;
    const prevCursor = bookingList.length > 0 ? bookingList[0]._id : null;

    const results = {
      nextCursor,
      prevCursor,
      totalResults: bookingList.length,
      bookingList,
    };

    return responseStatus(res, 200, "success", results);
  }
  async createBooking(info, res) {
    let save = await Booking.create({
      user_id: info.userId,
      tour_id: info.tourId,
      guide_id: info.guideId,
      number_visitors: info.numberVisitor,
      start_tour: info.startTour,
      time: {
        start_time: info.startTime,
        end_time: info.endTime,
      },
      createAt: nowDate(),
    });
    if (save) {
      return responseStatus(res, 200, "success", "Created booking tour");
    }
  }
  async detailBooking(id, res) {
    let booking = await Booking.findById(id);
    if (booking) {
      return responseStatus(res, 200, "success", booking);
    }
  }
  async updateBooking(id, info, res) {
    let update = await Booking.findByIdAndUpdate(id, {
      user_id: info.userId,
      tour_id: info.tourId,
      guide_id: info.guideId,
      number_visitors: info.numberVisitor,
      start_tour: info.startTour,
      time: {
        start_time: info.startTime,
        end_time: info.endTime,
      },
      updateAt: nowDate(),
    });
    if (!update) {
      return responseStatus(res, 402, "failed", "No changes were made");
    }
    return responseStatus(res, 200, "success", "Updated this booking tour");
  }
  async deleteBookings(list, res) {
    let remove = await Booking.deleteMany({ _id: { $in: list } });
    if (remove.deletedCount > 0) {
      return responseStatus(res, 200, "success", "Deleted This booking tour");
    }
    return responseStatus(res, 402, "failed", "This blog does not exist");
  }
}

module.exports = new BookingService();
