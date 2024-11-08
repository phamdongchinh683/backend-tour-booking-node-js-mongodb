const mongoose = require("mongoose");

require("dotenv").config();
require("colors");
const { _dbName, _url } = require("../utils/secretKey");

const _dbConnect = async () => {
  try {
    await mongoose.connect(`${_url}/${_dbName}`);
    console.log("Database connected! ".yellow.bold);
  } catch (error) {
    console.error(`Failed to connect database: ${err}`.red.bold);
    handleError(error);
  }
};

module.exports = _dbConnect;
