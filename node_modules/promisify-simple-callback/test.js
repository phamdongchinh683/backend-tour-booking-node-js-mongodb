'use strict';

const Promise = require("bluebird");
const promisifySimpleCallback = require("./");

function brokenFunction(arg, optionalArg, cb) {
	cb([arg, optionalArg]);
}

let fixedFunction = promisifySimpleCallback(brokenFunction, [null, {}]);

Promise.try(() => {
	return Promise.all([
		fixedFunction(42),
		fixedFunction(42, {foo: "bar"})
	]);
}).then((results) => {
	console.log(results);
});