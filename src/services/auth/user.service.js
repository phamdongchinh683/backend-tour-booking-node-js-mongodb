const bcrypt = require("bcrypt");
const User = require("../../models/user.model");

const { _tokenLife, _tokenSecret } = require("../../utils/secretKey");
const { comparePassword } = require("../../utils/hashHelper");
const {
  nowDate,
  responseStatus,
  generateToken,
} = require("../../controllers/auth/auth.method");

class UserService {
  async saveUser(param, password, res) {
    let userCheck = await User.findOne({ username: param.username });
    if (userCheck) {
      return responseStatus(res, 402, "failed", "User already exists");
    }
    console.log(userCheck);
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
      createdAt: nowDate(),
      updatedAt: nowDate(),
    });
    return responseStatus(res, 200, "success", "Signup successful");
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
