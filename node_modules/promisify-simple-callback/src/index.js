'use strict';

const Promise = require("bluebird");

module.exports = function(method, defaults = []) {
	return function() {
		var originalArgs = new Array(arguments.length);

		for(var i = 0; i < originalArgs.length; ++i) {
			originalArgs[i] = arguments[i];
		}
		
		return new Promise((resolve, reject) => {
			var args = new Array(Math.max(originalArgs.length, defaults.length) + 1);
			
			for(var i = 0; i < originalArgs.length; ++i) {
				args[i] = originalArgs[i];
			}
			
			if (originalArgs.length < defaults.length) {
				for(var i = originalArgs.length; i < defaults.length; i++) {
					if (defaults[i] != null) {
						args[i] = defaults[i];
					}
				}
			}
			
			args[args.length - 1] = function(result) {
				resolve(result);
			}
			
			// Synchronous errors are caught and propagated by Bluebird's `new Promise` already.
			method.apply(this, args);
		})
	}
	
}