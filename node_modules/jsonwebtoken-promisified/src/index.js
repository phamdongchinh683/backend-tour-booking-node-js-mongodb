'use strict';

const Promise = require("bluebird");
const jwt = require("jsonwebtoken");
const promisifySimpleCallback = require("promisify-simple-callback");

jwt.signAsync = promisifySimpleCallback(jwt.sign, [null, null, {}])
jwt.verifyAsync = Promise.promisify(jwt.verify);

module.exports = jwt;