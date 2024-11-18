const express = require("express");
const mongodb = require("./src/config");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const router = require("./src/routers/router");
const app = express();
const corsOptions = require("./src/config/corsOptions");
const PORT = process.env.PORT || 3000;

const START_SERVER = () => {
  app.use(cors(corsOptions));
  app.use(bodyParser.json());
  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(morgan("combined"));

  router(app);

  app.get("/", (req, res) => {
    res.json({ message: "Hello world" });
  });

  if (process.env.BUILD_MODE === "production") {
    app.listen(PORT, () => {
      console.log(
        `Production: Hi ${process.env.AUTHOR}, Back-end Server is running successfully at Port: ${PORT}`
      );
    });
  }
};

mongodb();
START_SERVER();
