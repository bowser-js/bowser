## Bowser
A Browser detector. Because sometimes, there is no other way, and not even good modern browsers always provide good feature detection mechanisms.

[![bowser ci](https://secure.travis-ci.org/lancedikson/bowser.png)](https://travis-ci.org/lancedikson/bowser/)

# Contents
- Overview
- Use cases
- API
- How can I help?

# Overview

The library is made to help to detect what browser your user has and gives you a convenient API
to filter the users somehow depending on their browsers.

# Use cases

First of all, require the library:

```
const Bowser = require('bowser');
```

## Browser props detection

Often we need to pick users' browser properties such as the name,
the version, the rendering engine and so on. Here is an example how to make it with Bowser:

```
const browser = new Bowser(window.navigator.userAgent);

console.log(`The current browser name is "${browser.getBrowserName()}"`);
// The current browser name is "Internet Explorer"
```

or

```
const impression = new Impression();

const browser = new Bowser(window.navigator.userAgent);
const browserInfo = browser.getBrowser();
impression.brName = browserInfo.name;
impression.brVer = browserInfo.version;
```

or

```
const browser = new Bowser(window.navigator.userAgent);
impression.userTechData = browser.parse();
console.log(impression.userTechData);
// outputs
{
  browser: {
    name: "Internet Explorer"
    version: "11.0"
  },
  os: {
    name: "Windows"
    version: "NT 6.3"
    versionName: "8.1"
  },
  platform: {
    type: "desktop"
  },
  engine: {
    name: "Trident"
    version: "7.0"
  }
}
```


## Filtering browsers

You could want to filter some particular browsers to provide any special
support for them or make any workarounds.
It could look like this:

```
const browser = new Bowser(window.navigator.userAgent);
const isValidBrowser = bowser.compare({
  // declare browsers per OS
  windows: {
    "internet explorer": ">10",
  },
  macos: {
    safari: ">10.1"
  },

  // per platform (mobile, desktop or tablet)
  mobile: {
    safari: '>9',
    'android browser': '>3.10'
  },

  // or in general
  chrome: ">20.1.1432",
  firefox: ">31",
  opera: ">22"
});
```

As you can see, settings for any particular OS has more priority and redefines settings of `any` property.
Read more details in the [API section]()

# API

### new Bowser(`:Object`)
Use it to get object with detected flags of your current browser.

### bowser._detect(ua `:String`)`:Object`
Use it to get object with detected flags from User Agent string.

### bowser.check(minVersions`:Object`, strictMode`:Boolean`, [ua]`:String`)`:Boolean`
Use it to check if browser is supported. In default non-strict mode any browser family not present in `minVersions` will pass the check (like Chrome in the third call in the sample bellow). When strict mode is enabled then any not specified browser family in `minVersions` will cause `check` to return `false` (in the sample it is the fourth call, the last one).

``` js
/**
 * in case of using IE10
 */
bowser.check({msie: "11"});  // true
bowser.check({msie: "9.0"}); // false

/**
 * specific user agent
 */ 
bowser.check({chrome: "45"}, window.navigator.userAgent); // true

/**
 * but false in strict mode
 */
bowser.check({chrome: "45"}, true, window.navigator.userAgent); // false
```

### bowser.compareVersions(versions`:Array<String>`)`:Number`
Use it to compare two versions.

``` js
bowser.compareVersions(['9.0', '10']);
// -1
```

### bowser.isUnsupportedBrowser(minVersions`:Object`, [strictMode]`:Boolean`, [ua]`:string`)`:Boolean`
Use it to check if browser is unsupported.

``` js
bowser.isUnsupportedBrowser({msie: "10"}, window.navigator.userAgent);
// true / false
```

See more examples in [tests](test/test.js).

---

## Bowser Flags
Your mileage may vary, but these flags should be set.  See Contributing below.

``` js
alert('Hello ' + bowser.name + ' ' + bowser.version);
```

### All detected browsers
These flags are set for all detected browsers:

* `name` - A human readable name for this browser.  E.g. 'Chrome', ''
* `version` - Version number for the browser.  E.g. '32.0'

For unknown browsers, Bowser makes a best guess from the UA string.  So, these may not be set.

### Rendering engine flags
If detected, one of these flags may be set to true:

  * `webkit` - Chrome 0-27, Android <4.4, iOs, BB, etc.
  * `blink` - Chrome >=28, Android >=4.4, Opera, etc.
  * `gecko` - Firefox, etc.
  * `msie`  - IE <= 11
  * `msedge` - IE > 11

Safari, Chrome and some other minor browsers will report that they have `webkit` engines.
Firefox and Seamonkey will report that they have `gecko` engines.

``` js
if (bowser.webkit) {
  // do stuff with safari & chrome & opera & android & blackberry & webos & silk
}
```

### Device flags
If detected, one of these flags may be set to true:

  * `mobile` - All detected mobile OSes are additionally flagged `mobile`, **unless it's a tablet**
  * `tablet` - If a tablet device is detected, the flag `tablet` is **set instead of `mobile`**.

### Browser flags
If detected, one of these flags may be set to true.  The rendering engine flag is shown in []'s:

  * `chrome` - [`webkit`|`blink`]
  * `firefox` - [`gecko`]
  * `msie`
  * `msedge`
  * `safari` - [`webkit`]
  * `android` - native browser - [`webkit`|`blink`]
  * `ios` - native browser - [`webkit`]
  * `opera` - [`blink` if >=15]
  * `samsungBrowser` - [`blink`]
  * `phantom` - [`webkit`]
  * `blackberry` - native browser - [`webkit`]
  * `webos` - native browser - [`webkit`]
  * `silk` - Amazon Kindle browser  - [`webkit`]
  * `bada` - [`webkit`]
  * `tizen` - [`webkit`]
  * `seamonkey` - [`gecko`]
  * `sailfish` - [`gecko`]
  * `ucbrowser` — [`webkit`]
  * `qupzilla` — [`webkit`]
  * `vivaldi` — [`blink`]
  * `sleipnir` — [`blink`]
  * `kMeleon` — [`gecko`]

For all detected browsers the browser version is set in the `version` field.

### OS Flags
If detected, one of these flags may be set to true:

  * `mac`
  * `windows` - other than Windows Phone
  * `windowsphone`
  * `linux` - other than `android`, `chromeos`, `webos`, `tizen`, and `sailfish`
  * `chromeos`
  * `android`
  * `ios` - also sets one of `iphone`/`ipad`/`ipod`
  * `blackberry`
  * `firefoxos`
  * `webos` - may also set `touchpad`
  * `bada`
  * `tizen`
  * `sailfish`

`osversion` may also be set:

  * `osversion` - for Android, iOS, MacOS, Windows, Windows Phone, WebOS, Bada, and Tizen.  If included in UA string.

iOS is always reported as `ios` and additionally as `iphone`/`ipad`/`ipod`, whichever one matches best.
If WebOS device is an HP TouchPad the flag `touchpad` is additionally set.

### Browser capability grading
One of these flags may be set:

  * `a` - This browser has full capabilities
  * `c` - This browser has degraded capabilities.  Serve simpler version
  * `x` - This browser has minimal capabilities and is probably not well detected.

There is no `b`.  For unknown browsers, none of these flags may be set.

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

### Similar Projects
* [Kong](https://github.com/BigBadBleuCheese/Kong) - A C# port of Bowser.

### License
Licensed as MIT. All rights not explicitly granted in the MIT license are reserved. See the included LICENSE file for more details.
