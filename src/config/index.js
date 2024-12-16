const mongoose = require("mongoose");
require("dotenv").config();
require("colors");
const { _dbName, _url } = require("../globals/secretKey");
const _dbConnect = async () => {
  try {
    await mongoose.connect(`${_url}/${_dbName}`, {
      maxPoolSize: 10,
    });
    console.log("Database connected! ".yellow.bold);
  } catch (error) {
    console.error(`Failed to connect database: ${error}`.red.bold);
  }
};
module.exports = _dbConnect;
