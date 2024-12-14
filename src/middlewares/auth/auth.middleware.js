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
        username: verified.payload.username,
        id: verified.payload.id,
      };
      req.user = payload;
      req.token = authorizationToken;
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
      if (role.role_id.name === "Traveler" || role.role_id.name === "Guide") {
        req.user = role;
        return next();
      } else {
        throw new Error("Access Denied. Traveler or Guide only route!");
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
  async isAuth(req, res, next) {
    const { username } = req.body;
    if (!username) {
      return responseStatus(res, 400, "failed", "Username is required");
    }
    try {
      let role = await userService.userRole(username, res);
      if (role.role_id.name === "Traveler" || role.role_id.name === "Guide") {
        req.user = username;
        return next();
      } else {
        throw new Error("Only Traveler or Guide can log in!");
      }
    } catch (error) {
      responseStatus(res, 400, "failed", error.message);
    }
  }
}

module.exports = new AuthMiddleware();
