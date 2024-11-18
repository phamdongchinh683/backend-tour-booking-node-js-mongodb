'use strict';

var Promise = require("bluebird");
var jwt = require("jsonwebtoken");
var promisifySimpleCallback = require("promisify-simple-callback");

jwt.signAsync = promisifySimpleCallback(jwt.sign, [null, null, {}]);
jwt.verifyAsync = Promise.promisify(jwt.verify);

module.exports = jwt;