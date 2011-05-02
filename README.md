Bowser
------
A Browser detector. Because sometimes, there is no other way, and not even good modern browsers always provide good feature detection mechanisms.

So... it works like this:

    if (bowser().msie && bowser().version <= 6) {
      alert('hello China');
    }

Detected Browsers
-----

  * msie
  * safari[webkit]
  * chrome[webkit]
  * firefox[gecko]
  * opera

Notes
----
safari,chrome, and firefox will report that they have webkit|gecko engines

    if (bowser().webkit) {
      // do stuff with safari & chrome
    }

Ender installation
-----
If you don't already have [Ender](http://ender.no.de) (an npm package) install it now (and don't look back)

    $ npm install ender

then add bowser to your module collection

    $ ender add bowser

use it like this:

    if ($.browser.chrome) {
      alert('Hello Silicon Valley');
    }