const express = require("express");
const router = express.Router();
const adminController = require("../../controllers/admin/admin.controller");
const adminMiddleware = require("../../middlewares/admin/admin.middleware");

const authMiddleware = require("../../middlewares/auth/auth.middleware");

// manage-user
router.get(
  "/manage-user/user-list",
  authMiddleware.authorization,
  adminMiddleware.adminRole,
  adminController.userList
);

router.post(
  "/manage-user/create-user",
  authMiddleware.authorization,
  adminMiddleware.adminRole,
  adminController.addUsers
);

router.put(
  "/manage-user/update-user",
  authMiddleware.authorization,
  adminMiddleware.adminRole,
  adminController.updateUsers
);

router.delete(
  "/manage-user/delete-user",
  authMiddleware.authorization,
  adminMiddleware.adminRole,
  adminController.deleteUsers
);

// manage role
router.post("/manage-role/create-role", adminController.createRole);

// manage tour
router.post(
  "/manage-tour/create-tour",
  authMiddleware.authorization,
  adminMiddleware.adminRole,
  adminController.addTour
);

router.get(
  "/manage-tour/tour-list",
  authMiddleware.authorization,
  adminMiddleware.adminRole,
  adminController.getTours
);

router.get(
  "/manage-user/guide-list",
  authMiddleware.authorization,
  adminMiddleware.adminRole,
  adminController.guideList
);

module.exports = router;
