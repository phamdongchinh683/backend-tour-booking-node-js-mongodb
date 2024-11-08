const { nowDate } = require("../../controllers/auth/auth.method");
const { responseStatus } = require("../../utils/handler");
const { hashPassword } = require("../../utils/hashHelper");

const User = require("../../models/user.model");
const Role = require("../../models/role.model");
class AdminService {
  async getRoleIdByName(roleName) {
    const role = await Role.findOne({ name: roleName }).lean();
    if (!role) {
      throw new Error(`Role "${roleName}" not found`);
    }
    return role._id;
  }

  // role
  async adminRole(username, res) {
    let getRole = await User.findOne({ username: username })
      .select("role_id")
      .populate("role_id", "name")
      .lean();
    if (!getRole) {
      return responseStatus(res, 400, "failed", "You have not role");
    }
    return getRole.role_id.name;
  }

  //manage user
  async getAllUsers(res) {
    let users = await User.find();
    if (!users || users.length === 0) {
      return responseStatus(res, 400, "failed", "No users found");
    }
    return responseStatus(res, 200, "success", users);
  }

  async saveUsers(info, res) {
    let users = await Promise.all(
      info.map(async (value) => {
        return {
          username: value.username,
          password: await hashPassword(value.password),
          fullName: {
            firstName: value.firstName,
            lastName: value.lastName,
          },
          age: value.age,
          city: value.city,
          contact: {
            email: value.email,
            phone: value.phone,
          },
          role_id: await this.getRoleIdByName(value.role),
          createdAt: nowDate(),
        };
      })
    );

    let userCreated = await User.insertMany(users);
    if (!userCreated) {
      return responseStatus(res, 402, "failed", "Users already exists");
    }
    return responseStatus(res, 200, "success", "Created");
  }

  async updateUser(info, res) {
    const result = await User.updateOne(
      { _id: info.id },
      {
        $set: {
          username: info.username,
          password: await hashPassword(value.password),
          fullName: {
            firstName: info.firstName,
            lastName: info.lastName,
          },
          age: info.age,
          city: info.city,
          contact: {
            email: info.email,
            phone: info.phone,
          },
          role_id: await this.getRoleIdByName(value.role),
          createdAt: nowDate(),
        },
      }
    );

    if (result.modifiedCount > 0) {
      return responseStatus(res, 200, "success", "Users updated successfully");
    } else {
      return responseStatus(res, 400, "failed", "No users were updated");
    }
  }

  async deleteUsers(list, res) {
    let deleteUsers = await User.deleteMany({ _id: { $in: list } });
    if (deleteUsers.modifiedCount > 0) {
      return responseStatus(res, 200, "success", "Deleted");
    }
    return responseStatus(res, 400, "failed", "No users were updated");
  }

  // manage guide
  async getAllGuides(res) {
    let roleGuide = await Role.findOne({ name: "Guide" }).lean();
    if (!roleGuide) {
      return responseStatus(res, 400, "failed", "Role guide not found");
    }
    let getAllGuides = await User.find({ role_id: roleGuide._id })
      .populate("role_id", "name")
      .lean();
    if (!getAllGuides || getAllGuides.length === 0) {
      return responseStatus(res, 400, "failed", "No guides found");
    }
    return responseStatus(res, 200, "success", getAllGuides);
  }
}

module.exports = new AdminService();
