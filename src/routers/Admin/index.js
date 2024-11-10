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
router.post("/manage-user/create-user", adminController.addUsers);
router.put("/manage-user/update-user", adminController.updateUsers);
router.delete("/manage-user/delete-user", adminController.deleteUsers);
// manage role
router.post("/manage-role/create-role", adminController.createRole);
// manage tour
router.post("/manage-tour/create-tour", adminController.addTour);
router.put("/manage-tour/update-tour", adminController.updateTour);
router.delete("/manage-tour/remove-tour", adminController.deleteTours);
router.get("/manage-tour/tour-list", adminController.getTours);
router.get("/manage-user/guide-list", adminController.guideList);

module.exports = router;
