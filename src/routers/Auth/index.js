const express = require("express");
const router = express.Router();
const authController = require("../../controllers/auth/auth.controller");
const authMiddleware = require("../../middlewares/auth/auth.middleware");

router.post("/sign-up", authMiddleware.inputInfoUser, authController.signUp);
router.get("/login", authController.login);

router.get(
  "/profile",
  authMiddleware.authorization,
  authMiddleware.roleUser,
  authController.getProfile
);

router.get(
  "/my-curriculum-vitae",
  authMiddleware.authorization,
  authMiddleware.roleUser,
  authController.getCurriculumVitae
);

router.post(
  "/my-curriculum-vitae/add-curriculum-vitae",
  authMiddleware.authorization,
  authMiddleware.roleUser,
  authController.addCurriculumVitae
);

router.get(
  "/tour-list",
  authMiddleware.authorization,
  authMiddleware.roleUser,
  authController.getTour
);

router.post(
  "/create-tour",
  authMiddleware.authorization,
  authMiddleware.roleUser,
  authController.addTour
);

router.post("/send-otp", authController.forgotPassword);

router.post(
  "/new-password",
  authMiddleware.verifyOtp,
  authController.newPassword
);

router.get("/user-list", authController.userList);
router.post("/create-role", authController.createRole);

module.exports = router;
