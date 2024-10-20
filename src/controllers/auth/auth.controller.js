const userService = require("../../services/auth/user.service");
const { responseStatus } = require("../../controllers/auth/auth.method");

class AuthController {
  async signUp(req, res) {
    const hashPassword = await hashPassword(req.user.password);
    try {
      await userService.saveUser(req.user, hashPassword, res);
    } catch (e) {
      responseStatus(res, 400, "failed", e.message);
    }
  }
  async login(req, res) {
    const { username, password } = req.body;
    try {
      await userService.findUser(username, password, res);
    } catch (e) {
      responseStatus(res, 400, "failed", e.message);
    }
  }
}

module.exports = new AuthController();
