const {
  checkPasswordStrength,
  checkUsername,
  verifyToken,
} = require("../../controllers/auth/auth.method");
const userService = require("../../services/auth/user.service");
const otpService = require("../../services/auth/otp.service");
const { responseStatus } = require("../../utils/handler");
const { _tokenSecret } = require("../../utils/secretKey");

class AuthMiddleware {
  async inputInfoUser(req, res, next) {
    let {
      firstName,
      lastName,
      username,
      password,
      address,
      phone,
      email,
      age,
      city,
      createdAt,
      updatedAt,
    } = req.body;

    try {
      if (
        !["Medium difficulty", "Difficult", "Extremely difficult"].includes(
          checkUsername(username).strength
        )
      ) {
        return res.json({
          error:
            "Username: " +
            checkUsername(username).strength +
            ". " +
            checkUsername(username).tips,
        });
      }
      if (
        !["Medium difficulty", "Difficult", "Extremely difficult"].includes(
          checkPasswordStrength(password).strength
        )
      ) {
        return res.json({
          error:
            "Password: " +
            checkPasswordStrength(password).strength +
            ". " +
            checkPasswordStrength(password).tips,
        });
      }

      if (typeof firstName !== "string" || typeof lastName !== "string") {
        return res.json("firstName or lastName is not valid");
      }
      if (typeof phone !== "string") {
        return res.json({ Error: "type of phoneNumber must be string" });
      }
      const numericAge = Number(age);
      if (isNaN(numericAge)) {
        return res.json({ Error: "type of age must be number " });
      }
      if (typeof address !== "string") {
        return res.json({ Error: "type of address must be string" });
      }
      if (typeof email !== "string" || !email.includes("@")) {
        return res.json("Error: type of email must be string and include '@'");
      }
      req.user = req.body;
      next();
    } catch (err) {
      return err;
    }
  }

  async authorization(req, res, next) {
    const authorizationToken = req.headers["token"];
    if (!authorizationToken) {
      responseStatus(res, 401, "failed", "Invalid authorization!");
    }
    try {
      const verified = await verifyToken(authorizationToken, _tokenSecret);
      if (!verified) {
        responseStatus(res, 403, "failed", "You do not have access!");
      }
      const payload = {
        username: verified.payload,
      };
      req.user = payload;
      next();
    } catch (error) {
      responseStatus(res, 403, "failed", "Failed to authenticate token.");
    }
  }

  async roleUser(req, res, next) {
    try {
      let role = await userService.userRole(req.user.username, res);
      if (role.role_id.name === "Traveler" || "Guide") {
        req.user = role;
        next();
      } else {
        responseStatus(
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
        next();
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
