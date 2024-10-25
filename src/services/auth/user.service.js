const User = require("../../models/user.model");
const CurriculumVitae = require("../../models/curriculumVitae.model");
const { _tokenLife, _tokenSecret } = require("../../utils/secretKey");
const { comparePassword } = require("../../utils/hashHelper");
const {
  nowDate,
  generateToken,
} = require("../../controllers/auth/auth.method");
const { responseStatus } = require("../../utils/handler");

class UserService {
  async userRole(username, res) {
    let getUserRole = await User.findOne({ username: username });
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
      role: param.role,
      createdAt: nowDate(),
    });
    if (!userCreated) {
      return responseStatus(res, 402, "failed", "User already exists");
    }
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
    let accessToken = await generateToken(
      dataForAccessToken,
      _tokenSecret,
      _tokenLife
    );
    return responseStatus(res, 200, "success", accessToken);
  }
  async profile(username, res) {
    let userInfo = await User.findOne({ username: username });
    if (!userInfo) {
      return responseStatus(res, 402, "failed", "Not found your profile");
    }
    return responseStatus(res, 200, "success", userInfo);
  }
  async myCurriculumVitae(id, res) {
    let myCv = await CurriculumVitae.findOne({
      user_id: id,
    });
    if (!myCv || myCv.length === 0) {
      return responseStatus(res, 400, "failed", "No users found");
    }
    return responseStatus(res, 200, "success", myCv);
  }
  async createCurriculumVitae(info, id, res) {
    
    const educations = info.education.map((value) => {
      return value;
    });
    let infoDetails = info.personal_details;
    let infoSkills = info.skills;

    let createCv = await CurriculumVitae.create({
      user_id: id,
      personal_details: {
        name: infoDetails.name,
        address: infoDetails.address,
        email: infoDetails.email,
        phone: infoDetails.phoneNumber,
        github: infoDetails.github,
        website: infoDetails.website,
      },
      education: educations,
      skills: infoSkills,
    });

    if (!createCv) {
      return responseStatus(res, 402, "failed", "Enter complete information");
    }
    return responseStatus(res, 200, "success", "Upload completed successfully");
  }
}

module.exports = new UserService();
