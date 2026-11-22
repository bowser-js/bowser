---
title: "Bowser API"
---

> The Bowser facade, parsing entry points, and public constant maps. This page is generated from source JSDoc comments.

## Bowser {#Bowser}
Bowser is a static object, that provides an API to the Parsers

**Kind**: global class<br />

* [Bowser](#Bowser)
    * [Bowser.BROWSER_MAP](#BROWSER_MAP) : <code>Object.&lt;string, string&gt;</code>
    * [Bowser.ENGINE_MAP](#ENGINE_MAP) : <code>Object.&lt;string, string&gt;</code>
    * [Bowser.OS_MAP](#OS_MAP) : <code>Object.&lt;string, string&gt;</code>
    * [Bowser.PLATFORMS_MAP](#PLATFORMS_MAP) : <code>Object.&lt;string, string&gt;</code>
    * [Bowser.getParser(UA, [skipParsingOrHints], [clientHints])](#getParser) ⇒ <code>Parser</code>
    * [Bowser.parse(UA, [clientHints])](#parse) ⇒ <code>ParsedResult</code>


* * *


### Bowser.BROWSER\_MAP : <code>Object.&lt;string, string&gt;</code> {#BROWSER_MAP}
Map browser aliases to display names.

**Kind**: static property of [<code>Bowser</code>](#Bowser)<br />
**Access**: public<br />

* * *


### Bowser.ENGINE\_MAP : <code>Object.&lt;string, string&gt;</code> {#ENGINE_MAP}
Map rendering-engine identifiers to display names.

**Kind**: static property of [<code>Bowser</code>](#Bowser)<br />
**Access**: public<br />

* * *


### Bowser.OS\_MAP : <code>Object.&lt;string, string&gt;</code> {#OS_MAP}
Map operating-system identifiers to display names.

**Kind**: static property of [<code>Bowser</code>](#Bowser)<br />
**Access**: public<br />

* * *


### Bowser.PLATFORMS\_MAP : <code>Object.&lt;string, string&gt;</code> {#PLATFORMS_MAP}
Map platform identifiers to display names.

**Kind**: static property of [<code>Bowser</code>](#Bowser)<br />
**Access**: public<br />

* * *


### Bowser.getParser(UA, [skipParsingOrHints], [clientHints]) ⇒ <code>Parser</code> {#getParser}
Creates a [Parser](../parser/) instance

**Kind**: static method of [<code>Bowser</code>](#Bowser)<br />
**Throws**:

- <code>Error</code> when UA is not a String


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| UA | <code>String</code> |  | UserAgent string |
| [skipParsingOrHints] | <code>Boolean</code> \| <code>Object</code> | <code>false</code> | Either a boolean to skip parsing, or a ClientHints object (navigator.userAgentData) |
| [clientHints] | <code>Object</code> | <code></code> | User-Agent Client Hints data (navigator.userAgentData) |

**Example**<br />
```js
const parser = Bowser.getParser(window.navigator.userAgent);
const result = parser.getResult();
```
**Example**<br />
```js
// With User-Agent Client Hints
const parser = Bowser.getParser(
  window.navigator.userAgent,
  window.navigator.userAgentData
);
```

* * *


### Bowser.parse(UA, [clientHints]) ⇒ <code>ParsedResult</code> {#parse}
Creates a [Parser](../parser/) instance and runs [Parser.getResult](../parser/#getResult) immediately

**Kind**: static method of [<code>Bowser</code>](#Bowser)<br />

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| UA | <code>String</code> |  | UserAgent string |
| [clientHints] | <code>Object</code> | <code></code> | User-Agent Client Hints data (navigator.userAgentData) |

**Example**<br />
```js
const result = Bowser.parse(window.navigator.userAgent);
```
**Example**<br />
```js
// With User-Agent Client Hints
const result = Bowser.parse(
  window.navigator.userAgent,
  window.navigator.userAgentData
);
```

* * *
