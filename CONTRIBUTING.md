# Contributing

We're always open to pull requests or code reviews. Everyone can become a permanent contributor. Just ping @lancedikson in the issues or on Twitter ❤️

## Branches

The project runs Git-flow, where the `master` branch is the development one and `production` is the production one.

In a nutshell, if you're about to propose a new feature with adding some totally new functionality to `bowser`, it's better to branch from `master` and make a PR pointing back to `master` as well.

If it's a small hotfix, fix a typo in the docs or you've added support for a new browser/OS/platform/etc, then it's better to branch from `production` and make a PR pointing back to `production`.

Following these simple rules will help to maintain the repo a lot! Thanks ❤️

## Adding Tests

See the list in `test/acceptance/useragentstrings.yml` with example user agents and their expected bowser object.

Whenever you add support for new browsers or notice a bug / mismatch, please update the list and
check if all tests are still passing.

## Testing

If you'd like to contribute a change to bowser, modify the files in `src/`, then run the following (you'll need node + npm installed):

``` sh
$ npm install
$ npm run build #build
$ npm test #run tests
$ npm run lint #check lint rules
```
