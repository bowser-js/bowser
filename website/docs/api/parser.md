---
title: "Parser API"
---

> Parser methods, result structures, version matching, and Client Hints access. This page is generated from source JSDoc comments.
## Classes

* [Parser](#Parser)
    * [new Parser(UA, [skipParsingOrHints], [clientHints])](#constructor)
    * [.getHints()](#getHints) ⇒ [<code>ClientHints</code>](#ClientHints) \| <code>null</code>
    * [.hasBrand(brandName)](#hasBrand) ⇒ <code>boolean</code>
    * [.getBrandVersion(brandName)](#getBrandVersion) ⇒ <code>string</code> \| <code>undefined</code>
    * [.getUA()](#getUA) ⇒ <code>String</code>
    * [.test(regex)](#test) ⇒ <code>Boolean</code>
    * [.parseBrowser()](#parseBrowser) ⇒ <code>Object</code>
    * [.getBrowser()](#getBrowser) ⇒ <code>Object</code>
    * [.getBrowserName()](#getBrowserName) ⇒ <code>String</code>
    * [.getBrowserVersion()](#getBrowserVersion) ⇒ <code>String</code> \| <code>undefined</code>
    * [.getOS()](#getOS) ⇒ <code>Object</code>
    * [.parseOS()](#parseOS) ⇒ <code>\*</code> \| <code>Object</code>
    * [.getOSName([toLowerCase])](#getOSName) ⇒ <code>String</code>
    * [.getOSVersion()](#getOSVersion) ⇒ <code>String</code> \| <code>undefined</code>
    * [.getPlatform()](#getPlatform) ⇒ <code>Object</code>
    * [.getPlatformType([toLowerCase])](#getPlatformType) ⇒ <code>String</code>
    * [.parsePlatform()](#parsePlatform) ⇒ <code>Object</code>
    * [.getEngine()](#getEngine) ⇒ <code>Object</code>
    * [.getEngineName([toLowerCase])](#getEngineName) ⇒ <code>String</code>
    * [.parseEngine()](#parseEngine) ⇒ <code>Object</code>
    * [.parse()](#parse) ⇒ [<code>Parser</code>](#Parser)
    * [.getResult()](#getResult) ⇒ [<code>ParsedResult</code>](#ParsedResult)
    * [.satisfies(checkTree)](#satisfies) ⇒ <code>Boolean</code> \| <code>undefined</code>
    * [.isBrowser(browserName, [includingAlias])](#isBrowser) ⇒ <code>boolean</code>
    * [.compareVersions(versionsOrVersion)](#compareVersions) ⇒ <code>boolean</code> \| <code>undefined</code>
    * [.compareVersion(version)](#compareVersion) ⇒ <code>boolean</code> \| <code>undefined</code>
    * [.isOS(osName)](#isOS) ⇒ <code>boolean</code>
    * [.isPlatform(platformType)](#isPlatform) ⇒ <code>boolean</code>
    * [.isEngine(engineName)](#isEngine) ⇒ <code>boolean</code>
    * [.is(anything, [includingAlias])](#is) ⇒ <code>Boolean</code>
    * [.some([anythings])](#some) ⇒ <code>Boolean</code>

## Typedefs

* [ClientHintBrand](#ClientHintBrand) : <code>Object</code>
* [ClientHints](#ClientHints) : <code>Object</code>
* [ParsedResult](#ParsedResult)


## Parser {#Parser}
Parses a User-Agent string into browser, OS, platform, and engine details.
Client Hints are retained for inspection but do not alter parsing results.

**Kind**: global class<br />

* [Parser](#Parser)
    * [new Parser(UA, [skipParsingOrHints], [clientHints])](#constructor)
    * [parser.getHints()](#getHints) ⇒ [<code>ClientHints</code>](#ClientHints) \| <code>null</code>
    * [parser.hasBrand(brandName)](#hasBrand) ⇒ <code>boolean</code>
    * [parser.getBrandVersion(brandName)](#getBrandVersion) ⇒ <code>string</code> \| <code>undefined</code>
    * [parser.getUA()](#getUA) ⇒ <code>String</code>
    * [parser.test(regex)](#test) ⇒ <code>Boolean</code>
    * [parser.parseBrowser()](#parseBrowser) ⇒ <code>Object</code>
    * [parser.getBrowser()](#getBrowser) ⇒ <code>Object</code>
    * [parser.getBrowserName()](#getBrowserName) ⇒ <code>String</code>
    * [parser.getBrowserVersion()](#getBrowserVersion) ⇒ <code>String</code> \| <code>undefined</code>
    * [parser.getOS()](#getOS) ⇒ <code>Object</code>
    * [parser.parseOS()](#parseOS) ⇒ <code>\*</code> \| <code>Object</code>
    * [parser.getOSName([toLowerCase])](#getOSName) ⇒ <code>String</code>
    * [parser.getOSVersion()](#getOSVersion) ⇒ <code>String</code> \| <code>undefined</code>
    * [parser.getPlatform()](#getPlatform) ⇒ <code>Object</code>
    * [parser.getPlatformType([toLowerCase])](#getPlatformType) ⇒ <code>String</code>
    * [parser.parsePlatform()](#parsePlatform) ⇒ <code>Object</code>
    * [parser.getEngine()](#getEngine) ⇒ <code>Object</code>
    * [parser.getEngineName([toLowerCase])](#getEngineName) ⇒ <code>String</code>
    * [parser.parseEngine()](#parseEngine) ⇒ <code>Object</code>
    * [parser.parse()](#parse) ⇒ [<code>Parser</code>](#Parser)
    * [parser.getResult()](#getResult) ⇒ [<code>ParsedResult</code>](#ParsedResult)
    * [parser.satisfies(checkTree)](#satisfies) ⇒ <code>Boolean</code> \| <code>undefined</code>
    * [parser.isBrowser(browserName, [includingAlias])](#isBrowser) ⇒ <code>boolean</code>
    * [parser.compareVersions(versionsOrVersion)](#compareVersions) ⇒ <code>boolean</code> \| <code>undefined</code>
    * [parser.compareVersion(version)](#compareVersion) ⇒ <code>boolean</code> \| <code>undefined</code>
    * [parser.isOS(osName)](#isOS) ⇒ <code>boolean</code>
    * [parser.isPlatform(platformType)](#isPlatform) ⇒ <code>boolean</code>
    * [parser.isEngine(engineName)](#isEngine) ⇒ <code>boolean</code>
    * [parser.is(anything, [includingAlias])](#is) ⇒ <code>Boolean</code>
    * [parser.some([anythings])](#some) ⇒ <code>Boolean</code>


* * *


### new Parser(UA, [skipParsingOrHints], [clientHints]) {#constructor}
Create instance of Parser

**Throws**:

- <code>Error</code> when the UA string is empty


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| UA | <code>String</code> |  | User-Agent string |
| [skipParsingOrHints] | <code>Boolean</code> \| [<code>ClientHints</code>](#ClientHints) | <code>false</code> | Either a boolean to skip parsing, or a ClientHints object containing User-Agent Client Hints data |
| [clientHints] | [<code>ClientHints</code>](#ClientHints) | <code></code> | User-Agent Client Hints data (navigator.userAgentData) |


* * *


### parser.getHints() ⇒ [<code>ClientHints</code>](#ClientHints) \| <code>null</code> {#getHints}
Get Client Hints data

**Kind**: instance method of [<code>Parser</code>](#Parser)<br />
**Access**: public<br />
**Example**<br />
```js
const parser = Bowser.getParser(UA, clientHints);
const hints = parser.getHints();
console.log(hints.platform); // 'Windows'
console.log(hints.mobile); // false
```

* * *


### parser.hasBrand(brandName) ⇒ <code>boolean</code> {#hasBrand}
Check if a brand exists in Client Hints brands array

**Kind**: instance method of [<code>Parser</code>](#Parser)<br />
**Access**: public<br />

| Param | Type | Description |
| --- | --- | --- |
| brandName | <code>string</code> | The brand name to check for |

**Example**<br />
```js
const parser = Bowser.getParser(UA, clientHints);
if (parser.hasBrand('Google Chrome')) {
  console.log('Chrome detected!');
}
```

* * *


### parser.getBrandVersion(brandName) ⇒ <code>string</code> \| <code>undefined</code> {#getBrandVersion}
Get brand version from Client Hints

**Kind**: instance method of [<code>Parser</code>](#Parser)<br />
**Access**: public<br />

| Param | Type | Description |
| --- | --- | --- |
| brandName | <code>string</code> | The brand name to get version for |

**Example**<br />
```js
const parser = Bowser.getParser(UA, clientHints);
const version = parser.getBrandVersion('Google Chrome');
console.log(version); // '131'
```

* * *


### parser.getUA() ⇒ <code>String</code> {#getUA}
Get the User-Agent string of the current Parser instance.

**Kind**: instance method of [<code>Parser</code>](#Parser)<br />
**Returns**: <code>String</code> - User-Agent string of the current Parser object.<br />
**Access**: public<br />

* * *


### parser.test(regex) ⇒ <code>Boolean</code> {#test}
Test a UA string for a regexp

**Kind**: instance method of [<code>Parser</code>](#Parser)<br />

| Param | Type |
| --- | --- |
| regex | <code>RegExp</code> |


* * *


### parser.parseBrowser() ⇒ <code>Object</code> {#parseBrowser}
Parse the User-Agent string and save the result to `parsedResult.browser`.

**Kind**: instance method of [<code>Parser</code>](#Parser)<br />

* * *


### parser.getBrowser() ⇒ <code>Object</code> {#getBrowser}
Get parsed browser object

**Kind**: instance method of [<code>Parser</code>](#Parser)<br />
**Access**: public<br />

* * *


### parser.getBrowserName() ⇒ <code>String</code> {#getBrowserName}
Get browser's name

**Kind**: instance method of [<code>Parser</code>](#Parser)<br />
**Returns**: <code>String</code> - Browser's name or an empty string<br />
**Access**: public<br />

* * *


### parser.getBrowserVersion() ⇒ <code>String</code> \| <code>undefined</code> {#getBrowserVersion}
Get browser's version

**Kind**: instance method of [<code>Parser</code>](#Parser)<br />
**Returns**: <code>String</code> \| <code>undefined</code> - Version of the browser, when available.<br />
**Access**: public<br />

* * *


### parser.getOS() ⇒ <code>Object</code> {#getOS}
Get parsed operating-system details.

**Kind**: instance method of [<code>Parser</code>](#Parser)<br />
**Example**<br />
```js
this.getOS();
{
  name: 'macOS',
  version: '10.11.12'
}
```

* * *


### parser.parseOS() ⇒ <code>\*</code> \| <code>Object</code> {#parseOS}
Parse OS and save it to this.parsedResult.os

**Kind**: instance method of [<code>Parser</code>](#Parser)<br />

* * *


### parser.getOSName([toLowerCase]) ⇒ <code>String</code> {#getOSName}
Get OS name

**Kind**: instance method of [<code>Parser</code>](#Parser)<br />
**Returns**: <code>String</code> - name of the OS — macOS, Windows, Linux, etc.<br />

| Param | Type | Description |
| --- | --- | --- |
| [toLowerCase] | <code>Boolean</code> | return lower-cased value |


* * *


### parser.getOSVersion() ⇒ <code>String</code> \| <code>undefined</code> {#getOSVersion}
Get OS version

**Kind**: instance method of [<code>Parser</code>](#Parser)<br />
**Returns**: <code>String</code> \| <code>undefined</code> - Full version with dots, if available.<br />

* * *


### parser.getPlatform() ⇒ <code>Object</code> {#getPlatform}
Get parsed platform details.

**Kind**: instance method of [<code>Parser</code>](#Parser)<br />

* * *


### parser.getPlatformType([toLowerCase]) ⇒ <code>String</code> {#getPlatformType}
Get platform type, such as `desktop`, `mobile`, `tablet`, `tv`, or `bot`.

**Kind**: instance method of [<code>Parser</code>](#Parser)<br />
**Returns**: <code>String</code> - Platform type, or an empty string when unknown.<br />

| Param | Type | Default |
| --- | --- | --- |
| [toLowerCase] | <code>Boolean</code> | <code>false</code> |


* * *


### parser.parsePlatform() ⇒ <code>Object</code> {#parsePlatform}
Parse platform and save it to `parsedResult.platform`.

**Kind**: instance method of [<code>Parser</code>](#Parser)<br />

* * *


### parser.getEngine() ⇒ <code>Object</code> {#getEngine}
Get parsed engine

**Kind**: instance method of [<code>Parser</code>](#Parser)<br />

* * *


### parser.getEngineName([toLowerCase]) ⇒ <code>String</code> {#getEngineName}
Get the rendering-engine name.

**Kind**: instance method of [<code>Parser</code>](#Parser)<br />
**Returns**: <code>String</code> - Engine name or an empty string.<br />
**Access**: public<br />

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [toLowerCase] | <code>Boolean</code> | <code>false</code> | Return the name in lowercase. |


* * *


### parser.parseEngine() ⇒ <code>Object</code> {#parseEngine}
Parse engine and save it to `parsedResult.engine`.

**Kind**: instance method of [<code>Parser</code>](#Parser)<br />

* * *


### parser.parse() ⇒ [<code>Parser</code>](#Parser) {#parse}
Parse full information about the browser

**Kind**: instance method of [<code>Parser</code>](#Parser)<br />

* * *


### parser.getResult() ⇒ [<code>ParsedResult</code>](#ParsedResult) {#getResult}
Get parsed result

**Kind**: instance method of [<code>Parser</code>](#Parser)<br />

* * *


### parser.satisfies(checkTree) ⇒ <code>Boolean</code> \| <code>undefined</code> {#satisfies}
Check if parsed browser matches certain conditions

**Kind**: instance method of [<code>Parser</code>](#Parser)<br />
**Returns**: <code>Boolean</code> \| <code>undefined</code> - Whether the browser satisfies the set conditions or not.
Returns `false` when matching OS or platform definitions do not define the browser.
Returns `undefined` when no scope matches and the browser is not defined at the top level.<br />

| Param | Type | Description |
| --- | --- | --- |
| checkTree | <code>Object</code> | A map of browser names or aliases to version rules, optionally nested under OS names or platform types. |

**Example**<br />
```js
const browser = Bowser.getParser(window.navigator.userAgent);
if (browser.satisfies({chrome: '>118.01.1322' }))
// or with os
if (browser.satisfies({windows: { chrome: '>118.01.1322' } }))
// or with platforms
if (browser.satisfies({desktop: { chrome: '>118.01.1322' } }))

Version rules support `>`, `>=`, `<`, `<=`, `=`, and `~`; values may also
be arrays of rules, where any matching rule returns true. A matching OS or
platform scope takes precedence over top-level browser rules. If a matching
scope does not include the current browser, the result is false. If no
scope matches and no top-level browser entry applies, the result is undefined.
```

* * *


### parser.isBrowser(browserName, [includingAlias]) ⇒ <code>boolean</code> {#isBrowser}
Check if the browser name equals the passed string

**Kind**: instance method of [<code>Parser</code>](#Parser)<br />

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| browserName | <code>string</code> |  | The string to compare with the browser name |
| [includingAlias] |  | <code>false</code> | The flag showing whether alias will be included into comparison |


* * *


### parser.compareVersions(versionsOrVersion) ⇒ <code>boolean</code> \| <code>undefined</code> {#compareVersions}
Check whether the browser version matches one or more version rules.
Arrays use OR logic and return true when any rule matches.

**Kind**: instance method of [<code>Parser</code>](#Parser)<br />
**Returns**: <code>boolean</code> \| <code>undefined</code> - Whether a rule matches, or undefined if a single rule is checked and no browser version is available.<br />
**Access**: public<br />

| Param | Type | Description |
| --- | --- | --- |
| versionsOrVersion | <code>string</code> \| <code>Array.&lt;string&gt;</code> | A version rule or rules. |


* * *


### parser.compareVersion(version) ⇒ <code>boolean</code> \| <code>undefined</code> {#compareVersion}
Compare the browser version against one version rule.
Supported operators are `>`, `>=`, `<`, `<=`, `=`, and `~`.

**Kind**: instance method of [<code>Parser</code>](#Parser)<br />
**Returns**: <code>boolean</code> \| <code>undefined</code> - Whether the rule matches, or undefined if the browser has no version.<br />
**Access**: public<br />

| Param | Type | Description |
| --- | --- | --- |
| version | <code>string</code> | Version rule to compare. |


* * *


### parser.isOS(osName) ⇒ <code>boolean</code> {#isOS}
Check if the OS name equals the passed string

**Kind**: instance method of [<code>Parser</code>](#Parser)<br />

| Param | Type | Description |
| --- | --- | --- |
| osName | <code>string</code> | The string to compare with the OS name |


* * *


### parser.isPlatform(platformType) ⇒ <code>boolean</code> {#isPlatform}
Check if the platform type equals the passed string

**Kind**: instance method of [<code>Parser</code>](#Parser)<br />

| Param | Type | Description |
| --- | --- | --- |
| platformType | <code>string</code> | The string to compare with the platform type |


* * *


### parser.isEngine(engineName) ⇒ <code>boolean</code> {#isEngine}
Check if the engine name equals the passed string

**Kind**: instance method of [<code>Parser</code>](#Parser)<br />

| Param | Type | Description |
| --- | --- | --- |
| engineName | <code>string</code> | The string to compare with the engine name |


* * *


### parser.is(anything, [includingAlias]) ⇒ <code>Boolean</code> {#is}
Is anything? Check if the browser is called "anything",
the OS called "anything" or the platform called "anything"

**Kind**: instance method of [<code>Parser</code>](#Parser)<br />

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| anything | <code>String</code> |  |  |
| [includingAlias] |  | <code>false</code> | The flag showing whether alias will be included into comparison |


* * *


### parser.some([anythings]) ⇒ <code>Boolean</code> {#some}
Check if any of the given values satisfies this.is(anything)

**Kind**: instance method of [<code>Parser</code>](#Parser)<br />

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [anythings] | <code>Array.&lt;String&gt;</code> | <code>[]</code> | Browser, OS, platform, or engine names to check. |


* * *


## ClientHintBrand : <code>Object</code> {#ClientHintBrand}
A brand and version reported by User-Agent Client Hints.

**Kind**: global typedef<br />
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| brand | <code>string</code> | Brand name, such as `Google Chrome`. |
| version | <code>string</code> | Version reported for the brand. |


* * *


## ClientHints : <code>Object</code> {#ClientHints}
**Kind**: global typedef<br />
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [brands] | [<code>Array.&lt;ClientHintBrand&gt;</code>](#ClientHintBrand) | Brand and version entries. |
| [mobile] | <code>boolean</code> | Whether the device is mobile |
| [platform] | <code>string</code> | Platform name (e.g., "Windows", "macOS") |
| [platformVersion] | <code>string</code> | Platform version |
| [architecture] | <code>string</code> | CPU architecture |
| [model] | <code>string</code> | Device model |
| [wow64] | <code>boolean</code> | Whether running under WoW64 |


* * *


## ParsedResult {#ParsedResult}
**Kind**: global typedef<br />
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| browser | <code>Object</code> |  |
| [browser.name] | <code>String</code> \| <code>undefined</code> | Browser name, like `"Chrome"` or `"Internet Explorer"` |
| [browser.version] | <code>String</code> \| <code>undefined</code> | Browser version as a String `"12.01.45334.10"` |
| os | <code>Object</code> |  |
| [os.name] | <code>String</code> \| <code>undefined</code> | OS name, like `"Windows"` or `"macOS"` |
| [os.version] | <code>String</code> \| <code>undefined</code> | OS version, like `"NT 5.1"` or `"10.11.1"` |
| [os.versionName] | <code>String</code> \| <code>undefined</code> | OS name, like `"XP"` or `"High Sierra"` |
| platform | <code>Object</code> |  |
| [platform.type] | <code>String</code> \| <code>undefined</code> | Platform type: `desktop`, `tablet`, `mobile`, `tv`, or `bot`. |
| [platform.vendor] | <code>String</code> \| <code>undefined</code> | Vendor of the device, like `"Apple"` or `"Samsung"` |
| [platform.model] | <code>String</code> \| <code>undefined</code> | Device model, like `"iPhone"` or `"Kindle Fire HD 7"` |
| engine | <code>Object</code> |  |
| [engine.name] | <code>String</code> \| <code>undefined</code> | Can be any of this: `WebKit`, `Blink`, `Gecko`, `Trident`, `Presto`, `EdgeHTML`, `LibWeb` |
| [engine.version] | <code>String</code> \| <code>undefined</code> | String version of the engine |


* * *
