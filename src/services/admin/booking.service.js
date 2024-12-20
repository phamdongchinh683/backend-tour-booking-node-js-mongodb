const Booking = require("../../models/booking.model");
const { nowDate } = require("../../utils/formatDate");
const { responseStatus } = require("../../globals/handler");
const Payment = require("../../models/payment.model");
class BookingService {
  async getAllBooking(cursor, direction = "next", res) {
    let limit = 5;
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
        "There are currently no booking available"
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
  async createBooking(bookTours, res) {
    const bookings = bookTours.map((param) => ({
      tour_id: param.tour_id,
      user_id: param.user_id,
      guide_id: param.guide_id,
      number_visitors: param.number_visitors,
      start_tour: param.start_tour,
      time: {
        start_time: param.start_time,
        end_time: param.end_time,
      },
    }));
    const createBookTours = await Booking.insertMany(bookings, {
      ordered: false,
    });

    if (createBookTours.length <= 0) {
      return responseStatus(res, 400, "failed", "there are no changes");
    }
    const paymentInfo = createBookTours.map((bookInfo, index) => ({
      booking_id: bookInfo._id,
      card_number: bookTours[index].card_number,
      total_amount: bookTours[index].total_amount,
      status: bookTours[index].status,
      user_id: bookTours[index].user_id,
      createdAt: nowDate(),
    }));
    const createPayments = Payment.insertMany(paymentInfo, { ordered: false });
    if (createPayments <= 0) {
      return responseStatus(res, 400, "failed", "there are no changes");
    }
    responseStatus(res, 200, "success", "Created BookTours");
  }
  async detailBooking(id, res) {
    let booking = await Booking.findById(id)
      .populate([
        ({
          path: "tour_id",
        },
        {
          path: "user_id",
        },
        {
          path: "guide_id",
        }),
      ])
      .lean()
      .exec();
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
    return responseStatus(res, 402, "failed", "This booking does not exist");
  }

  async getBookings(res) {
    let results = await Booking.find()
      .populate({
        path: "tour_id",
        select: "city",
      })
      .populate({
        path: "user_id",
        select: "username",
      })
      .select("_guide_id")
      .lean()
      .exec();
    if (results.length > 0) {
      return responseStatus(res, 200, "success", results);
    }
    return responseStatus(
      res,
      402,
      "failed",
      "There are currently no booking available"
    );
  }
}

module.exports = new BookingService();
