const express = require("express");
const mongodb = require("./src/config");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const corsOptions = require("./src/config/corsOptions");
const routerAuth = require("./src/routers/Auth");
const routerAdmin = require("./src/routers/Admin");
const PORT = process.env.PORT || 3000;

const START_SERVER = () => {
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(morgan("combined"));

  app.use("/api/v1/auth", routerAuth);
  app.use("/api/v1/admin", routerAdmin);

  if (process.env.BUILD_MODE === "production") {
    app.listen(PORT, () => {
      console.log(
        `Production: Hi ${process.env.AUTHOR}, Back-end Server is running successfully at Port: ${PORT}`
      );
    });
  } else {
    app.listen(PORT, () => {
      console.log(
        `Development: Back-end Server is running successfully at Port: ${PORT}`
      );
    });
  }
};

mongodb();
START_SERVER();
