const express = require("express");
const mongodb = require("./src/config");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const router = require("./src/routers/router");
const app = express();
const corsOptions = require("./src/config/corsOptions");
const options = require("./src/config/swagger");

const START_SERVER = () => {
  app.use(cors(corsOptions));
  app.use(bodyParser.json());
  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(morgan("combined"));
  // const specs = swaggerJsdoc(options);

  // app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
  router(app);

  if (process.env.BUILD_MODE === "production") {
    app.listen(process.env.PORT, () => {
      console.log(
        `Production: Hi ${process.env.AUTHOR}, Back-end Server is running successfully at Port: ${process.env.PORT}`
      );
    });
  }
};

mongodb();
START_SERVER();
