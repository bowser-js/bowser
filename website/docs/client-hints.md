---
title: User-Agent Client Hints
sidebar_label: Client Hints
---

# User-Agent Client Hints

Bowser can retain a User-Agent Client Hints object alongside the User-Agent string. Pass the object to `getParser()` and read it with `getHints()`, `hasBrand()`, and `getBrandVersion()`.

```js
const parser = Bowser.getParser(
  navigator.userAgent,
  navigator.userAgentData,
);

const hints = parser.getHints();
console.log(hints?.platform);

if (parser.hasBrand('Google Chrome')) {
  console.log(parser.getBrandVersion('Google Chrome'));
}
```

These methods expose the supplied hints for your application to inspect. The current parser does not use Client Hints to change the browser, OS, platform, or engine results; those results are parsed from the User-Agent string.

`Bowser.parse(UA, clientHints)` accepts the same second argument as `Bowser.getParser()`. It returns the parsed User-Agent result; use `getParser()` when your application also needs to inspect the stored hints.

The supported hint shape is:

```js
{
  brands: [
    { brand: 'Google Chrome', version: '131' },
    { brand: 'Chromium', version: '131' },
    { brand: 'Not_A Brand', version: '24' }
  ],
  mobile: false,
  platform: 'Windows',
  platformVersion: '15.0.0',
  architecture: 'x86',
  model: '',
  wow64: false
}
```

`brands`, `mobile`, `platform`, `platformVersion`, `architecture`, `model`, and `wow64` are optional. `hasBrand()` compares brand names without case sensitivity. `getBrandVersion()` returns `undefined` when the brand is absent.

The same object can be passed as the second argument to the `Parser` constructor. The constructor also supports a `skipParsing` boolean followed by Client Hints as its third argument. See the [API reference](../api/parser).
