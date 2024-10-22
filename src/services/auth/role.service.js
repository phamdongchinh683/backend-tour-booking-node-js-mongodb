const Role = require("../../models/role.model");
const { nowDate } = require("../../controllers/auth/auth.method");
const { responseStatus } = require("../../utils/handler");

class RoleService {
  async createRole(nameRole, res) {
    let roleExists = await Role.findOne({ name: nameRole });
    if (roleExists) {
      return responseStatus(res, 402, "failed", "Role already exists");
    }
    let roleCreated = await Role.create({
      name: nameRole,
      createdAt: nowDate(),
      updatedAt: nowDate(),
    });
    return responseStatus(res, 200, "success", "Create role successful");
  }
}

module.exports = new RoleService();
