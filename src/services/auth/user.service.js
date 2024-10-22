const User = require("../../models/user.model");

const { _tokenLife, _tokenSecret } = require("../../utils/secretKey");
const { comparePassword } = require("../../utils/hashHelper");
const {
  nowDate,
  generateToken,
} = require("../../controllers/auth/auth.method");
const { responseStatus } = require("../../utils/handler");

class UserService {
  async userRole(username, res) {
    let getUserRole = await User.aggregate([
      {
        $match: {
          username: username,
        },
      },
      {
        $lookup: {
          from: "roles",
          pipeline: [{ $project: { name: 1 } }],
          as: "role",
        },
      },
      {
        $project: {
          "role.name": 1,
        },
      },
    ]);

    if (!getUserRole || getUserRole.length === 0) {
      return responseStatus(res, 400, "failed", "You have not role");
    }
    return getUserRole;
  }

  async getAllUsers(res) {
    let users = await User.find();
    if (!users || users.length === 0) {
      return responseStatus(res, 400, "failed", "No users found");
    }
    return responseStatus(res, 200, "success", users);
  }
  async saveUser(param, password, res) {
    let userCheck = await User.findOne({ username: param.username });
    if (userCheck) {
      return responseStatus(res, 402, "failed", "User already exists");
    }

    let userCreated = await User.create({
      username: param.username,
      firstName: param.firstName,
      lastName: param.lastName,
      password: password,
      address: param.address,
      phoneNumber: param.phoneNumber,
      email: param.email,
      age: param.age,
      city: param.city,
      role_id: param.role_id,
      createdAt: nowDate(),
      updatedAt: nowDate(),
    });

    return responseStatus(res, 200, "success", "Signup successful");
  }

  async profile(username, res) {
    let userInfo = await User.findOne({ username: username });
    if (!userInfo) {
      return responseStatus(res, 402, "failed", "Not found your profile");
    }
    return responseStatus(res, 200, "success", userInfo);
  }

  async findUser(username, password, res) {
    let user = await User.findOne({ username: username });
    if (!user) {
      return responseStatus(res, 402, "failed", "Enter a valid username");
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
    const dataForAccessToken = user.username;
    const accessToken = await generateToken(
      dataForAccessToken,
      _tokenSecret,
      _tokenLife
    );
    return responseStatus(res, 200, "success", accessToken);
  }
}

module.exports = new UserService();
