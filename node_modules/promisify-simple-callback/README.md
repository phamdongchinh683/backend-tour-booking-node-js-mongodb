# promisify-simple-callback

Promisifies a function that expects a callback with a single (result) argument - in other words, a callback that looks like `function(result) { ... }` - in what should be a reasonably performant manner.

Because sometimes, a module just doesn't conform to the Node.js callback convention.

## License

[WTFPL](http://www.wtfpl.net/txt/copying/) or [CC0](https://creativecommons.org/publicdomain/zero/1.0/), whichever you prefer. A donation and/or attribution are appreciated, but not required.

## Donate

My income consists largely of donations for my projects. If this module is useful to you, consider [making a donation](http://cryto.net/~joepie91/donate.html)!

You can donate using Bitcoin, PayPal, Flattr, cash-in-mail, SEPA transfers, and pretty much anything else.

## Contributing

Pull requests welcome. Please make sure your modifications are in line with the overall code style, and ensure that you're editing the files in `src/`, not those in `lib/`.

Build tool of choice is `gulp`; simply run `gulp` while developing, and it will watch for changes.

Be aware that by making a pull request, you agree to release your modifications under the licenses stated above.

## Usage

```javascript
var Promise = require("bluebird");
var promisifySimpleCallback = require("promisify-simple-callback");

/* Pretend that brokenAsyncMethod comes from a third-party library. */
function brokenAsyncMethod(someArg, options, cb) {
	doSomething(options, function(err, result) {
		cb(result);
	})
}

/* Promisify it! */
var promisifiedAsyncMethod = promisifySimpleCallback(brokenAsyncMethod, [null, {}]);

/* Now we can use it normally. */
Promise.try(function() {
	return promisifiedAsyncMethod("foobar");
}).then(function(result) {
	console.log("Done!", result);
});
```

## API

### promisifySimpleCallback(func, [defaults])

Promisifies the given `func`. The promisified method will also catch any synchronous errors, and propagate them as rejections.

You can also specify default argument values; often, there are optional arguments that come before the callback, and by specifying default values, you can make these arguments *really* optional.

Because promisification works by appending a callback at the end of the arguments list, you would otherwise have to include all the optional arguments just to make sure the callback ends up in the right place.

* __func__: The callback-expecting function to promisify.
* __defaults__: *Optional.* An array of default arguments to fill in. Any argument for which you specify `null` will be skipped - that is, it will be left exactly as is. This means that, for an unspecified argument, it is left to `undefined`.
