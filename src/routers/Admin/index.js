const express = require("express");
const router = express.Router();
const adminController = require("../../controllers/admin/admin.controller");
const adminMiddleware = require("../../middlewares/admin/admin.middleware");
const authMiddleware = require("../../middlewares/auth/auth.middleware");
const authController = require("../../controllers/auth/auth.controller");

/**
 * @swagger
 * /api/v1/admin/login:
 *   post:
 *     summary: Admin login
 *     description: Allows an admin to log in with a username and password.
 *     tags:
 *       - Admin
 *     requestBody:
 *       required: true
 *       description: Username and password for login
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the admin
 *                 example: admin_user
 *               password:
 *                 type: string
 *                 description: The password of the admin
 *                 example: your_secure_password
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Access token for the logged-in admin
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: Login successful
 *       400:
 *         description: Bad request (e.g., missing username or password)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: Username or password is missing
 *       401:
 *         description: Unauthorized (e.g., invalid credentials)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: Invalid username or password
 */

router.post("/login", adminMiddleware.isAdmin, authController.login);
// protected router
router.use(authMiddleware.authorization, adminMiddleware.adminRole);
// manage-user
/**
 * @swagger
 * /api/v1/admin/manage-user/user-list:
 *   get:
 *     summary: list all users
 *     description: This API creates a new resource for an admin user.
 *     tags:
 *       - Admin
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         description: Authorization token
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Resource created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID of the created resource
 *                   example: 12345
 *                 name:
 *                   type: string
 *                   example: New Resource
 *                 description:
 *                   type: string
 *                   example: This is a sample resource.
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.get("/manage-user/user-list", adminController.userList);
/**
 * @swagger
 * /api/v1/admin/manage-user/guide-list:
 *   get:
 *     summary: get guide list
 *     description: This API creates a new resource for an admin user.
 *     tags:
 *       - Admin
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         description: Authorization token
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Resource created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID of the created resource
 *                   example: 12345
 *                 name:
 *                   type: string
 *                   example: New Resource
 *                 description:
 *                   type: string
 *                   example: This is a sample resource.
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.get("/manage-user/guide-list", adminController.guideList);
/**
 * @swagger
 * /api/v1/admin/manage-user/user-detail/{id}:
 *   get:
 *     summary: detail a user
 *     description: This API creates a new resource for an admin user.
 *     tags:
 *       - Admin
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         description: Authorization token
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the resource
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Resource created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID of the created resource
 *                   example: 12345
 *                 name:
 *                   type: string
 *                   example: New Resource
 *                 description:
 *                   type: string
 *                   example: This is a sample resource.
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.get("/manage-user/user-detail/:id", adminController.userDetail);
/**
 * @swagger
 * /api/v1/admin/manage-user/create-user:
 *   post:
 *     summary: create many users
 *     description: This API allows an admin to create multiple users in a single request.
 *     tags:
 *       - Admin
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         description: Authorization token
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       description: Array of user objects to create
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               users:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     firstName:
 *                       type: string
 *                       description: First name of the user
 *                       example: Alice
 *                     lastName:
 *                       type: string
 *                       description: Last name of the user
 *                       example: Smith
 *                     username:
 *                       type: string
 *                       description: Unique username of the user
 *                       example: alice_smith
 *                     password:
 *                       type: string
 *                       description: Hashed password of the user
 *                       example: hashed_password
 *                     phone:
 *                       type: string
 *                       description: Phone number of the user
 *                       example: 987-654-3210
 *                     email:
 *                       type: string
 *                       description: Email address of the user
 *                       example: 123@example.com
 *                     age:
 *                       type: integer
 *                       description: Age of the user
 *                       example: 28
 *                     role_id:
 *                       type: string
 *                       description: Role ID assigned to the user
 *                       example: 672b888f4c2051465239b718
 *                     city:
 *                       type: string
 *                       description: City of residence
 *                       example: Springfield
 *     responses:
 *       201:
 *         description: Users created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Users created successfully
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: ID of the created user
 *                         example: 12345
 *                       username:
 *                         type: string
 *                         example: alice_smith
 *                       email:
 *                         type: string
 *                         example: 123@example.com
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post("/manage-user/create-user", adminController.addUsers);
/**
 * @swagger
 * /api/v1/admin/manage-user/update-user:
 *   put:
 *     summary: update a user
 *     description: This API allows an admin to create multiple users in a single request.
 *     tags:
 *       - Admin
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         description: Authorization token
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       description: Array of user objects to create
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: First name of the user
 *                       example: Alice
 *                     firstName:
 *                       type: string
 *                       description: First name of the user
 *                       example: Alice
 *                     lastName:
 *                       type: string
 *                       description: Last name of the user
 *                       example: Smith
 *                     username:
 *                       type: string
 *                       description: Unique username of the user
 *                       example: alice_smith
 *                     password:
 *                       type: string
 *                       description: Hashed password of the user
 *                       example: hashed_password
 *                     phone:
 *                       type: string
 *                       description: Phone number of the user
 *                       example: 987-654-3210
 *                     email:
 *                       type: string
 *                       description: Email address of the user
 *                       example: 123@example.com
 *                     age:
 *                       type: integer
 *                       description: Age of the user
 *                       example: 28
 *                     role_id:
 *                       type: string
 *                       description: Role ID assigned to the user
 *                       example: 672b888f4c2051465239b718
 *                     city:
 *                       type: string
 *                       description: City of residence
 *                       example: Springfield
 *     responses:
 *       201:
 *         description: Users created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Users created successfully
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: ID of the created user
 *                         example: 12345
 *                       username:
 *                         type: string
 *                         example: alice_smith
 *                       email:
 *                         type: string
 *                         example: 123@example.com
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.put("/manage-user/update-user", adminController.updateUser);
/**
 * @swagger
 * /api/v1/admin/manage-user/delete-user:
 *   delete:
 *     summary: delete many users or a user
 *     description: This API allows an admin to create multiple users in a single request.
 *     tags:
 *       - Admin
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         description: Authorization token
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       description: Array of user objects to create
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               users:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     _id:
 *                      type: string
 *                      description: Unique identifier of the user
 *                      example: 6731ac666836ca5c885f7e3d
 *     responses:
 *       201:
 *         description: Users created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Users created successfully
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: ID of the created user
 *                         example: 12345
 *                       username:
 *                         type: string
 *                         example: alice_smith
 *                       email:
 *                         type: string
 *                         example: 123@example.com
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
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
