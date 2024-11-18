# jsonwebtoken-promisified

A small wrapper around `jsonwebtoken` that adds promisified methods, as a regular `promisifyAll` is not going to work due to its strange callback format. This is a temporary fix - the next major release of `jsonwebtoken` [should resolve the issue](https://github.com/auth0/node-jsonwebtoken/issues/169#issuecomment-184660817).

Synchronous errors are turned into rejected Promises, so that solves that issue as well. Keep in mind that in most modes of operation, `jsonwebtoken` operates synchronously to begin with - this module exists primarily to make its behaviour consistent.

__Important:__ This module will *mutate* the instance of `jsonwebtoken` that it uses, as is necessary for promisification - however, it does not modify any existing methods, it only *adds* two methtods. As long as you do not attempt to separately promisify the `jsonwebtoken` module directly, this should not pose a problem.

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
var jwt = require("jsonwebtoken-promisified");

Promise.try(function() {
	return jwt.signAsync({foo: "bar"}, "secretKey");
}).then(function(token) {
	console.log("Signed token:", token);
})
```

## API

### jwt.signAsync(payload, secretOrPrivateKey, [options])

Like `jwt.sign`, but returns a Promise. [Documentation here](https://github.com/auth0/node-jsonwebtoken#jwtsignpayload-secretorprivatekey-options-callback).

### jwt.verifyAsync(payload, secretOrPublicKey, options)

Like `jwt.verify`, but returns a Promise. [Documentation here](https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback).

### jwt.sign
### jwt.verify
### jwt.decode
### TokenExpiredError
### JsonWebTokenError

Like [their `jsonwebtoken` counterparts](https://github.com/auth0/node-jsonwebtoken#usage).
