const routerAuth = require("./Auth");
function router(app) {
  app.use("/api/v1/auth", routerAuth);
}

module.exports = router;
