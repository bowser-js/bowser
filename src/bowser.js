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
     * Get version numbers from our user agent.
     *
     * @param  {RegExp} regex
     * @return {Number}
     */
    function versionTest(regex, i) {
      var match = ua.match(regex);
      return match ? match[i || 1] : 0;
    }

    var t = true
      , iphone = uaTest(/iphone/i)
      , ipad = uaTest(/ipad/i)
      , webkitVersion = /version\/(\d+(\.\d+)?)/i
      , firefoxVersion = /firefox\/(\d+(\.\d+)?)/i
      , o;

    if (uaTest(/(msie|trident)/i)) {
      o = {
        msie: t
      , version: versionTest(/(msie |rv:)(\d+(\.\d+)?)/i, 2)
      };
    } else if (uaTest(/opera/i) || uaTest(/opr/i)) {
      o = {
        opera: t
      , version: versionTest(webkitVersion) || versionTest(/opr\/(\d+(\.\d+)?)/i)
      };
    } else if (uaTest(/chrome/i)) {
      o = {
        webkit: t
      , chrome: t
      , version: versionTest(/chrome\/(\d+(\.\d+)?)/i)
      };
    } else if (uaTest(/phantom/i)) {
      o = {
        webkit: t
      , phantom: t
      , version: versionTest(/phantomjs\/(\d+(\.\d+)?)/i)
      };
    } else if (uaTest(/touchpad/i)) {
      o = {
        webkit: t
      , touchpad: t
      , version : versionTest(/touchpad\/(\d+(\.\d+)?)/i)
      };
    } else if (iphone || ipad) {
      o = {
        webkit: t
      , mobile: t
      , ios: t
      // WTF: version is not part of user agent in web apps
      , version: versionTest(webkitVersion)
      };
      if (iphone) {
        o.iphone = t;
      } else if (ipad) {
        o.ipad = t;
      }
    } else if (uaTest(/android/i)) {
      o = {
        webkit: t
      , android: t
      , mobile: t
      , version: versionTest(webkitVersion) || versionTest(firefoxVersion)
      };
    } else if (uaTest(/safari/i)) {
      o = {
        webkit: t
      , safari: t
      , version: versionTest(webkitVersion)
      };
    } else if (uaTest(/gecko\//i)) {
      o = {
        gecko: t
      , mozilla: t
      , version: versionTest(firefoxVersion)
      };
      if (uaTest(/firefox/i)) {
        o.firefox = t;
      }
    } else if (uaTest(/seamonkey\//i)) {
      o = {
        seamonkey: t
      , version: versionTest(/seamonkey\/(\d+(\.\d+)?)/i)
      };
    } else {
      o = {};
    }

    // Graded Browser Support
    // http://developer.yahoo.com/yui/articles/gbs
    if ((o.msie && o.version >= 8) ||
        (o.chrome && o.version >= 10) ||
        (o.firefox && o.version >= 4.0) ||
        (o.safari && o.version >= 5) ||
        (o.opera && o.version >= 10.0)) {
      o.a = t;
    }

    else if ((o.msie && o.version < 8) ||
        (o.chrome && o.version < 10) ||
        (o.firefox && o.version < 4.0) ||
        (o.safari && o.version < 5) ||
        (o.opera && o.version < 10.0)) {
      o.c = t;
    } else {
      o.x = t;
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
