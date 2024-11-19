const routerAuth = require("./Auth");
const routerAdmin = require("./Admin");
function router(app) {
  app.get("/", (req, res) => {
    res.json({ message: "Hello world" });
  });

  app.use("/api/v1/auth", routerAuth);
  app.use("/api/v1/admin", routerAdmin);
}

module.exports = router;
