const express = require("express");
const router = express.Router();
const authController = require("../../controllers/auth/auth.controller");
const authMiddleware = require("../../middlewares/auth/auth.middleware");
const { infoUser } = require("../../validations/board.validation");
// public routers
router.post("/sign-up", infoUser, authController.signUp);
router.post("/login", authController.login);
router.post("/send-otp", authController.forgotPassword);
router.post(
  "/new-password",
  authMiddleware.verifyOtp,
  authController.newPassword
); // protected router

router.use(authMiddleware.authorization, authMiddleware.roleUser);
router.get("/profile", authController.getProfile);
router.post("/post-blog", authController.postBlog);
router.get("/my-blogs", authController.getAllBlog);
router.get("/blog/:id", authController.detailBlog);
router.get("/get-tours", authController.getAllTour);
router.put("/edit-blog/:id", authController.editBlog);
router.delete("/remove-blog/:id", authController.removeBlog);
router.post("/comment-blog/:id", authController.commentBlog);
router.patch("/edit-comment/:id", authController.updateComment);
router.delete("/remove-comment/:id", authController.removeComment);
router.post(
  "/book-tour/:tourId",
  authMiddleware.createTour,
  authController.tourPayment
);
router.get("/my-book-tour", authController.getBookedList);
router.post("/evaluate-guide/:guideId", authController.evaluateGuide);

module.exports = router;
