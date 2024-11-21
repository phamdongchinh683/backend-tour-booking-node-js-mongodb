const express = require("express");
const router = express.Router();
const adminController = require("../../controllers/admin/admin.controller");
const adminMiddleware = require("../../middlewares/admin/admin.middleware");
const authMiddleware = require("../../middlewares/auth/auth.middleware");

// protected router
router.use(authMiddleware.authorization, adminMiddleware.adminRole);
// manage-user
router.get("/manage-user/user-list", adminController.userList);
router.get("/manage-user/guide-list", adminController.guideList);
router.get("/manage-user/user-detail/:id", adminController.userDetail);
router.post("/manage-user/create-user", adminController.addUsers);
router.put("/manage-user/update-user", adminController.updateUser);
router.delete("/manage-user/delete-user", adminController.deleteUsers);
// manage role
router.post("/manage-role/create-role", adminController.createRole);
router.get("/manage-role/role-list", adminController.roleList);
router.patch("/manage-role/edit-role/:id", adminController.updateRole);
router.delete("/manage-role/delete-role/:id", adminController.deleteRole);
router.delete("/manage-role/delete-roles", adminController.deleteRoles);

// manage tour
router.post("/manage-tour/create-tour", adminController.addTour);
router.get("/manage-tour/tour-detail/:id", adminController.tourDetail);
router.put("/manage-tour/update-tour", adminController.updateTour);
router.delete("/manage-tour/remove-tour", adminController.deleteTours);
router.get("/manage-tour/tour-list", adminController.getTours);
//manage booking
router.get("/manage-booking-tour/booking-list", adminController.bookingList);
router.get("/manage-booking/booking-detail/:id", adminController.bookingDetail);
router.post(
  "/manage-booking-tour/create-booking-tour",
  adminController.createBooking
);
router.put(
  "/manage-booking-tour/edit-booking/:id",
  adminController.updateBooking
);
router.delete(
  "/manage-booking-tour/delete-booking",
  adminController.deleteBooking
);
//manage comment
router.get("/manage-comment/comment-list", adminController.commentList);
router.get("/manage-comment/comment-detail/:id", adminController.commentDetail);
router.post("/manage-comment/create-comment", adminController.createComment);
router.put("/manage-comment/edit-comment/:id", adminController.updateComment);
router.delete("/manage-comment/delete-comment", adminController.deleteComment);
//manage review
router.get("/manage-review/review-list", adminController.reviewList);
router.post("manage-review/create-review", adminController.createReview);
router.get("/manage-review/review-detail/:id", adminController.reviewDetail);
router.put("/manage-review/edit-review", adminController.updateReview);
router.delete("/manage-review/delete-review", adminController.deleteReview);
// manage payment
router.get("/manage-payment/payment-list", adminController.paymentList);
router.get("/manage-payment/payment-detail/:id", adminController.paymentDetail);
router.post("/manage-payment/create-payment", adminController.createPayment);
router.put("/manage-payment/edit-payment/:id", adminController.updatePayment);
router.delete("/manage-payment/delete-payment", adminController.deletePayment);
//manage blog
router.get("/manage-blog/blog-list", adminController.blogList);
router.post("/manage-blog/create-blog", adminController.createBlog);
router.get("/manage-blog/blog-detail/:id", adminController.blogDetail);
router.put("/manage-blog/edit-blog/:id", adminController.updateBlog);
router.delete("/manage-blog/delete-blog", adminController.deleteBlogs);

module.exports = router;
