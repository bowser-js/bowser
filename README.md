## Bowser
A Browser detector. Because sometimes, there is no other way, and not even good modern browsers always provide good feature detection mechanisms.

[![bowser ci](https://secure.travis-ci.org/lancedikson/bowser.png)](https://travis-ci.org/lancedikson/bowser/)

# Contents
- [Overview](#overview)
- [Use cases](#use-cases)
- [How can I help?](#contributing)

# Overview

The library is made to help to detect what browser your user has and gives you a convenient API
to filter the users somehow depending on their browsers.

# Use cases

First of all, require the library:

```
const bowser = require('bowser');
```

## Browser props detection

Often we need to pick users' browser properties such as the name,
the version, the rendering engine and so on. Here is an example how to make it with Bowser:

```
const browser = bowser.getParser(window.navigator.userAgent);

console.log(`The current browser name is "${browser.getBrowserName()}"`);
// The current browser name is "Internet Explorer"
```

or

```
const impression = new Impression();

const browser = bowser.getParser(window.navigator.userAgent);
const browserInfo = browser.getBrowser();
impression.brName = browserInfo.name;
impression.brVer = browserInfo.version;
```

or

```
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

You could want to filter some particular browsers to provide any special
support for them or make any workarounds.
It could look like this:

```
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
