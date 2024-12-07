const { nowDate } = require("../../controllers/auth/auth.method");
const Reservation = require("../../models/reservation.model");
const { responseStatus } = require("../../utils/handler");
class ReservationService {
  async getAllReservation(res) {
    let reservations = await Reservation.find()
      .populate({ path: "user_id" }, { path: "service_id" })
      .lean()
      .exec();
    if (reservations.length === 0) {
      return responseStatus(
        res,
        402,
        "failed",
        "There are currently no listings"
      );
    }
    return responseStatus(res, 200, "success", reservations);
  }
  async createReservation(info, res) {
    let save = await Reservation.create({
      user_id: info.user_id,
      service_id: info.service_id,
      numberPeople: info.numberPeople,
      date: info.date,
      createdAt: nowDate(),
    });
    if (save) {
      return responseStatus(res, 200, "success", "Created reservation");
    }
  }
  async detailReservation(id, res) {
    let reservation = await Reservation.findById(id)
      .populate({ path: "user_id" }, { path: "service_id" })
      .lean()
      .exec();
    if (!reservation) {
      return responseStatus(
        res,
        402,
        "failed",
        "There are currently no listings"
      );
    }
    return responseStatus(res, 200, "success", reservation);
  }
  async updateReservation(id, info, res) {
    let update = await Reservation.findByIdAndUpdate(id, {
      user_id: info.user_id,
      service_id: info.service_id,
      numberPeople: info.numberPeople,
      date: info.date,
      updatedAt: nowDate(),
    });
    if (!update) {
      return responseStatus(res, 402, "failed", "No changes were made");
    }
    return responseStatus(res, 200, "success", "Updated this reservation");
  }
  async deleteReservations(list, res) {
    let remove = await Reservation.deleteMany({ _id: { $in: list } });
    if (remove.deletedCount > 0) {
      return responseStatus(res, 200, "success", "Deleted reservation");
    }
    return responseStatus(
      res,
      402,
      "failed",
      "This reservation does not exist"
    );
  }
}

module.exports = new ReservationService();
