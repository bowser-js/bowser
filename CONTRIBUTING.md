# Contributing

We're always open to pull requests or code reviews. Everyone can become a permanent contributor. Just ping @lancedikson in the issues or on Twitter ❤️

## Branches

The project runs Git-flow, where the `master` branch is for development and `production` is for production.

In a nutshell, if you are proposing a new feature that adds totally new functionality to `bowser`, it's better to branch from `master` and make a PR pointing back to `master` as well.

If it's a small hot-fix, an improvement to the docs, or added support for a new browser/OS/platform/etc, then it's better to branch from `production` and make a PR pointing back to `production`.

Following these simple rules will really help maintain the repo! Thanks ❤️

## Adding Tests

See the list in `test/acceptance/useragentstrings.yml` with example user agents and their expected `bowser` object.

Whenever you add support for new browsers or notice a bug / mismatch, please update the list and
check if all tests are still passing.

## Testing

If you'd like to contribute a change to `bowser`, modify the files in `src/`, and run the following (you'll need `node` + `npm` installed):

``` sh
$ npm install
$ npm run build #build
$ npm test #run tests
$ npm run lint #check lint rules
```
