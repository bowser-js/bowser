/*!
  * Bowser - a browser detector
  * https://github.com/ded/bowser
  * MIT License | (c) Dustin Diaz 2013
  */

!function (name, definition) {
  if (typeof define === 'function') {
    define(definition);
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports[name] = definition();
  } else {
    this[name] = definition();
  }
}('bowser', function () {
  /**
    * navigator.userAgent =>
    * Chrome:  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_7) AppleWebKit/534.24 (KHTML, like Gecko) Chrome/11.0.696.57 Safari/534.24"
    * Opera:   "Opera/9.80 (Macintosh; Intel Mac OS X 10.6.7; U; en) Presto/2.7.62 Version/11.01"
    * Safari:  "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_7; en-us) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1"
    * IE:      "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C)"
    * IE>=11:  "Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; .NET4.0E; .NET4.0C; Media Center PC 6.0; rv:11.0) like Gecko"
    * Firefox: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:2.0) Gecko/20100101 Firefox/4.0"
    * iPhone:  "Mozilla/5.0 (iPhone Simulator; U; CPU iPhone OS 4_3_2 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8H7 Safari/6533.18.5"
    * iPad:    "Mozilla/5.0 (iPad; U; CPU OS 4_3_2 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8H7 Safari/6533.18.5",
    * Android: "Mozilla/5.0 (Linux; U; Android 2.3.4; en-us; T-Mobile G2 Build/GRJ22) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1"
    * Touchpad: "Mozilla/5.0 (hp-tabled;Linux;hpwOS/3.0.5; U; en-US)) AppleWebKit/534.6 (KHTML, like Gecko) wOSBrowser/234.83 Safari/534.6 TouchPad/1.0"
    * PhantomJS: "Mozilla/5.0 (Macintosh; Intel Mac OS X) AppleWebKit/534.34 (KHTML, like Gecko) PhantomJS/1.5.0 Safari/534.34"
    */

  /** @const */
  var TRUE = true;

  /** @const */
  var STR_VERSION = 'version';

  /** @const */
  var STR_MOBILE = 'mobile';

  /** @const */
  var STR_MSIE = 'msie';

  /** @const */
  var STR_OPERA = 'opera';

  /** @const */
  var STR_CHROME = 'chrome';

  /** @const */
  var STR_WEBKIT = 'webkit';

  /** @const */
  var STR_SAFARI = 'safari';

  /** @const */
  var STR_FIREFOX = 'firefox';


  function detect(ua) {
    /**
     * Test a given regex against our user agent
     *
     * @param  {RegExp} regex
     * @return {Boolean}
     */
    function uaTest(regex) {
      return regex.test(ua);
    }

    /**
     * Append version number matcher to our starting string
     * and get version number from our user agent.
     *
     * @param  {String} start
     * @return {Number}
     */
    function versionTest(start, i) {
      var match = ua.match(new RegExp(start + '(\\d+(\\.\\d+)?)', 'i'));
      return match ? match[i || 1] : 0;
    }

    var iphone = uaTest(/iphone/i)
      , ipad = uaTest(/ipad/i)
      , ipod = uaTest(/ipod/i)
      , webkitVersion = versionTest(STR_VERSION + '\/')
      , firefoxVersion = versionTest(STR_FIREFOX + '[\/ ]')
      , o = {}
      , version = 0;

    if (uaTest(/windows phone/i)) {
      o.windowsphone = o[STR_MOBILE] = TRUE;
      o[STR_VERSION] = versionTest('iemobile\/');
    } else if (uaTest(/opera/i) || uaTest(/opr/i)) {
      o[STR_OPERA] = TRUE;
      o[STR_VERSION] = webkitVersion || versionTest('opr\/') || versionTest('opera[ \/]');
    } else if (uaTest(/(msie|trident)/i)) {
      o[STR_MSIE] = TRUE;
      o[STR_VERSION] = versionTest('(msie |rv:)', 2);
    } else if (uaTest(/chrome/i)) {
      o[STR_CHROME] = o[STR_WEBKIT] = TRUE;
      o[STR_VERSION] = versionTest(STR_CHROME + '\/');
    } else if (uaTest(/phantom/i)) {
      o.phantom = o[STR_WEBKIT] = TRUE;
      o[STR_VERSION] = versionTest('phantomjs\/');
    } else if (uaTest(/touchpad/i)) {
      o.touchpad = o[STR_WEBKIT] = TRUE;
      o[STR_VERSION] = versionTest('touchpad\/');
    } else if (iphone || ipad || ipod) {
      o.ios = o[STR_MOBILE] = o[STR_WEBKIT] = TRUE;
      // CAUTION: version is not part of user agent in web apps
      o[STR_VERSION] = webkitVersion;
      if (ipod) {
        o.ipod = TRUE;
      } else if (iphone) {
        o.iphone = TRUE;
      } else if (ipad) {
        o.ipad = TRUE;
      }
    } else if (uaTest(/blackberry/i)) {
      o.blackberry = o[STR_MOBILE] = TRUE;
      if (webkitVersion) {
        o[STR_WEBKIT] = TRUE;
        o[STR_VERSION] = webkitVersion;
      } else {
        o[STR_VERSION] = versionTest('blackberry[\\d]+\/');
      }
    } else if (uaTest(/webos/i)) {
      o.webos = o[STR_MOBILE] = o[STR_WEBKIT] = TRUE;
      o[STR_VERSION] = webkitVersion || versionTest('wosbrowser\/');
    } else if (uaTest(/android/i)) {
      o.android = o[STR_MOBILE] = o[STR_WEBKIT] = TRUE;
      o[STR_VERSION] = webkitVersion || firefoxVersion;
    } else if (uaTest(/safari/i)) {
      o[STR_SAFARI] = o[STR_WEBKIT] = TRUE;
      o[STR_VERSION] = webkitVersion;
    } else if (uaTest(/gecko\//i)) {
      o.gecko = o.mozilla = TRUE;
      o[STR_VERSION] = firefoxVersion;
      if (uaTest(/firefox/i)) {
        o.firefox = TRUE;
      }
    } else if (uaTest(/seamonkey\//i)) {
      o.seamonkey = TRUE;
      o[STR_VERSION] = versionTest('seamonkey\/');
    } else {
      o[STR_VERSION] = 0;
    }

    version = o[STR_VERSION];

    // Graded Browser Support
    // http://developer.yahoo.com/yui/articles/gbs
    if ((o[STR_MSIE] && version >= 8) ||
        (o[STR_CHROME] && version >= 10) ||
        (o[STR_FIREFOX] && version >= 4.0) ||
        (o[STR_SAFARI] && version >= 5) ||
        (o[STR_OPERA] && version >= 10.0)) {
      o.a = TRUE;
    }

    else if ((o[STR_MSIE] && version < 8) ||
        (o[STR_CHROME] && version < 10) ||
        (o[STR_FIREFOX] && version < 4.0) ||
        (o[STR_SAFARI] && version < 5) ||
        (o[STR_OPERA] && version < 10.0)) {
      o.c = TRUE;
    } else {
      o.x = TRUE;
    }

    return o;
  }

  /* Get our main bowser object from navigators user agent if present. */
  var bowser = detect(typeof navigator !== 'undefined' ? navigator.userAgent : '');
  
  /*
   * Set our detect method to the main bowser object so we can
   * reuse it to test other user agents.
   * This is needed to implement future tests.
   */
  bowser._detect = detect;

  return bowser;
});
