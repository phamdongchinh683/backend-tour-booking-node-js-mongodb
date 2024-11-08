const { responseStatus } = require("../../utils/handler");

const adminService = require("../../services/admin/admin.service");
const roleService = require("../../services/admin/role.service");
const tourService = require("../../services/admin/tour.service");
class AdminController {
  // manage user
  async userList(req, res) {
    try {
      await adminService.getAllUsers(res);
    } catch (e) {
      responseStatus(res, 400, "failed", e.message);
    }
  }
  async addUsers(req, res) {
    const { users } = req.body;
    try {
      await adminService.saveUsers(users, res);
    } catch (e) {
      if (e.code === 11000) {
        responseStatus(res, 400, "failed", "Exited");
      }
    }
  }

  async updateUsers(req, res) {
    const { users } = req.body;
    try {
      await adminService.updateUsers(users, res);
    } catch (e) {
      responseStatus(res, 400, "failed", e.message);
    }
  }
  async deleteUsers(req, res) {
    const { users } = req.body;
    try {
      await adminService.deleteUsers(users, res);
    } catch (e) {
      responseStatus(res, 400, "failed", e.message);
    }
  }

  // manage role
  async createRole(req, res) {
    const { nameRole } = req.body;
    try {
      await roleService.saveRole(nameRole, res);
    } catch (e) {
      responseStatus(res, 400, "failed", e.message);
    }
  }

  // manage tour
  async addTour(req, res) {
    const { tours } = req.body;
    try {
      await tourService.createTours(tours, res);
    } catch (e) {
      responseStatus(res, 400, "failed", e.message);
    }
  }

  async getTours(req, res) {
    try {
      await tourService.tourList(res);
    } catch (e) {
      responseStatus(res, 400, "failed", e.message);
    }
  }

  async updateTours(req, res) {
    const { tours } = req.body;
    try {
      await tourService.updateTour(tours, res);
    } catch (e) {
      responseStatus(res, 400, "failed", e.message);
    }
  }

  async deleteTours(req, res) {
    const { tours } = req.body;
    try {
      await tourService.deleteTours(tours, res);
    } catch (e) {
      responseStatus(res, 400, "failed", e.message);
    }
  }

  // manage guides
  async guideList(req, res) {
    try {
      await adminService.getAllGuides(res);
    } catch (e) {
      responseStatus(res, 400, "failed", e.message);
    }
  }
}

module.exports = new AdminController();
