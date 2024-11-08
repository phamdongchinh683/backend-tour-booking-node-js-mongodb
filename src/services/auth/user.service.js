const User = require("../../models/user.model");
const Role = require("../../models/role.model");

const { _tokenLife, _tokenSecret } = require("../../utils/secretKey");
const { comparePassword } = require("../../utils/hashHelper");
const {
  nowDate,
  generateToken,
} = require("../../controllers/auth/auth.method");
const { responseStatus } = require("../../utils/handler");

class UserService {
  async getRoleIdByName(roleName) {
    const role = await Role.findOne({ name: roleName }).lean();
    if (!role) {
      throw new Error(`Role "${roleName}" not found`);
    }
    return role._id;
  }
  async userRole(username, res) {
    let getRole = await User.findOne({ username: username })
      .select("role_id")
      .populate("role_id", "name")
      .lean();
    if (!getRole) {
      return responseStatus(res, 400, "failed", "You have not role");
    }
    return getRole.role_id.name;
  }

  async saveUser(param, password, res) {
    const roleId = await this.getRoleIdByName(param.role).lean();

    let userCreated = await User.create({
      username: param.username,
      password: password,
      images: param.images,
      fullName: {
        firstName: param.firstName,
        lastName: param.lastName,
      },
      age: param.age,
      city: param.city,
      contact: {
        email: param.email,
        phone: param.phone,
      },
      role_id: roleId,
      createdAt: nowDate(),
    });
    if (!userCreated) {
      return responseStatus(res, 402, "failed", "User already exists");
    }
    return responseStatus(res, 200, "success", "Signup successful");
  }
  async findUser(username, password, res) {
    let user = await User.findOne({ username: username }).lean();
    if (!user) {
      return responseStatus(
        res,
        402,
        "failed",
        "Username you entered isn't connected to an account."
      );
    }

    const passwordMatch = await comparePassword(password, user.password);

    if (!passwordMatch) {
      return responseStatus(
        res,
        404,
        "failed",
        "The password that you've entered is incorrect."
      );
    }
    const paramForAccessToken = user.username;
    let accessToken = await generateToken(
      paramForAccessToken,
      _tokenSecret,
      _tokenLife
    );
    return responseStatus(res, 200, "success", accessToken);
  }
  async profile(username, res) {
    let userInfo = await User.findOne({ username: username }).lean();
    if (!userInfo) {
      return responseStatus(res, 402, "failed", "Not found your profile");
    }
    return responseStatus(res, 200, "success", userInfo);
  }
  async newPasswordByOtp(email, newPassword, res) {
    let updatePassword = await User.updateOne(
      { email: email },
      { $set: { password: newPassword } }
    );
    if (!updatePassword) {
      return responseStatus(res, 402, "failed", "Update failed");
    }
    return responseStatus(
      res,
      200,
      "success",
      "New password updated successfully"
    );
  }
}

module.exports = new UserService();
