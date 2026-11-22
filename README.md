# Bowser

Bowser is a lightweight browser, operating-system, platform, and rendering-engine detector for browser and Node.js applications. It parses User-Agent strings and provides an API for checking browser names and versions.

[![Financial contributors](https://opencollective.com/bowser/all/badge.svg?label=financial+contributors)](https://opencollective.com/bowser) [![Downloads](https://img.shields.io/npm/dm/bowser)](https://www.npmjs.com/package/bowser)

## Quick start

Install Bowser from npm:

```sh
npm install bowser
```

```js
// CommonJS
const Bowser = require('bowser');

// ES modules
import Bowser, { parse, getParser } from 'bowser';

const result = Bowser.parse(window.navigator.userAgent);
const parser = getParser(window.navigator.userAgent);
const isSupported = parser.satisfies({ chrome: '>=118' });
```

`Bowser.parse()` returns browser, OS, platform, and engine details. The ES module provides named `parse`, `getParser`, and constant-map exports. The maps are also available through the Bowser facade, for example `Bowser.BROWSER_MAP`.

When an OS or platform scope matches but does not define the current browser, `.satisfies()` returns `false` without falling back to a standalone browser rule.

## Documentation

Read the [Bowser documentation](https://bowser-js.github.io/bowser/) for installation details, Client Hints, version filtering, the generated API reference, contributing guidance, support, and the full release history.

## License

MIT. See [LICENSE](LICENSE).
