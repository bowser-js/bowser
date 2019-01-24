# Bowser Changelog

### 2.1.0 (January 24, 2019)
- [ADD] Add new `Parser.getEngineName()` method (#288)
- [ADD] Add detection of ChromeOS (#287)
- [FIX] Fix README

### 2.0.0 (January 19, 2019)
- [ADD] Support a non strict equality in `Parser.satisfies()` (#275)
- [ADD] Add Android versions names (#276)
- [ADD] Add a typings file (#277)
- [ADD] Added support for Googlebot recognition (#278)
- [FIX] Update building tools, avoid security issues

### 2.0.0-beta.3 (September 15, 2018)
- [FIX] Fix Chrome Mobile detection (#253)
- [FIX] Use built bowser for CI (#252)
- [FIX] Update babel-plugin-add-module-exports (#251)

### 2.0.0-beta.2 (September 9, 2018)
- [FIX] Fix failing comparing version through `Parser.satisfies` (#243)
- [FIX] Fix travis testing, include eslint into CI testing
- [FIX] Add support for Maxthon desktop browser (#246)
- [FIX] Add support for Swing browser (#248)
- [DOCS] Regenerate docs

### 2.0.0-beta.1 (August 18, 2018)
- [ADD] Add loose version comparison to `Parser.compareVersion()` and `Parser.satisfies()`
- [CHORE] Add CONTRIBUTING.md
- [DOCS] Regenerate docs

### 2.0.0-alpha.4 (August 2, 2018)
- [DOCS] Fix usage docs (#238)
- [CHANGE] Make `./es5.js` the main file of the package (#239)

### 2.0.0-alpha.3 (July 22, 2018)
- [CHANGE] Rename split and rename `compiled.js` to `es5.js` and `bundled.js` (#231, #236, #237)
- [ADD] Add `Parser.some` (#235)

### 2.0.0-alpha.2 (July 17, 2018)
- [CHANGE] Make `src/bowser` main file instead of the bundled one
- [CHANGE] Move the bundled file to the root of the package to make it possible to `require('bowser/compiled')` (#231)
- [REMOVE] Remove `typings.d.ts` before stable release (#232)
- [FIX] Improve Nexus devices detection (#233)

### 2.0.0-alpha.1 (July 9, 2018)
- [ADD] `Bowser.getParser()`
- [ADD] `Bowser.parse`
- [ADD] `Parser` class which describes parsing process
- [CHANGE] Change bowser's returning object
- [REMOVE] Remove bower support

### 1.9.4 (June 28, 2018)
- [FIX] Fix NAVER Whale browser detection (#220)
- [FIX] Fix MZ Browser browser detection (#219)
- [FIX] Fix Firefox Focus browser detection (#191)
- [FIX] Fix webOS browser detection (#186)

### 1.9.3 (March 12, 2018)
- [FIX] Fix `typings.d.ts` — add `ipad`, `iphone`, `ipod` flags to the interface

### 1.9.2 (February 5, 2018)
- [FIX] Fix `typings.d.ts` — add `osname` flag to the interface

### 1.9.1 (December 22, 2017)
- [FIX] Fix `typings.d.ts` — add `chromium` flag to the interface

### 1.9.0 (December 20, 2017)
- [ADD] Add a public method `.detect()` (#205)
- [DOCS] Fix description of `chromium` flag in docs (#206)

### 1.8.1 (October 7, 2017)
- [FIX] Fix detection of MS Edge on Android and iOS (#201)

### 1.8.0 (October 7, 2017)
- [ADD] Add `osname` into result object (#200)

### 1.7.3 (August 30, 2017)
- [FIX] Fix detection of Chrome on Android 8 OPR6 (#193)

### 1.7.2 (August 17, 2017)
- [FIX] Fix typings.d.ts according to #185

### 1.7.1 (July 13, 2017)
- [ADD] Fix detecting of Tablet PC as tablet (#183)

### 1.7.0 (May 18, 2017)
- [ADD] Add OS version support for Windows and macOS (#178)

### 1.6.0 (December 5, 2016)
- [ADD] Add some tests for Windows devices (#89)
- [ADD] Add `root` to initialization process (#170)
- [FIX] Upgrade .travis.yml config

### 1.5.0 (October 31, 2016)
- [ADD] Throw an error when `minVersion` map has not a string as a version and fix readme (#165)
- [FIX] Fix truly detection of Windows Phones (#167)

### 1.4.6 (September 19, 2016)
- [FIX] Fix mobile Opera's version detection on Android
- [FIX] Fix typescript typings — add `mobile` and `tablet` flags
- [DOC] Fix description of `bowser.check`

### 1.4.5 (August 30, 2016)

- [FIX] Add support of Samsung Internet for Android
- [FIX] Fix case when `navigator.userAgent` is `undefined`
- [DOC] Add information about `strictMode` in `check` function
- [DOC] Consistent use of `bowser` variable in the README

### 1.4.4 (August 10, 2016)

- [FIX] Fix AMD `define` call — pass name to the function

### 1.4.3 (July 27, 2016)

- [FIX] Fix error `Object doesn't support this property or method` on IE8

### 1.4.2 (July 26, 2016)

- [FIX] Fix missing `isUnsupportedBrowser` in typings description
- [DOC] Fix `check`'s declaration in README

### 1.4.1 (July 7, 2016)

- [FIX] Fix `strictMode` logic for `isUnsupportedBrowser`

### 1.4.0 (June 28, 2016)

- [FEATURE] Add `bowser.compareVersions` method
- [FEATURE] Add `bowser.isUnsupportedBrowser` method
- [FEATURE] Add `bowser.check` method
- [DOC] Changelog started
- [DOC] Add API section to README
- [FIX] Fix detection of browser type (A/C/X) for Chromium
