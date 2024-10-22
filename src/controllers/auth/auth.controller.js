const UserService = require("../../services/auth/user.service");
const roleService = require("../../services/auth/role.service");
const { responseStatus } = require("../../utils/handler");
const { hashPassword } = require("../../utils/hashHelper");
class AuthController {
  async signUp(req, res) {
    const password = await hashPassword(req.user.password);
    try {
      await UserService.saveUser(req.user, password, res);
    } catch (e) {
      responseStatus(res, 400, "failed", e.message);
    }
  }
  async login(req, res) {
    const { username, password } = req.body;
    try {
      await UserService.findUser(username, password, res);
    } catch (e) {
      responseStatus(res, 400, "failed", e.message);
    }
  }

  async getProfile(req, res) {
    try {
      await UserService.profile(req.user.username, res);
    } catch (e) {
      responseStatus(res, 400, "failed", e.message);
    }
  }

  // manage
  async userList(req, res) {
    try {
      await UserService.getAllUsers(res);
    } catch (e) {
      responseStatus(res, 400, "failed", e.message);
    }
  }

  async createRole(req, res) {
    const { nameRole } = req.body;
    try {
      await roleService.createRole(nameRole, res);
    } catch (e) {
      responseStatus(res, 400, "failed", e.message);
    }
  }
}

module.exports = new AuthController();
