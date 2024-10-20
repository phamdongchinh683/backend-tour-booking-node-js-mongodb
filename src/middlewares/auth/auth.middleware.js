const {
  checkPasswordStrength,
  checkUsername,
} = require("../../controllers/auth/auth.method");

class AuthMiddleware {
  async inputInfoUser(req, res, next) {
    let {
      firstName,
      lastName,
      username,
      password,
      address,
      phoneNumber,
      email,
      age,
      city,
      createdAt,
      updatedAt,
    } = req.body;

    try {
      if (
        !["Medium difficulty", "Difficult", "Extremely difficult"].includes(
          checkUsername(username).strength
        )
      ) {
        return res.json({
          error:
            "Username: " +
            checkUsername(username).strength +
            ". " +
            checkUsername(username).tips,
        });
      }
      if (
        !["Medium difficulty", "Difficult", "Extremely difficult"].includes(
          checkPasswordStrength(password).strength
        )
      ) {
        return res.json({
          error:
            "Password: " +
            checkPasswordStrength(password).strength +
            ". " +
            checkPasswordStrength(password).tips,
        });
      }

      if (typeof firstName !== "string" || typeof lastName !== "string") {
        return res.json("firstName or lastName is not valid");
      }
      if (typeof phoneNumber !== "string") {
        return res.json({ Error: "type of phoneNumber must be string" });
      }
      const numericAge = Number(age);
      if (isNaN(numericAge)) {
        return res.json({ Error: "type of age must be number " });
      }
      if (typeof address !== "string") {
        return res.json({ Error: "type of address must be string" });
      }
      if (typeof email !== "string" || !email.includes("@")) {
        return res.json("Error: type of email must be string and include '@'");
      }
      req.user = req.body;
      next();
    } catch (err) {
      return err;
    }
  }

}

module.exports = new AuthMiddleware();
