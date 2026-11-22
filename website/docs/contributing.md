---
title: Contributing
sidebar_label: Contributing
---

# Contributing

Pull requests and code reviews are welcome. Anyone can become a long-term contributor. Open an issue or pull request in the [Bowser repository](https://github.com/bowser-js/bowser); the original contributor guide also points contributors to [@lancedikson](https://github.com/lancedikson).

## Branches

The repository's production branch is `master`. Target pull requests to `master` unless a release-specific contribution guide says otherwise.

## Adding browser support

Bowser has four ordered parser descriptor lists: browsers, operating systems, platforms, and engines. `src/parser.js` runs them through `Utils.find()` and uses the first matching descriptor. Descriptor order matters: specific browsers such as Opera and Edge must appear before generic browsers such as Chrome and Safari.

When adding a browser or bot, update the relevant files:

1. Add its descriptor to `src/parser-browsers.js`. A descriptor has a `test` regex array or `test(parser)` function and a `describe(ua)` function returning its name and version.
2. Add a platform descriptor in `src/parser-platforms.js` when the browser needs specific device detection or is a bot.
3. Add both directions of the alias mapping in `src/constants.js`: display name to alias in `BROWSER_ALIASES_MAP`, alias to display name in `BROWSER_MAP`.
4. Add real User-Agent strings and their complete expected result to `test/acceptance/useragentstrings.yml`. Its top-level browser key must match the parsed `browser.name` exactly.
5. Update `index.d.ts` if the change adds or changes public TypeScript surface.

Keep browser versions as strings. Use aliases with lowercase letters, underscores for spaces and dashes, and omit the word `browser` when possible. Check for duplicate aliases first. For example, `Opera Coast` becomes `opera_coast`, `UC Browser` becomes `uc`, and `SeaMonkey` becomes `seamonkey`.

Complex engine descriptors can use `test(parser)` to inspect `parser.getBrowserName()`, for example when choosing between Blink and EdgeHTML for Microsoft Edge.

## Version checks

`Parser.satisfies(checkTree)` accepts browser names or aliases at the top level, or nested under OS or platform keys. Rules support `>`, `>=`, `<`, `<=`, `=`, and `~`; a value can be a string or an array of strings (OR logic). A `~` rule compares a version prefix, such as `~100` matching `100.x.x`.

```js
parser.satisfies({ chrome: '>118', firefox: '~100' });
parser.satisfies({ windows: { chrome: '>118' }, macos: { safari: '>=15' } });
parser.satisfies({ desktop: { chrome: '>118' }, mobile: { safari: '>=15' } });
```

A matching OS or platform scope takes precedence over standalone browser rules. If the matching scope omits the current browser, the result is `false`; if no scope matches and no top-level browser entry applies, the result is `undefined`.

## Development commands

The project uses pnpm. Install dependencies, build Bowser, run its test suite, and check lint with:

```sh
pnpm install
pnpm build
pnpm test
pnpm lint:check
```

The library build uses tsdown and writes `es5.js`, `bundled.js`, and `bowser.mjs` at the repository root. Run `pnpm build` before acceptance tests when source parsing code changed: acceptance tests check both source and the built ES5 file. Unit tests use AVA with Babel registration; pass `skipParsing: true` to `Parser` when testing an isolated method.

To preview, build, or deploy the docs, use `pnpm docs:start`, `pnpm docs:build`, and `pnpm docs:deploy`. The API reference is generated from JSDoc comments before preview and production builds. The site is published at the root of the `gh-pages` branch.

## Code conventions

- Use ES modules with explicit `.js` extensions in imports.
- Prefix private instance properties with an underscore, such as `_ua` and `_hints`.
- Use `void (0)` for comparisons with an undefined value, following the existing legacy convention.
- Add JSDoc to public methods, including parameters, return values, and examples where useful.
- Keep parser descriptor tests readable and explain unusual regular expressions with comments.
