const Payment = require("../../models/payment.model");
const { nowDate } = require("../../controllers/auth/auth.method");
const { responseStatus } = require("../../utils/handler");
class PaymentService {
  async getAllPayment(res) {
    let paymentList = await Payment.find()
      .populate("user_id", "fullName -_id")
      .lean()
      .exec();
    if (paymentList.length === 0) {
      return responseStatus(
        res,
        402,
        "failed",
        "There are currently no listings"
      );
    }
    return responseStatus(res, 200, "success", paymentList);
  }
  async createPayment(info, res) {
    let save = await Payment.create({
      booking_id: info.bookingId,
      user_id: info.userId,
      status: info.status,
      card_number: info.cardNumber,
      total_amount: info.totalAmount,
      createAt: nowDate(),
    });
    if (save) {
      return responseStatus(res, 200, "success", "Created Payment");
    }
  }
  async detailPayment(id, res) {
    let payment = await Payment.findById(id)
      .populate("user_id", "fullName -_id")
      .lean()
      .exec();
    if (payment) {
      return responseStatus(res, 200, "success", payment);
    }
  }
  async updatePayment(id, info, res) {
    let update = await Payment.findByIdAndUpdate(id, {
      booking_id: info.bookingId,
      user_id: info.userId,
      status: info.status,
      card_number: info.cardNumber,
      total_amount: info.totalAmount,
      updateAt: nowDate(),
    });

    if (!update) {
      return responseStatus(res, 402, "failed", "No changes were made");
    }
    return responseStatus(res, 200, "success", "Updated this Payment");
  }
  async deletePayments(ids, res) {
    let remove = await Blog.deleteMany({ _id: { $in: ids } });
    if (remove.deletedCount > 0) {
      return responseStatus(res, 200, "success", "Deleted this Payment ");
    }
    return responseStatus(res, 402, "failed", "This Payment does not exist");
  }
}

module.exports = new PaymentService();
