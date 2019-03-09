# Contributing

We're always open to pull requests or code reviews. Everyone can become a permanent contributor. Just ping @lancedikson in the issues or on Twitter ❤️

## Branches

The project runs Git-flow, where the `master` branch is for development and `production` is for production.

In a nutshell, if you are proposing a new feature that adds totally new functionality to `bowser`, it's better to branch from `master` and make a PR pointing back to `master` as well.

If it's a small hot-fix, an improvement to the docs, or added support for a new browser/OS/platform/etc, then it's better to branch from `production` and make a PR pointing back to `production`.

Following these simple rules will really help maintain the repo! Thanks ❤️

## Adding Browser Support and Tests

See the list in `test/acceptance/useragentstrings.yml` with example user agents and their expected `bowser` object.

Whenever you add support for new browsers or notice a bug / mismatch, please update the list and check if all tests are still passing. Also, make sure to keep the list of browser aliases up-to-date in `src/constants.js`.

For creating aliases, keep the following guidelines in mind:
 - use only lowercase letters for names
 - replace special characters such as space and dashes by underscore
 - whenever possible drop the word `browser` from the original browser name
 - always check for possible duplicates
 - aliases are supposed to also be a shorter version of the original name

Examples:
`Opera Coast` --> `opera_coast`
`UC Browser`  --> `uc`
`SeaMonkey`   --> `seamonkey`

## Testing

If you'd like to contribute a change to `bowser`, modify the files in `src/`, and run the following (you'll need `node` + `npm` installed):

``` sh
$ npm install
$ npm run build #build
$ npm test #run tests
$ npm run lint #check lint rules
```
