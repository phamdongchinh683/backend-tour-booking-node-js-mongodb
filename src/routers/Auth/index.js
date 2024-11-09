const express = require("express");
const router = express.Router();
const authController = require("../../controllers/auth/auth.controller");
const authMiddleware = require("../../middlewares/auth/auth.middleware");
const adminMiddleware = require("../../middlewares/admin/admin.middleware");

router.post("/sign-up", authMiddleware.inputInfoUser, authController.signUp);
router.get("/login", authController.login);

router.get(
  "/profile",
  authMiddleware.authorization,
  authMiddleware.roleUser,
  authController.getProfile
);

router.post(
  "/post-blog",
  authMiddleware.authorization,
  authMiddleware.roleUser,
  authController.postBlog
);

router.get(
  "/my-blogs",
  authMiddleware.authorization,
  authMiddleware.roleUser,
  authController.getAllBlog
);

router.get(
  "/blog/:id",
  authMiddleware.authorization,
  authMiddleware.roleUser,
  authController.detailBlog
);

router.post(
  "/comment-blog/:id",
  authMiddleware.authorization,
  authMiddleware.roleUser,
  authController.commentBlog
);

router.post(
  "/book-tour/:tourId/",
  authMiddleware.authorization,
  authMiddleware.roleUser,
  authMiddleware.createTour,
  authController.tourPayment
);

router.post("/send-otp", authController.forgotPassword);

router.post(
  "/new-password",
  authMiddleware.verifyOtp,
  authController.newPassword
);

module.exports = router;
