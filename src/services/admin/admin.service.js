const { nowDate } = require("../../utils/formatDate");
const { responseStatus } = require("../../globals/handler");
const { hashPassword } = require("../../utils/hashHelper");
const User = require("../../models/user.model");
const Role = require("../../models/role.model");
class AdminService {
  async isAdmin(username, res) {
    let getRole = await User.find({ username: username })
      .select("role_id")
      .populate("role_id", "name")
      .lean();
    if (getRole.length === 0) {
      throw new Error("This account does not exist");
    }
    return getRole[0];
  }
  async getRoleIdByName(roleName) {
    const role = await Role.findOne({ name: roleName }).lean();
    if (!role) {
      throw new Error(`Role "${roleName}" not found`);
    }
    return role._id;
  }
  async adminRole(username, res) {
    let getRole = await User.findOne({ username: username })
      .select("role_id")
      .populate("role_id", "name")
      .lean();
    if (!getRole) {
      return responseStatus(res, 400, "failed", "You have not role");
    }
    return getRole;
  }
  async getAllUsers(cursor, direction = "next", res) {
    let limit = 5;
    let query = {};

    if (direction === "next" && cursor) {
      query._id = { $gt: cursor };
    } else if (direction === "prev" && cursor) {
      query._id = { $lt: cursor };
    }

    let users = await User.find(query)
      .select("-reviews")
      .sort({ createAt: -1 })
      .limit(Number(limit))
      .lean()
      .exec();

    if (!users || users.length === 0) {
      return responseStatus(
        res,
        400,
        "failed",
        "There are currently no users available"
      );
    }
    const nextCursor = users.length > 0 ? users[users.length - 1]._id : null;
    const prevCursor = users.length > 0 ? users[0]._id : null;

    const results = {
      nextCursor,
      prevCursor,
      totalResults: users.length,
      users,
    };
    return responseStatus(res, 200, "success", results);
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
          role_id: value.role_id,
          createdAt: nowDate(),
        };
      })
    );

    let userCreated = await User.insertMany(users, { ordered: false });
    if (!userCreated) {
      return responseStatus(res, 402, "failed", "Users already exists");
    }
    return responseStatus(res, 200, "success", "Created");
  }
  async userDetailById(id, res) {
    let user = await User.findById(id).populate("reviews").lean().exec();
    if (!user) {
      return responseStatus(res, 400, "failed", "Not Found");
    } else {
      return responseStatus(res, 200, "success", user);
    }
  }
  async updateUser(info, res) {
    const [hashedPassword] = await hashPassword(info.password);
    const result = await User.updateOne(
      { _id: info.id },
      {
        $set: {
          password: hashedPassword,
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
          role_id: info.role_id,
          updateAt: nowDate(),
        },
      }
    );
    if (result.matchedCount === 0) {
      return responseStatus(res, 400, "failed", "No users were updated");
    } else {
      return responseStatus(res, 200, "success", "Users updated successfully");
    }
  }
  async deleteUsers(list, res) {
    let deleteUsers = await User.deleteMany({ _id: { $in: list } });
    if (deleteUsers.deletedCount > 0) {
      return responseStatus(res, 200, "success", "Deleted");
    }
    return responseStatus(res, 400, "failed", "No users were deleted");
  }
  async getAllGuides(res) {
    let roleGuide = await Role.findOne({ name: "Guide" }).lean();
    if (!roleGuide) {
      return responseStatus(res, 400, "failed", "Role guide not found");
    }
    let getAllGuides = await User.find({ role_id: roleGuide._id })
      .select("-password -__v -age -city -username")
      .populate("role_id", "name")
      .lean();
    if (!getAllGuides || getAllGuides.length === 0) {
      return responseStatus(res, 400, "failed", "No guides found");
    }
    return responseStatus(res, 200, "success", getAllGuides);
  }

  async userList(res) {
    let users = await User.find().lean().exec();
    if (!users || users.length === 0) {
      return responseStatus(res, 400, "failed", "No users in the list");
    }
    return responseStatus(res, 200, "success", users);
  }
}

module.exports = new AdminService();
