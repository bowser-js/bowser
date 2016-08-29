# Bowser Changelog

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
