const routerAuth = require("./Auth");
const routerAdmin = require("./Admin");
function router(app) {
  app.use("/api/v1/auth", routerAuth);
  app.use("/api/v1/admin", routerAdmin);
  app.get("/", () => {
    res.send("Hello world");
  });
}

module.exports = router;
