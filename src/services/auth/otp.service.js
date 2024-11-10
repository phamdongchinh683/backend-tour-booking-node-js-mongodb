const { nowDate } = require("../../controllers/auth/auth.method");
const { responseStatus } = require("../../utils/handler");
const { generateOtp } = require("../../utils/generateOtp");
const { mailSender } = require("../../utils/mailSender");
const Otp = require("../../models/otp.model");

class OtpService {
  async sendOtp(email, res) {
    const otp = generateOtp();
    let createOtp = await Otp.create({
      email: email,
      otp: otp,
      createdAt: nowDate(),
    });
    if (!createOtp) {
      return responseStatus(res, 402, "failed", "Not found my email address");
    } else {
      let emailContent = {
        email: email,
        title: "Reset password for account",
        message: `<p>Your OTP is: <strong>${otp}</strong></p>`,
      };
      await mailSender(emailContent, res);
    }
  }
  async verifyOtp(otp, res) {
    let checkOtp = await Otp.find({ otp: otp }, { email: 1, _id: 0 }).lean();
    if (checkOtp.length === 0) {
      return responseStatus(res, 402, "failed", "Invalid otp");
    }
    return checkOtp[0].email;
  }
}

module.exports = new OtpService();
