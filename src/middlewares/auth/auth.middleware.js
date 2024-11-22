const userService = require("../../services/auth/user.service");
const otpService = require("../../services/auth/otp.service");
const { responseStatus } = require("../../utils/handler");
const { verifyToken } = require("../../utils/verifyToken");
const { _tokenSecret } = require("../../utils/secretKey");

class AuthMiddleware {
  async authorization(req, res, next) {
    const authorizationToken = req.headers["token"];
    if (!authorizationToken) {
      return responseStatus(res, 401, "failed", "Invalid authorization!");
    }
    try {
      const verified = await verifyToken(authorizationToken, _tokenSecret);
      if (!verified) {
        return responseStatus(res, 403, "failed", "You do not have access!");
      }
      const payload = {
        username: verified.payload,
      };
      req.user = payload;
      next();
    } catch (error) {
      return responseStatus(
        res,
        403,
        "failed",
        "Failed to authenticate token."
      );
    }
  }

  async roleUser(req, res, next) {
    try {
      let role = await userService.userRole(req.user.username, res);
      if (role.role_id.name === "Traveler" || "Guide") {
        req.user = role;
        return next();
      } else {
        return responseStatus(
          res,
          403,
          "failed",
          "Access Denied. Traveler only route!"
        );
      }
    } catch (error) {
      responseStatus(res, 400, "failed", error.message);
    }
  }
  async verifyOtp(req, res, next) {
    const { otp } = req.body;
    try {
      let verify = await otpService.verifyOtp(otp, res);
      if (verify) {
        req.user = verify;
        return next();
      }
    } catch (e) {
      responseStatus(res, 400, "failed", e.message);
    }
  }
  async createTour(req, res, next) {
    let tourId = req.params.tourId;
    let userId = req.user._id;
    let { guideId, numberVisitor, startTour, startTime, endTime } = req.body;
    try {
      let infoBook = {
        userId,
        tourId,
        guideId,
        numberVisitor,
        startTour,
        startTime,
        endTime,
      };
      req.infoBook = infoBook;
      next();
    } catch (e) {
      responseStatus(res, 400, "failed", e.message);
    }
  }
}

module.exports = new AuthMiddleware();

