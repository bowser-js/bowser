---
title: Filtering browsers
sidebar_label: Filtering browsers
---

# Filtering browsers

`Parser.satisfies(checkTree)` checks the current browser against version rules. A browser key can be a display name or a short alias such as `chrome`, `ie`, or `safari`.

The full alias mapping is maintained in [`src/constants.js`](https://github.com/bowser-js/bowser/blob/master/src/constants.js).

```js
const parser = Bowser.getParser(window.navigator.userAgent);

const supported = parser.satisfies({
  windows: { 'internet explorer': '>10' },
  macos: { safari: '>10.1' },
  mobile: { safari: '>=9', 'android browser': '>3.10' },
  chrome: '>118',
  firefox: '>31',
  opera: '>=22',
});
```

Version rules may be a single string or an array. An array matches when any listed rule matches.

| Operator | Meaning | Example |
| --- | --- | --- |
| `>` / `<` | Strictly greater / less than | `'>31'` |
| `>=` / `<=` | Greater / less than or equal, comparing the supplied precision | `'>=15'` |
| `=` | Equal version | `'=20.1.1432'` |
| `~` | Loose, prefix-style version comparison | `'~20.1'` |

```js
parser.satisfies({ chrome: '~20.1.1432' });
parser.satisfies({ chrome: '=20.1.1432' });
parser.satisfies({ chrome: ['>=120', '~118'] });
```

## OS and platform scopes

Rules may be nested under an OS name or a platform type such as `desktop`, `mobile`, or `tablet`. A matching OS or platform scope takes precedence over a top-level browser rule. If a matching scope does not define the current browser, `satisfies()` returns `false` rather than falling back to the top-level rule. If no scope matches and the browser has no top-level entry, it returns `undefined`.

```js
parser.satisfies({
  windows: { chrome: '>=118' },
  mobile: { safari: '>=16' },
  chrome: '>118',
});
```

In the example, a Windows browser is checked against the Windows rules first; a mobile browser is checked against the mobile rules. The standalone Chrome rule applies when neither scope matches.

For checks across names without version conditions, use `is()`, `isBrowser()`, `isOS()`, `isPlatform()`, `isEngine()`, or `some()`. See the [Parser API](../api/parser).
