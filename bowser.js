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

  function detect(ua) {
    var t = true
      , ie = /(msie|trident)/i.test(ua)
      , chrome = /chrome/i.test(ua)
      , phantom = /phantom/i.test(ua)
      , safari = /safari/i.test(ua) && !chrome && !phantom
      , iphone = /iphone/i.test(ua)
      , ipad = /ipad/i.test(ua)
      , touchpad = /touchpad/i.test(ua)
      , android = /android/i.test(ua)
      , opera = /opera/i.test(ua) || /opr/i.test(ua)
      , firefox = /firefox/i.test(ua)
      , gecko = /gecko\//i.test(ua)
      , seamonkey = /seamonkey\//i.test(ua)
      , webkitVersion = /version\/(\d+(\.\d+)?)/i
      , firefoxVersion = /firefox\/(\d+(\.\d+)?)/i
      , o;

    if (ie) {
      o = {
        msie: t
      , version: ua.match(/(msie |rv:)(\d+(\.\d+)?)/i)[2]
      };
    } else if (opera) {
      o = {
        opera: t
      , version: ua.match(webkitVersion) ? ua.match(webkitVersion)[1] : ua.match(/opr\/(\d+(\.\d+)?)/i)
      };
    } else if (chrome) {
      o = {
        webkit: t
      , chrome: t
      , version: ua.match(/chrome\/(\d+(\.\d+)?)/i)[1]
      };
    } else if (phantom) {
      o = {
        webkit: t
      , phantom: t
      , version: ua.match(/phantomjs\/(\d+(\.\d+)+)/i)[1]
      };
    } else if (touchpad) {
      return {
        webkit: t
      , touchpad: t
      , version : ua.match(/touchpad\/(\d+(\.\d+)?)/i)[1]
      };
    } else if (iphone || ipad) {
      o = {
        webkit: t
      , mobile: t
      , ios: t
      , iphone: iphone
      , ipad: ipad
      };
      // WTF: version is not part of user agent in web apps
      if (webkitVersion.test(ua)) {
        o.version = ua.match(webkitVersion)[1];
      }
    } else if (android) {
      o = {
        webkit: t
      , android: t
      , mobile: t
      , version: (ua.match(webkitVersion) || ua.match(firefoxVersion))[1]
      };
    } else if (safari) {
      o = {
        webkit: t
      , safari: t
      , version: ua.match(webkitVersion)[1]
      };
    } else if (gecko) {
      o = {
        gecko: t
      , mozilla: t
      , version: ua.match(firefoxVersion)[1]
      };
      if (firefox) o.firefox = t;
    } else if (seamonkey) {
      o = {
        seamonkey: t
      , version: ua.match(/seamonkey\/(\d+(\.\d+)?)/i)[1]
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
