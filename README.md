## Bowser
A Browser detector. Because sometimes, there is no other way, and not even good modern browsers always provide good feature detection mechanisms.

[![Build Status](https://travis-ci.org/lancedikson/bowser.svg?branch=master)](https://travis-ci.org/lancedikson/bowser/)

# Contents
- [Overview](#overview)
- [Use cases](#use-cases)
- [Advanced usage](#advanced-usage)
- [How can I help?](#contributing)

# Overview

The library is made to help to detect what browser your user has and gives you a convenient API to filter the users somehow depending on their browsers.

_Please, note that this is an alpha version. Check out the [1.x](https://github.com/lancedikson/bowser/tree/v1.x) branch for a stable version._

**Changes of the 2.0**
The upcoming 2.0 version has drastically changed API. All available methods can be found in the `docs` folder from now on and on a webpage soon.

# Use cases

First of all, require the library:

```javascript
const bowser = require('bowser');
```

## Browser props detection

Often we need to pick users' browser properties such as the name, the version, the rendering engine and so on. Here is an example how to make it with Bowser:

```javascript
const browser = bowser.getParser(window.navigator.userAgent);

console.log(`The current browser name is "${browser.getBrowserName()}"`);
// The current browser name is "Internet Explorer"
```

or

```javascript
const impression = new Impression();

const browser = bowser.getParser(window.navigator.userAgent);
const browserInfo = browser.getBrowser();
impression.brName = browserInfo.name;
impression.brVer = browserInfo.version;
```

or

```javascript
const browser = bowser.getParser(window.navigator.userAgent);
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

You could want to filter some particular browsers to provide any special support for them or make any workarounds.
It could look like this:

```javascript
const browser = bowser.getParsers(window.navigator.userAgent);
const isValidBrowser = browser.satisfies({
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

Settings for any particular OS or platform has more priority and redefines settings of standalone browsers.
Thus, you can define OS or platform specific rules and they will have more priority in the end.

More of API and possibilities you will find in the `docs` folder.

# Advanced Usage
By default, `require('bowser')` requires the pre-compiled file, which can
include useless for you polyfills. In case you don't need that, you can choose
using source file requiring bowser like that: `require('bowser/src/bowser`);
Then you get ES2015 file, which is not precompiled and can be easier to debug.

# Contributing
If you'd like to contribute a change to bowser, modify the files in `src/`, then run the following (you'll need node + npm installed):

``` sh
$ npm install
$ npm test
```

### Adding tests
See the list in `test/acceptance/useragentstrings.yml` with example user agents and their expected bowser object.

Whenever you add support for new browsers or notice a bug / mismatch, please update the list and
check if all tests are still passing.

### Similar Projects
* [Kong](https://github.com/BigBadBleuCheese/Kong) - A C# port of Bowser.

### License
Licensed as MIT. All rights not explicitly granted in the MIT license are reserved. See the included LICENSE file for more details.
