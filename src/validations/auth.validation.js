const Joi = require("joi");
const { responseStatus } = require("../globals/handler");

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
      .pattern(/^[0-9]{11,20}$/)
      .required()
      .messages({
        "any.required": "Phone number is required",
        "string.pattern.base":
          "Phone number must contain only digits and be 11-20 characters long",
      }),
    role: Joi.string().valid("Traveler", "Guide").required().messages({
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

module.exports = inputBookTour = async (req, res, next) => {
  const correctCondition = Joi.object({
    guideId: Joi.string().min(8).max(30).trim().required().messages({
      "any.required": "Guide is required",
      "string.empty": "Guide cannot be an empty field",
      "string.min": "Guide ID must be at least 8 characters long",
      "string.max": "Guide ID cannot exceed 30 characters",
    }),
    numberVisitor: Joi.number().integer().min(1).max(60).required().messages({
      "any.required": "Number of visitors is required",
      "number.base": "Number of visitors must be a number",
      "number.min": "Number of visitors must be at least 1",
      "number.max": "Number of visitors cannot exceed 60",
    }),
    startTour: Joi.string().required().messages({
      "any.required": "Start date is required",
      "date.base": "Start date must be a valid date",
    }),
    startTime: Joi.string().required().messages({
      "any.required": "Start time is required",
      "date.base": "End time must be a valid date",
    }),
    endTime: Joi.string().required().messages({
      "any.required": "End time is required",
      "date.base": "End time must be a valid date",
    }),
    status: Joi.number().integer().valid(0, 1).required().messages({
      "any.required": "Status is required",
      "number.base": "Status must be a number",
      "any.only": "Status must be either 0 or 1",
    }),
    cardNumber: Joi.string().min(8).max(30).trim().required().messages({
      "any.required": "Card number is required",
      "string.empty": "Card number cannot be an empty field",
      "string.min": "Card number must be at least 8 characters long",
      "string.max": "Card number cannot exceed 30 characters",
    }),
    totalAmount: Joi.number().positive().required().messages({
      "any.required": "Total amount is required",
      "number.base": "Total amount must be a number",
      "number.positive": "Total amount must be a positive number",
    }),
  });

  try {
    const value = await correctCondition.validateAsync(req.body, {
      abortEarly: false,
    });

    payload = req.user;
    req.user = payload;
    req.infoBook = value;

    next();
  } catch (error) {
    const errorDetail = error.details.map((err) => err.message).join(",");
    return responseStatus(res, 422, "failed", errorDetail);
  }
};

module.exports = inputBlog = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().min(8).max(40).trim().required().messages({
      "any.required": "title is required",
      "string.empty": "title cannot be an empty field",
      "string.min": "title must be at least 8 characters long",
      "string.max": "title cannot exceed 40 characters",
    }),
    content: Joi.string().min(1).max(60).required().messages({
      "any.required": "Number of visitors is required",
      "number.base": "Number of visitors must be a number",
      "number.min": "Number of visitors must be at least 1",
      "number.max": "Number of visitors cannot exceed 60",
    }),
    images: Joi.array().required().messages({
      "any.required": "images is required",
      "any.required": "Please upload a image date is required",
    }),
  });

  try {
    const value = await correctCondition.validateAsync(req.body, {
      abortEarly: false,
    });
    payload = req.user;
    req.user = payload;
    req.value = value;
    next();
  } catch (error) {
    const errorDetail = error.details.map((err) => err.message).join(", ");

    return res.status(422).json({ status: "failed", message: errorDetail });
  }
};

module.exports = inputEmailOtp = async (req, res, next) => {
  const correctCondition = Joi.object({
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
  });
  try {
    const value = await correctCondition.validateAsync(req.body, {
      abortEarly: false,
    });

    payload = req.user;
    req.user = payload;
    req.value = value;

    next();
  } catch (error) {
    const errorDetail = error.details.map((err) => err.message).join(", ");
    return responseStatus(res, 422, "failed", errorDetail);
  }
};

module.exports = inputComment = async (req, res, next) => {
  const correctCondition = Joi.object({
    comment: Joi.string().max(40).trim().required().messages({
      "any.required": "comment is required",
      "string.empty": "comment cannot be an empty field",
      "string.max": "comment cannot exceed 99 characters",
    }),
  });
  try {
    const value = await correctCondition.validateAsync(req.body, {
      abortEarly: false,
    });

    payload = req.user;
    req.user = payload;
    req.value = value;

    next();
  } catch (error) {
    const errorDetail = error.details.map((err) => err.message).join(", ");
    return responseStatus(res, 422, "failed", errorDetail);
  }
};

module.exports = {
  infoUser,
  inputBookTour,
  inputBlog,
  inputEmailOtp,
  inputComment,
};
