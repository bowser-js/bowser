Bowser
------
A Browser detector. Because sometimes, there is no other way, and not even good modern browsers always provide good feature detection mechanisms.

[![bowser ci](https://secure.travis-ci.org/ded/bowser.png)](https://travis-ci.org/ded/bowser/)

So... it works like this:

``` js
if (bowser.msie && bowser.version <= 6) {
  alert('Hello China');
}
```

Flags set for detected Browsers[Engines]
-----

  * `chrome`[`webkit`]
  * `firefox`[`gecko`]
  * `msie`
  * Android native browser as `android`[`webkit`]
  * iOS native browser as `ios`[`webkit`]
  * `opera`[`webkit` if >12]
  * `phantomjs`[`webkit`]
  * `safari`[`webkit`]
  * `seamonkey`[`gecko`]
  * BlackBerry native browser as `blackberry`[`webkit`]
  * WebOS native browser as `webos`[`webkit`]
  * Amazon Kindle browser as `silk`[`webkit`]

Flags set for detected mobile Operating Systems
-----

  * `android`
  * Windows Phone as `windowsphone`
  * `ios` (`iphone`/`ipad`/`ipod`)
  * `blackberry`
  * `firefoxos`
  * `webos`

Android, iOS, Windows Phone, and WebOS will all report the OS version number if it is contained in the UA string in the `osversion` field. iOS is always reported as `ios` and additionally as `iphone`/`ipad`/`ipod`, whichever one matches best. If WebOS device is an HP TouchPad the flag `touchpad` is additionally set.

All detected mobile OSes are additionally flagged `mobile`.

Notes
----
Safari, Chrome and some other minor browsers will report that they have `webkit` engines, Firefox and Seamonkey will report that they have `gecko` engines.

``` js
if (bowser.webkit) {
  // do stuff with safari & chrome & opera & android & blackberry & webos & silk
}
```

Ender installation
-----
If you don't already have [Ender](http://ender.no.de) (an npm package) install it now (and don't look back)

    $ npm install ender

then add bowser to your module collection

    $ ender add bowser

use it like this:

``` js
if ($.browser.chrome) {
  alert('Hello Silicon Valley');
}
```

Graded Browser Support
---------
One useful feature of Bowser is that aside from checking one browser from another -- it will keep up to date with [Yahoo's Graded Browser Support](http://developer.yahoo.com/yui/articles/gbs/) chart, giving you access to each grade on the bowser object

``` js
if (bowser.a) {
  // support full feature set
}
else if (bowser.c) {
  // serve degraded version
}
else {
  // unsupported (bowser.x)
}
```

Building
--------

If you'd like to contribute a change to bowser, modify the files in src/, then run the following (you'll need node + npm installed):

    $ npm install
    $ make


Testing
-------
We started a list `src/useragents.js` with example user agents and their expected bowser object.

Whenever you add support for new browsers or notice a bug / mismatch, please update the list and
check if all tests are still passing.

To run the test call `$ make test`
