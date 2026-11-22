---
title: "Utilities API"
---

> Documented utility methods available from the `src/utils.js` package subpath. This page is generated from source JSDoc comments.

## utils {#utils}

* [utils](#utils)
    * [Utils](#Utils) ⏏
        * [Utils.getFirstMatch(regexp, ua)](#getFirstMatch) ⇒ <code>string</code>
        * [Utils.getSecondMatch(regexp, ua)](#getSecondMatch) ⇒ <code>string</code>
        * [Utils.matchAndReturnConst(regexp, ua, _const)](#matchAndReturnConst) ⇒ <code>\*</code> \| <code>undefined</code>
        * [Utils.isFirefoxOnIpad(ua)](#isFirefoxOnIpad) ⇒ <code>Boolean</code>
        * [Utils.getWindowsVersionName(version)](#getWindowsVersionName) ⇒ <code>string</code> \| <code>undefined</code>
        * [Utils.getMacOSVersionName(version)](#getMacOSVersionName) ⇒ <code>string</code> \| <code>undefined</code>
        * [Utils.getAndroidVersionName(version)](#getAndroidVersionName) ⇒ <code>string</code> \| <code>undefined</code>
        * [Utils.getVersionPrecision(version)](#getVersionPrecision) ⇒ <code>number</code>
        * [Utils.compareVersions(versionA, versionB, [isLoose])](#compareVersions) ⇒ <code>Number</code>
        * [Utils.map(arr, iterator)](#map) ⇒ <code>Array</code>
        * [Utils.find(arr, predicate)](#find) ⇒ <code>\*</code> \| <code>undefined</code>
        * [Utils.assign(obj)](#assign) ⇒ <code>Object</code>
        * [Utils.getBrowserAlias(browserName)](#getBrowserAlias) ⇒ <code>string</code> \| <code>undefined</code>
        * [Utils.getBrowserTypeByAlias(browserAlias)](#getBrowserTypeByAlias) ⇒ <code>string</code>


* * *


### Utils ⏏ {#Utils}
Utility helpers used by Bowser's parsers and exposed from the `src/utils.js` package subpath.

**Kind**: Exported class<br />

* * *


#### Utils.getFirstMatch(regexp, ua) ⇒ <code>string</code> {#getFirstMatch}
Get the first captured match from a User-Agent string, or an empty string.

**Kind**: static method of [<code>Utils</code>](#Utils)<br />

| Param | Type |
| --- | --- |
| regexp | <code>RegExp</code> |
| ua | <code>String</code> |


* * *


#### Utils.getSecondMatch(regexp, ua) ⇒ <code>string</code> {#getSecondMatch}
Get the second captured match from a User-Agent string, or an empty string.

**Kind**: static method of [<code>Utils</code>](#Utils)<br />

| Param | Type |
| --- | --- |
| regexp | <code>RegExp</code> |
| ua | <code>String</code> |


* * *


#### Utils.matchAndReturnConst(regexp, ua, _const) ⇒ <code>\*</code> \| <code>undefined</code> {#matchAndReturnConst}
Match a regexp and return a constant or undefined

**Kind**: static method of [<code>Utils</code>](#Utils)<br />

| Param | Type | Description |
| --- | --- | --- |
| regexp | <code>RegExp</code> |  |
| ua | <code>String</code> |  |
| _const | <code>\*</code> | Any const that will be returned if regexp matches the string |


* * *


#### Utils.isFirefoxOnIpad(ua) ⇒ <code>Boolean</code> {#isFirefoxOnIpad}
Check whether a UA is Firefox on iPad: "Macintosh", then later " FxiOS",
then later a "/". Same result as /Macintosh(.*?) FxiOS(.*?)\//.test(ua),
but linear: that regexp backtracks polynomially on crafted input.

**Kind**: static method of [<code>Utils</code>](#Utils)<br />
**Access**: public<br />

| Param | Type |
| --- | --- |
| ua | <code>String</code> |


* * *


#### Utils.getWindowsVersionName(version) ⇒ <code>string</code> \| <code>undefined</code> {#getWindowsVersionName}
Get the display name for a Windows version identifier.

**Kind**: static method of [<code>Utils</code>](#Utils)<br />
**Returns**: <code>string</code> \| <code>undefined</code> - Version name, or undefined when it is unknown.<br />
**Access**: public<br />

| Param | Type | Description |
| --- | --- | --- |
| version | <code>string</code> | Windows version, such as `NT 6.1`. |

**Example**<br />
```js
Utils.getWindowsVersionName('NT 6.1'); // '7'
```

* * *


#### Utils.getMacOSVersionName(version) ⇒ <code>string</code> \| <code>undefined</code> {#getMacOSVersionName}
Get macOS version name
   10.5 - Leopard
   10.6 - Snow Leopard
   10.7 - Lion
   10.8 - Mountain Lion
   10.9 - Mavericks
   10.10 - Yosemite
   10.11 - El Capitan
   10.12 - Sierra
   10.13 - High Sierra
   10.14 - Mojave
   10.15 - Catalina
   11 - Big Sur
   12 - Monterey
   13 - Ventura
   14 - Sonoma
   15 - Sequoia

**Kind**: static method of [<code>Utils</code>](#Utils)<br />
**Returns**: <code>string</code> \| <code>undefined</code> - versionName<br />

| Param | Type |
| --- | --- |
| version | <code>string</code> |

**Example**<br />
```js
getMacOSVersionName("10.14") // 'Mojave'
```

* * *


#### Utils.getAndroidVersionName(version) ⇒ <code>string</code> \| <code>undefined</code> {#getAndroidVersionName}
Get Android version name
   1.5 - Cupcake
   1.6 - Donut
   2.0 - Eclair
   2.1 - Eclair
   2.2 - Froyo
   2.x - Gingerbread
   3.x - Honeycomb
   4.0 - Ice Cream Sandwich
   4.1 - Jelly Bean
   4.4 - KitKat
   5.x - Lollipop
   6.x - Marshmallow
   7.x - Nougat
   8.x - Oreo
   9.x - Pie

**Kind**: static method of [<code>Utils</code>](#Utils)<br />
**Returns**: <code>string</code> \| <code>undefined</code> - versionName<br />

| Param | Type |
| --- | --- |
| version | <code>string</code> |

**Example**<br />
```js
getAndroidVersionName("7.0") // 'Nougat'
```

* * *


#### Utils.getVersionPrecision(version) ⇒ <code>number</code> {#getVersionPrecision}
Get version precisions count

**Kind**: static method of [<code>Utils</code>](#Utils)<br />

| Param | Type |
| --- | --- |
| version | <code>string</code> |

**Example**<br />
```js
getVersionPrecision("1.10.3") // 3
```

* * *


#### Utils.compareVersions(versionA, versionB, [isLoose]) ⇒ <code>Number</code> {#compareVersions}
Calculate browser version weight

**Kind**: static method of [<code>Utils</code>](#Utils)<br />
**Returns**: <code>Number</code> - comparison result: -1 when versionA is lower,
1 when versionA is bigger, 0 when both equal<br />

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| versionA | <code>String</code> |  | versions versions to compare |
| versionB | <code>String</code> |  | versions versions to compare |
| [isLoose] | <code>boolean</code> | <code>false</code> | enable loose comparison |

**Example**<br />
```js
compareVersions('1.10.2.1',  '1.8.2.1.90')    // 1
  compareVersions('1.010.2.1', '1.09.2.1.90');  // 1
  compareVersions('1.10.2.1',  '1.10.2.1');     // 0
  compareVersions('1.10.2.1',  '1.0800.2');     // -1
  compareVersions('1.10.2.1',  '1.10',  true);  // 0
```

* * *


#### Utils.map(arr, iterator) ⇒ <code>Array</code> {#map}
Array::map polyfill

**Kind**: static method of [<code>Utils</code>](#Utils)<br />
**Returns**: <code>Array</code> - A new array containing each mapped value.<br />

| Param | Type |
| --- | --- |
| arr | <code>Array</code> |
| iterator | <code>function</code> |


* * *


#### Utils.find(arr, predicate) ⇒ <code>\*</code> \| <code>undefined</code> {#find}
Array::find polyfill

**Kind**: static method of [<code>Utils</code>](#Utils)<br />
**Returns**: <code>\*</code> \| <code>undefined</code> - The first matching value, or undefined when none match.<br />

| Param | Type |
| --- | --- |
| arr | <code>Array</code> |
| predicate | <code>function</code> |


* * *


#### Utils.assign(obj) ⇒ <code>Object</code> {#assign}
Object::assign polyfill

**Kind**: static method of [<code>Utils</code>](#Utils)<br />

| Param | Type |
| --- | --- |
| obj | <code>Object</code> |
| ...objs | <code>Object</code> |


* * *


#### Utils.getBrowserAlias(browserName) ⇒ <code>string</code> \| <code>undefined</code> {#getBrowserAlias}
Get short version/alias for a browser name

**Kind**: static method of [<code>Utils</code>](#Utils)<br />

| Param | Type |
| --- | --- |
| browserName | <code>string</code> |

**Example**<br />
```js
getBrowserAlias('Microsoft Edge') // edge
```

* * *


#### Utils.getBrowserTypeByAlias(browserAlias) ⇒ <code>string</code> {#getBrowserTypeByAlias}
Get browser name for a short version/alias

**Kind**: static method of [<code>Utils</code>](#Utils)<br />
**Returns**: <code>string</code> - Browser display name, or an empty string when the alias is unknown.<br />

| Param | Type |
| --- | --- |
| browserAlias | <code>string</code> |

**Example**<br />
```js
getBrowserTypeByAlias('edge') // Microsoft Edge
```

* * *
