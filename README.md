Bowser
------
A Browser detector. Because sometimes, there is no other way, and not even good modern browsers always provide good feature detection mechanisms.

So... it works like this:

``` js
if (bowser.msie && bowser.version <= 6) {
  alert('Hello China');
}
```

Detected Browsers
-----

  * msie
  * safari[webkit]
  * chrome[webkit]
  * firefox[gecko]
  * opera

Notes
----
Safari, Chrome, and Firefox will report that they have webkit|gecko engines

``` js
if (bowser.webkit) {
  // do stuff with safari & chrome
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