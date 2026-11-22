---
title: Installation and usage
sidebar_label: Getting started
---

# Installation and usage

Install Bowser from npm:

```sh
npm install bowser
```

Bowser publishes a CommonJS/UMD build for `require()` and browser script tags, and a real ES module for `import`.

```js
// CommonJS
const Bowser = require('bowser');

// ES modules
import Bowser, { getParser, parse } from 'bowser';

// Namespace import, also supported for TypeScript consumers
import * as BowserNamespace from 'bowser';
```

The ES module also exposes `parse`, `getParser`, and the four constant maps as named exports, so bundlers can remove unused exports. The default export remains the Bowser facade.

```js
import { BROWSER_MAP, getParser, parse } from 'bowser';
```

The constant maps are also available on the default facade as `Bowser.BROWSER_MAP`, `Bowser.ENGINE_MAP`, `Bowser.OS_MAP`, and `Bowser.PLATFORMS_MAP`.

The package's default `require('bowser')` and browser build are ES5-transpiled and do not include polyfills. If your application does not provide the needed polyfills, use the bundled build:

```js
const Bowser = require('bowser/bundled');
```

`bundled.js` includes the package's `core-js` polyfills. If the application already supplies its own polyfills, use the default `es5.js` build instead.

For a browser script tag, Bowser attaches itself to the lowercase global `bowser`:

```html
<script src="https://unpkg.com/bowser@2/es5.js"></script>
<script>
  console.log(bowser.parse(window.navigator.userAgent));
</script>
```

The main package entry points are:

| Import path | Build |
| --- | --- |
| `bowser` | CommonJS resolves to the ES5 UMD build; ESM resolves to the ES module. |
| `bowser/es5` or `bowser/es5.js` | ES5 UMD build without polyfills. |
| `bowser/bundled` or `bowser/bundled.js` | ES5 UMD build with `core-js` polyfills. |
| `bowser/bowser.mjs` | ES module build. |

The package also publishes source subpaths for Bowser, Parser, constants, browser/OS/platform/engine parser lists, and utilities. Each has both an extensionless and `.js` export where available. See the [API reference](../api/bowser) and [`package.json`](https://github.com/bowser-js/bowser/blob/master/package.json) for the full export map.

<a id="parse-browser-details"></a>

## Browser properties detection

Use `getParser()` when you want to call individual parser methods:

```js
const parser = Bowser.getParser(window.navigator.userAgent);

console.log(parser.getBrowserName());
// "Internet Explorer"

console.log(parser.getBrowserVersion());
// "11.0"
```

Use `parse()` to get browser, operating-system, platform, and engine details at once:

```js
const result = Bowser.parse(window.navigator.userAgent);
```

The result has this shape. Fields may be absent when a User-Agent string does not provide enough information.

```js
{
  browser: { name: 'Internet Explorer', version: '11.0' },
  os: { name: 'Windows', version: 'NT 6.3', versionName: '8.1' },
  platform: { type: 'desktop' },
  engine: { name: 'Trident', version: '7.0' }
}
```

See the [generated API reference](../api/parser) for all parser methods and result types.
