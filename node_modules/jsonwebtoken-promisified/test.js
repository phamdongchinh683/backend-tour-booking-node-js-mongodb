'use strict';

const Promise = require("bluebird");
const jwt = require("./");

Promise.try(() => {
	return jwt.signAsync({foo: "bar"}, "secretKey");
}).then((result) => {
	console.log(result);
	return jwt.verifyAsync(result, "secretKey");
}).catch((err) => {
	console.log(err.stack);
})