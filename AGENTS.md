# Agents Instructions for Bowser

## Architecture

Bowser parses User-Agent strings through a pipeline of four independent parser modules, each exporting an ordered array of descriptors:

- `src/parser-browsers.js` → `src/parser-os.js` → `src/parser-platforms.js` → `src/parser-engines.js`

`src/parser.js` (the `Parser` class) orchestrates these by iterating each descriptor list using `Utils.find()`, testing via regex arrays or custom `test(parser)` functions, then calling `describe(ua)` on the first match. **Descriptor order matters** — more specific browsers (e.g., Opera, Edge) must come before generic ones (e.g., Chrome, Safari) to avoid false matches.

`src/bowser.js` is a stateless facade exposing `Bowser.getParser(UA)` and `Bowser.parse(UA)`. `src/constants.js` holds bidirectional maps (`BROWSER_ALIASES_MAP` ↔ `BROWSER_MAP`) used for `satisfies()` alias lookups. `src/utils.js` provides regex helpers (`getFirstMatch`, `getSecondMatch`) and version comparison logic.

Also supports User-Agent Client Hints via an optional `clientHints` parameter on the constructor.

## Commands

- **Build**: `npm run build` (Webpack + Babel → `es5.js`, `bundled.js`)
- **Test**: `npm test` (AVA — runs both `test/unit/` and `test/acceptance/`)
- **Lint**: `npm run lint:check` / `npm run lint:fix`

## Adding Browser/Bot Support (5 files to touch)

1. **`src/parser-browsers.js`**: Add a descriptor with `test` (regex array) and `describe(ua)` returning `{ name, version }`. Place it above any generic browser it might conflict with.
2. **`src/parser-platforms.js`**: Add a platform descriptor if the new entry is a bot (return `{ type: PLATFORMS_MAP.bot, vendor }`) or needs specific device detection.
3. **`src/constants.js`**: Add entries to both `BROWSER_ALIASES_MAP` (display name → alias) and `BROWSER_MAP` (alias → display name). Alias convention: lowercase, underscores for spaces/dashes, drop "browser" suffix (e.g., `'UC Browser'` → `'uc'`, `'Opera Coast'` → `'opera_coast'`).
4. **`test/acceptance/useragentstrings.yml`**: Add real UA strings under the browser's display name with full `spec` (browser, os, platform, engine). The acceptance test iterates this YAML and asserts `Bowser.parse(ua)` deep-equals the spec. The top-level key **must match** the browser's `name` field exactly.
5. **`index.d.ts`**: Update TypeScript definitions if adding new API surface.

Run `npm test` to validate — acceptance tests auto-generate from the YAML file.

## Descriptor Pattern

Every parser file exports an array of descriptors following this pattern:

```js
{
  test: [/someregex/i],           // array of RegExp, OR:
  // test(parser) { return parser.test(/regex/); },  // function form for complex logic
  describe(ua) {
    return {
      name: 'BrowserName',
      version: Utils.getFirstMatch(/someregex\/(\d+(\.\d+)+)/i, ua),
    };
  },
}
```

Engine descriptors in `src/parser-engines.js` may use `test(parser)` to access `parser.getBrowserName()` for browser-dependent engine detection (e.g., Edge → Blink vs EdgeHTML).

## `satisfies()` Version DSL

`Parser.satisfies(checkTree)` accepts a nested object for conditional browser/OS/platform checks. Keys in the check tree are resolved via `BROWSER_ALIASES_MAP` (so both `'chrome'` and `'Chrome'` work). Version operators: `>`, `>=`, `<`, `<=`, `=`, `~` (loose/prefix match). Values can be a single string or an array of version strings (OR logic).

```js
// Simple browser check
parser.satisfies({ chrome: '>118', firefox: '~100' })

// Nested by OS or platform
parser.satisfies({ windows: { chrome: '>118' }, macos: { safari: '>=15' } })
parser.satisfies({ desktop: { chrome: '>118' }, mobile: { safari: '>=15' } })
```

Returns `true`/`false` if the browser matches, or `undefined` if the browser isn't mentioned in the tree. The `~` operator does a loose prefix comparison (e.g., `~100` matches `100.x.x`).

## Code Conventions

- ES6 modules with **explicit `.js` extensions** in imports: `import Utils from './utils.js'`
- Airbnb ESLint base; underscore-prefixed private properties (`_ua`, `_hints`)
- Use `void (0)` instead of `undefined` for comparisons (legacy convention)
- JSDoc on all public methods with `@param`, `@return`, `@example`
- Browser versions are always **strings**, never numbers

## Testing Details

- **Acceptance tests** (`test/acceptance/test-list-of-ua.js`): Loads `useragentstrings.yml`, tests every UA against both `src/bowser.js` (ES6) and `es5.js` (built) — so **build before running tests** if you changed source.
- **Unit tests** (`test/unit/`): Test individual Parser/Bowser/Utils methods. Use `new Parser(UA, true)` (skipParsing=true) for isolated method testing.
- Test framework: AVA with Babel transpilation via `@babel/register`.

## Branching

- **`master`** is the production branch.

## Common Pitfalls

- Always check `BROWSER_ALIASES_MAP` for existing aliases before adding new ones.
- User-Agent strings can be complex; test edge cases thoroughly.
- Remember to update both the alias map and the reverse map in constants.
- Browser versions should be treated as strings, not numbers.
- Keep regex patterns readable with comments explaining their purpose.
