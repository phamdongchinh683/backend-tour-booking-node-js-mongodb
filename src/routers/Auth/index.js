const express = require("express");
const router = express.Router();
const authController = require("../../controllers/auth/auth.controller");
const authMiddleware = require("../../middlewares/auth/auth.middleware");

router.post("/sign-up", authMiddleware.inputInfoUser, authController.signUp);
router.get("/login", authController.login);
module.exports = router;
