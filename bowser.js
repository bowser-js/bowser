/*!
  * Bowser - a browser detector
  * https://github.com/ded/bowser
  * MIT License | (c) Dustin Diaz 2014
  */

!function (name, definition) {
  if (typeof module != 'undefined' && module.exports) module.exports['browser'] = definition()
  else if (typeof define == 'function') define(definition)
  else this[name] = definition()
}('bowser', function () {
  /**
    * See useragents.js for examples of navigator.userAgent
    */

  var t = true

  function detect(ua) {

    function getVersion(regex) {
      var match = ua.match(regex);
      return (match && match.length > 1 && match[1]) || '';
    }

    var ie = /msie|trident/i.test(ua)
      , chrome = /chrome|crios|crmo/i.test(ua)
      , phantom = /phantom/i.test(ua)
      , ipod = /ipod/i.test(ua)
      , iphone = !ipod && /iphone/i.test(ua)
      , ipad = /ipad/i.test(ua)
      , ios = iphone || ipad || ipod
      , silk = /silk/i.test(ua)
      , likeAndroid = /like android/i.test(ua)
      , android = !likeAndroid && /android/i.test(ua)
      , opera = /opera|opr/i.test(ua)
      , firefox = /firefox|iceweasel/i.test(ua)
      , gecko = /gecko\//i.test(ua)
      , seamonkey = /seamonkey\//i.test(ua)
      , webos = /(web|hpw)os/i.test(ua)
      , touchpad = /touchpad\//i.test(ua)
      , windowsphone = /windows phone/i.test(ua)
      , blackberry = /blackberry|\bbb\d+/i.test(ua)
      , rimtablet = /rim\stablet/i.test(ua)
      , bada = /bada/i.test(ua)
      , tizen = /tizen/i.test(ua)
      , safari = /safari/i.test(ua)
      , webkit = /applewebkit/i.test(ua)
      , versionIdentifier = getVersion(/version\/(\d+(\.\d+)?)/i)
      , mobile = /mobi/i.test(ua)
      , tablet = /tablet/i.test(ua)
      , result

    if (windowsphone) result = {
        name: 'Windows Phone'
      , windowsphone: t
      , msie: t
      , version: getVersion(/iemobile\/(\d+(\.\d+)?)/i)
      }
    else if (opera) {
      result = {
        name: 'Opera'
      , opera: t
      , version: versionIdentifier ||
          getVersion(/opr\/(\d+(\.\d+)?)/i) ||
          getVersion(/opera[ \/](\d+(\.\d+)?)/i)
      }
    }
    else if (ie) result = {
        name: 'Internet Explorer'
      , msie: t
      , version: getVersion(/(?:msie |rv:)(\d+(\.\d+)?)/i)
      }
    else if (chrome) {
      result = {
        name: 'Chrome'
      , chrome: t
      , version: getVersion(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
      }
    }
    else if (phantom) result = {
        name: 'PhantomJS'
      , phantom: t
      , version: getVersion(/phantomjs\/(\d+(\.\d+)?)/i)
      }
    else if (silk) result =  {
        name: 'Amazon Silk'
      , silk: t
      , version : getVersion(/silk\/(\d+(\.\d+)?)/i)
      }
    else if (ios) {
      result = {
        name : iphone ? 'iPhone' : ipad ? 'iPad' : 'iPod'
      }
      // WTF: version is not part of user agent in web apps
      if (versionIdentifier) {
        result.version = versionIdentifier
      }
    }
    else if (blackberry || rimtablet) {
      result = {
        name: 'BlackBerry'
      , blackberry: t
      , version: versionIdentifier || getVersion(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
      }
    } 
    else if (webos) {
      result = {
        name: 'WebOS'
      , webos: t
      , version: versionIdentifier || getVersion(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)
      };
      touchpad && (result.touchpad = t)
    }
    else if (bada) {
      result = {
        name: 'Bada'
      , bada: t
      , version: getVersion(/dolfin\/(\d+(\.\d+)?)/i)
      };
    }
    else if (tizen) {
      result = {
        name: 'Tizen'
      , tizen: t
      , version: getVersion(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || versionIdentifier
      };
    }
    else if (gecko) {
      result = {
        name: 'Gecko'
      , gecko: t
      , mozilla: t
      , version: getVersion(/(?:firefox|iceweasel)[ \/](\d+(\.\d+)?)/i)
      }
      if (seamonkey) {
        result.name = 'SeaMonkey'
        result.seamonkey = t
        result.version = getVersion(/seamonkey\/(\d+(\.\d+)?)/i)
      } else if (firefox) {
        result.name = 'Firefox'
        result.firefox = t
        if (/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(ua)) {
          result.firefoxos = t
        }
      }
    }
    else if (android) result = {
        name: 'Android'
      , version: versionIdentifier
      }
    else if (safari) result = {
        name: 'Safari'
      , safari: t
      , version: versionIdentifier
      }
    else result = {}

    // set OS flags for platforms that have multiple browsers
    if (android || silk) {
      result.android = t
    } else if (ios) {
      result[iphone ? 'iphone' : ipad ? 'ipad' : 'ipod'] = t
      result.ios = t
    }
    if (webkit) {
      result.webkit = t
    }

    // OS version extraction
    var osVersion = '';
    if (ios) {
      osVersion = getVersion(/os (\d+([_\s]\d+)*) like mac os x/i);
      osVersion = osVersion.replace(/[_\s]/g, '.');
    } else if (android) {
      osVersion = getVersion(/android[ \/-](\d+(\.\d+)*)/i);
    } else if (windowsphone) {
      osVersion = getVersion(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i);
    } else if (webos) {
      osVersion = getVersion(/(?:web|hpw)os\/(\d+(\.\d+)*)/i);
    } else if (rimtablet) {
      osVersion = getVersion(/rim\stablet\sos\s(\d+(\.\d+)*)/i);
    } else if (bada) {
      osVersion = getVersion(/bada\/(\d+(\.\d+)*)/i);
    } else if (tizen) {
      osVersion = getVersion(/tizen[\/\s](\d+(\.\d+)*)/i);
    }
    if (osVersion) {
      result.osversion = osVersion;
    }

    // device type extraction
    var osMajorVersion = osVersion.split('.')[0];
    if (tablet || ipad || (android && (osMajorVersion == 3 || (osMajorVersion == 4 && !mobile))) || rimtablet || silk || touchpad) {
      result.tablet = t
    } else if (iphone || ipod || (android && mobile) || windowsphone || blackberry || webos || bada || tizen || mobile) {
      result.mobile = t
    }

    // Graded Browser Support
    // http://developer.yahoo.com/yui/articles/gbs
    if ((result.msie && result.version >= 9) ||
        (result.chrome && result.version >= 20) ||
        (result.firefox && result.version >= 10.0) ||
        (result.safari && result.version >= 5) ||
        (result.opera && result.version >= 10.0) ||
        (result.ios && result.osversion && result.osversion.split(".")[0] >= 6)
        ) {
      result.a = t;
    }
    else if ((result.msie && result.version < 9) ||
        (result.chrome && result.version < 20) ||
        (result.firefox && result.version < 10.0) ||
        (result.safari && result.version < 5) ||
        (result.opera && result.version < 10.0) ||
        (result.ios && result.osversion && result.osversion.split(".")[0] < 6)
        ) {
      result.c = t
    } else result.x = t

    return result
  }

  var bowser = detect(typeof navigator !== 'undefined' ? navigator.userAgent : '')


  /*
   * Set our detect method to the main bowser object so we can
   * reuse it to test other user agents.
   * This is needed to implement future tests.
   */
  bowser._detect = detect;

  return bowser
});
