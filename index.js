const express = require("express");
const swaggerUI = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const mongodb = require("./src/config");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const corsOptions = require("./src/config/corsOptions");
const PORT = process.env.PORT || 3000;
const router = require("./src/routers/router");
const swagger = require("./src/config/swagger");
const swaggerSpec = swaggerJsdoc(swagger);

app.get("/", function (req, res) {
  res.redirect("/api-docs");
});
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

const START_SERVER = () => {
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(morgan("combined"));
  router(app);

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
