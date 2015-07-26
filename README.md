## Bowser
A Browser detector. Because sometimes, there is no other way, and not even good modern browsers always provide good feature detection mechanisms.

[![bowser ci](https://secure.travis-ci.org/ded/bowser.png)](https://travis-ci.org/ded/bowser/)

So... it works like this:

``` js
if (bowser.msie && bowser.version <= 6) {
  alert('Hello China');
}
```

## Flags set for detected Browsers[Engines]

  * `chrome`[`webkit`]
  * `firefox`[`gecko`]
  * `msie`
  * `msedge`
  * Android native browser as `android`[`webkit`]
  * iOS native browser as `ios`[`webkit`]
  * `opera`[`webkit` if >12]
  * `phantom`[`webkit`]
  * `safari`[`webkit`]
  * `seamonkey`[`gecko`]
  * BlackBerry native browser as `blackberry`[`webkit`]
  * WebOS native browser as `webos`[`webkit`]
  * Amazon Kindle browser as `silk`[`webkit`]
  * Bada browser as `bada`[`webkit`]
  * Tizen browser as `tizen`[`webkit`]
  * Sailfish browser as `sailfish`[`gecko`]

For all detected browsers the browser version is set in the `version` field.

## Flags set for detected mobile Operating Systems

  * `android`
  * Windows Phone as `windowsphone`
  * `ios` (`iphone`/`ipad`/`ipod`)
  * `blackberry`
  * `firefoxos`
  * `webos` (`touchpad`)
  * `bada`
  * `tizen`
  * `sailfish`

Android, iOS, Windows Phone, WebOS, Bada, and Tizen will all report the OS version number if it is contained in the UA string in the `osversion` field. iOS is always reported as `ios` and additionally as `iphone`/`ipad`/`ipod`, whichever one matches best. If WebOS device is an HP TouchPad the flag `touchpad` is additionally set.

All detected mobile OSes are additionally flagged `mobile`, **if they are not powering a tablet device**. If a tablet device is detected, the flag `tablet` is set instead.

### Notes
Safari, Chrome and some other minor browsers will report that they have `webkit` engines, Firefox and Seamonkey will report that they have `gecko` engines.

``` js
if (bowser.webkit) {
  // do stuff with safari & chrome & opera & android & blackberry & webos & silk
}
```

### Ender Support

`package.json`

``` json
"dependencies": {
  "bowser": "x.x.x"
}
```

``` js
if (require('bowser').chrome) {
  alert('Hello Silicon Valley')
}
```

### Graded Browser Support

``` js
if (bowser.a) {
  // support full feature set
}
else if (bowser.c) {
  // serve degraded version
}
else {
  // unsupported (bowser.x)
}
```

### Contributing
If you'd like to contribute a change to bowser, modify the files in `src/`, then run the following (you'll need node + npm installed):

``` sh
$ npm install
$ make test
```

Please do not check-in the built files `bowser.js` and `bowser.min.js` in pull requests.

### Adding tests
See the list in `src/useragents.js` with example user agents and their expected bowser object.

Whenever you add support for new browsers or notice a bug / mismatch, please update the list and
check if all tests are still passing.

### License
Licensed as MIT. All rights not explicitly granted in the MIT license are reserved. See the included LICENSE file for more details.
