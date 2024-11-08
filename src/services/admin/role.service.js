const Role = require("../../models/role.model");
const { nowDate } = require("../../controllers/auth/auth.method");
const { responseStatus } = require("../../utils/handler");

class RoleService {
  async saveRole(nameRole, res) {
    let roleExists = await Role.findOne({ name: nameRole });
    if (roleExists) {
      return responseStatus(res, 402, "failed", "Role already exists");
    }
    let roleCreated = await Role.create({
      name: nameRole,
      createdAt: nowDate(),
    });
    if (!roleCreated) {
      return;
    }
    return responseStatus(res, 200, "success", "Create role successful");
  }

  async roleList(res) {
    let roles = await Role.find();
    if (roles.length === 0) {
      return responseStatus(res, 402, "failed", "Role already exists");
    }
    return responseStatus(res, 200, "success", roles);
  }

  async updateRole(req, res) {
    let update = await Role.updateOne(
      { _id: value.id },
      { $set: { name: value.nameRole } }
    );
    console.log(update);
    if (update) {
      return responseStatus(res, 402, "failed", "Role already exists");
    }
    return responseStatus(res, 200, "success", "Updated role");
  }
}

module.exports = new RoleService();
