## Bowser
A browser detector. Because sometimes, there is no other way, and not even good modern browsers always provide good feature detection mechanisms.

[![Build Status](https://travis-ci.org/lancedikson/bowser.svg?branch=master)](https://travis-ci.org/lancedikson/bowser/) [![Greenkeeper badge](https://badges.greenkeeper.io/lancedikson/bowser.svg)](https://greenkeeper.io/)[![Coverage Status](https://coveralls.io/repos/github/lancedikson/bowser/badge.svg?branch=master)](https://coveralls.io/github/lancedikson/bowser?branch=master)

# Contents
- [Overview](#overview)
- [Use cases](#use-cases)
- [Advanced usage](#advanced-usage)
- [How can I help?](#contributing)

# Overview

The library is made to help to detect what browser your user has and gives you a convenient API to filter the users somehow depending on their browsers.

**Changes of version 2.0**

The version 2.0 has drastically changed API. All available methods can be found in the `docs` folder from now on and on a webpage soon.

_For legacy code, check out the [1.x](https://github.com/lancedikson/bowser/tree/v1.x) branch and install it through `npm install bowser@1.9.4`._


# Use cases

First of all, require the library. This is a UMD Module, so it will work for AMD, TypeScript, ES6, and CommonJS module systems.

```javascript
const Bowser = require("bowser"); // CommonJS

import * as Bowser from "bowser"; // TypeScript

import Bowser from "bowser"; // ES6 (and TypeScript with --esModuleInterop enabled)
```

By default, the exported version is the *ES5 transpiled version*, which **do not** include any polyfills.

In case you don't use your own `babel-polyfill` you may need to have pre-built bundle with all needed polyfills.
So, for you it's suitable to require bowser like this: `require('bowser/bundled')`.
As the result, you get a ES5 version of bowser with `babel-polyfill` bundled together.

You may need to use the source files, so they will be available in the package as well.

## Browser props detection

Often we need to pick users' browser properties such as the name, the version, the rendering engine and so on. Here is an example how to do it with Bowser:

```javascript
const browser = Bowser.getParser(window.navigator.userAgent);

console.log(`The current browser name is "${browser.getBrowserName()}"`);
// The current browser name is "Internet Explorer"
```

or

```javascript
const impression = new Impression();

const browser = Bowser.getParser(window.navigator.userAgent);
const browserInfo = browser.getBrowser();
impression.brName = browserInfo.name;
impression.brVer = browserInfo.version;
```

or

```javascript
const browser = Bowser.getParser(window.navigator.userAgent);
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
const browser = Bowser.getParser(window.navigator.userAgent);
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
    safari: '>=9',
    'android browser': '>3.10'
  },

  // or in general
  chrome: "~20.1.1432",
  firefox: ">31",
  opera: ">=22"

  // also supports equality operator
  chrome: "=20.1.1432", // will match particular build only

  // and loose-equality operator
  chrome: "~20"         // will match any 20.* sub-version
  chrome: "~20.1"       // will match any 20.1.* sub-version (20.1.19 as well as 20.1.12.42-alpha.1)
});
```

Settings for any particular OS or platform has more priority and redefines settings of standalone browsers.
Thus, you can define OS or platform specific rules and they will have more priority in the end.

More of API and possibilities you will find in the `docs` folder.

### Similar Projects
* [Kong](https://github.com/BigBadBleuCheese/Kong) - A C# port of Bowser.

### License
Licensed as MIT. All rights not explicitly granted in the MIT license are reserved. See the included LICENSE file for more details.
