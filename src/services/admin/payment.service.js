const Payment = require("../../models/payment.model");
const { nowDate } = require("../../utils/formatDate");
const { responseStatus } = require("../../globals/handler");
class PaymentService {
  async getAllPayment(cursor, direction, res) {
    let limit = 6;
    let query = {};

    if (direction === "next" && cursor) {
      query._id = { $gt: cursor };
    } else if (direction === "prev" && cursor) {
      query._id = { $lt: cursor };
    }

    let paymentList = await Payment.find(query)
      .populate("user_id", "fullName -_id")
      .sort({ createAt: -1 })
      .limit(Number(limit))
      .lean()
      .exec();

    if (!paymentList || paymentList.length === 0) {
      return responseStatus(
        res,
        400,
        "failed",
        "There are currently no payments available"
      );
    }
    const nextCursor =
      paymentList.length > 0 ? paymentList[paymentList.length - 1]._id : null;
    const prevCursor = paymentList.length > 0 ? paymentList[0]._id : null;

    const results = {
      nextCursor,
      prevCursor,
      totalResults: paymentList.length,
      paymentList,
    };
    return responseStatus(res, 200, "success", results);
  }
  async createPayment(payments, res) {
    let save = await Payment.insertMany(payments);
    if (save.length > 0) {
      return responseStatus(res, 200, "success", "Created Payment");
    }
    return responseStatus(res, 402, "failed", "No change");
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
