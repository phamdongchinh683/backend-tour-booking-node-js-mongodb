const express = require("express");
const mongodb = require("./src/config");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const port = process.env.PORT;
const router = require("./src/routers/router");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("combined"));

router(app);
mongodb();

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
