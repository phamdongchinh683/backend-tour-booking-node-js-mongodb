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

router.get("/user-list", authController.userList);
router.post("/create-role", authController.createRole);
// router.get("/get-role", authController.roleUser);

module.exports = router;
