const Joi = require("joi");
const { responseStatus } = require("../utils/handler");

module.exports = infoUser = async (req, res, next) => {
  const correctCondition = Joi.object({
    username: Joi.string().min(8).max(30).trim().strict().required().messages({
      "any.required": "Username is required",
      "string.empty": "Username cannot be an empty field",
      "string.min": "Username length must be at least 8 characters long",
      "string.max": "The maximum length of a username is 30",
      "string.trim": "Username must not have leading or trailing whitespace",
    }),
    password: Joi.string().min(10).max(60).trim().strict().required().messages({
      "any.required": "Password is required",
      "string.empty": "Password cannot be an empty field",
      "string.min": "Password length must be at least 10 characters long",
      "string.max": "The maximum length of a password is 60",
    }),
    firstName: Joi.string().min(2).max(60).trim().strict().required().messages({
      "any.required": "First name is required",
      "string.empty": "First name cannot be an empty field",
      "string.min": "First name must be at least 2 characters long",
      "string.max": "First name cannot exceed 60 characters",
    }),
    lastName: Joi.string().min(2).max(60).trim().strict().required().messages({
      "any.required": "Last name is required",
      "string.empty": "Last name cannot be an empty field",
      "string.min": "Last name must be at least 2 characters long",
      "string.max": "Last name cannot exceed 60 characters",
    }),
    age: Joi.number().min(10).required().messages({
      "any.required": "Age is required",
      "number.base": "Age must be a number",
      "number.min": "Age must be at least 10",
    }),
    city: Joi.string().min(2).max(30).trim().strict().required().messages({
      "any.required": "City is required",
      "string.empty": "City cannot be an empty field",
      "string.min": "City must be at least 2 characters long",
      "string.max": "City cannot exceed 30 characters",
    }),
    email: Joi.string()
      .email()
      .pattern(/^[\w.-]+@[a-zA-Z\d-]+\.(com|edu|net|org|gov)$/)
      .required()
      .messages({
        "any.required": "Email is required",
        "string.email": "Email must be a valid email address",
        "string.pattern.base":
          "Email must be a valid address ending in .com, .edu, .net, .org, or .gov",
      }),
    phone: Joi.string()
      .pattern(/^[0-9]{10,15}$/)
      .required()
      .messages({
        "any.required": "Phone number is required",
        "string.pattern.base":
          "Phone number must contain only digits and be 10-15 characters long",
      }),
    role: Joi.string().valid("Traveler", "Guide", "Admin").required().messages({
      "any.required": "Role is required",
      "any.only": "Role must be one of traveler, guide, or moderator",
    }),
  });

  try {
    const value = await correctCondition.validateAsync(req.body, {
      abortEarly: false,
    });

    req.user = value;

    next();
  } catch (error) {
    const errorDetail = error.details.map((err) => err.message).join(", ");

    return responseStatus(res, 422, "failed", errorDetail);
  }
};

module.exports = {
  infoUser,
};
