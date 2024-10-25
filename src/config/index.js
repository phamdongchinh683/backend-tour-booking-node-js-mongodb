const mongoose = require("mongoose");
require("dotenv").config();
require("colors");
const { _dbName, _url } = require("../utils/secretKey");

const _dbConnect = async () => {
  await mongoose
    .connect(`${_url}/${_dbName}`)
    .then(() => {
      console.log(mongoose.connections.length);
      console.log("Database connected! ".yellow.bold);
    })
    .catch((err) => {
      console.error(`Failed to connect database: ${err}`.red.bold);
    });
};

module.exports = _dbConnect;
