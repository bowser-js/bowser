import {
  getFirstMatch,
  getSecondMatch
} from './utils';

const commonVersionIdentifier = /version\/(\d+(\.\d+)?)/i;

const browsersList = [
  {
    test: [/opera/i],
    detect(ua) {
      const version = getFirstMatch(commonVersionIdentifier, ua) || getFirstMatch(/(?:opera)[\s\/](\S+)/i, ua);

      return {
        name: 'Opera',
        version
      };
    }
  },
  {
    test: [/opr|opios/i],
    detect(ua) {
      const version = getFirstMatch(/(?:opr|opios)[\s\/](\S+)/i, ua) || getFirstMatch(commonVersionIdentifier, ua);

      return {
        name: 'Opera',
        version
      };
    }
  },
  {
    test: [/SamsungBrowser/i],
    detect(ua) {
      const version = getFirstMatch(commonVersionIdentifier, ua) || getFirstMatch(/(?:SamsungBrowser)[\s\/](\S+)/i, ua);

      return {
        name: 'Samsung Internet for Android',
        version
      };
    }
  },
  {
    test: [/coast/i],
    detect(ua) {
      const version = getFirstMatch(commonVersionIdentifier, ua) || getFirstMatch(/(?:coast)[\s\/](\S+)/i, ua);

      return {
        name: 'Opera Coast',
        version
      };
    }
  },
  {
    test: [/yabrowser/i],
    detect(ua) {
      const version = getFirstMatch(commonVersionIdentifier, ua) || getFirstMatch(/(?:yabrowser)[\s\/](\S+)/i, ua);

      return {
        name: 'Yandex Browser',
        version
      };
    }
  },
  {
    test: [/ucbrowser/i],
    detect(ua) {
      const version = getFirstMatch(commonVersionIdentifier, ua) || getFirstMatch(/(?:ucbrowser)[\s\/](\S+)/i, ua);

      return {
        name: 'UC Browser',
        version
      };
    }
  },
  {
    test: [/mxios/i],
    detect(ua) {
      const version = getFirstMatch(commonVersionIdentifier, ua) || getFirstMatch(/(?:mxios)[\s\/](\S+)/i, ua);

      return {
        name: 'Maxthon',
        version
      };
    }
  },
  {
    test: [/epiphany/i],
    detect(ua) {
      const version = getFirstMatch(commonVersionIdentifier, ua) || getFirstMatch(/(?:epiphany)[\s\/](\S+)/i, ua);

      return {
        name: 'Epiphany',
        version
      };
    }
  },
  {
    test: [/puffin/i],
    detect(ua) {
      const version = getFirstMatch(commonVersionIdentifier, ua) || getFirstMatch(/(?:puffin)[\s\/](\S+)/i, ua);

      return {
        name: 'Puffin',
        version
      };
    }
  },
  {
    test: [/sleipnir/i],
    detect(ua) {
      const version = getFirstMatch(commonVersionIdentifier, ua) || getFirstMatch(/(?:sleipnir)[\s\/](\S+)/i, ua);

      return {
        name: 'Sleipnir',
        version
      };
    }
  },
  {
    test: [/k-meleon/i],
    detect(ua) {
      const version = getFirstMatch(commonVersionIdentifier, ua) || getFirstMatch(/(?:k-meleon)[\s\/](\S+)/i, ua);

      return {
        name: 'K-Meleon',
        version
      };
    }
  },
  {
    test: [/msie|trident/i],
    detect(ua) {
      const version = getFirstMatch(/(?:msie |rv:)(\S+)/i, ua);

      return {
        name: 'Internet Explorer',
        version
      };
    }
  },
  {
    test: [/chrome.+? edge/i],
    detect(ua) {
      const version = getFirstMatch(/edge\/(\S+)/i, ua);

      return {
        name: 'Microsoft Edge',
        version
      }
    }
  },
  {
    test: [/vivaldi/i],
    detect(ua) {
      const version = getFirstMatch(/vivaldi\/(\S+)/i, ua);

      return {
        name: 'Vivaldi',
        version
      }
    }
  },
  {
    test: [/seamonkey/i],
    detect(ua) {
      const version = getFirstMatch(/seamonkey\/(\S+)/i, ua);
      return {
        name: 'SeaMonkey',
        version
      }
    }
  },
  {
    test: [/firefox|iceweasel|fxios/i],
    detect(ua) {
      const version = getFirstMatch(/(?:firefox|iceweasel|fxios)[ \/](\S+)/i, ua);
      return {
        name: 'Firefox'
      }
    }
  },
  {
    test: [/silk/i],
    detect(ua) {
      const version = getFirstMatch(/silk\/(\S+)/i, ua);
      return {
        name: 'Amazon Silk',
        version
      }
    }
  },
  {
    test: [/phantom/i],
    detect(ua) {
      const version = getFirstMatch(/phantomjs\/(\S+)/i, ua);

      return {
        name: 'PhantomJS',
        version
      }
    }
  },
  {
    test: [/slimerjs/i],
    detect(ua) {
      const version = getFirstMatch(/slimerjs\/(\S+)/i, ua);

      return {
        name: 'SlimerJS',
        version
      }
    }
  },
  {
    test: [/blackberry|\bbb\d+/i, /rim\stablet/i],
    detect(ua) {
      const version = getFirstMatch(commonVersionIdentifier, ua) || getFirstMatch(/blackberry[\d]+\/(\S+)/i, ua);

      return {
        name: 'BlackBerry',
        version
      }
    }
  },
  {
    test: [/(web|hpw)os/i],
    detect(ua) {
      const version = getFirstMatch(commonVersionIdentifier, ua) || getFirstMatch(/w(?:eb)?osbrowser\/(\S+)/i, ua);

      return {
        name: 'WebOS Browser',
        version
      }
    }
  },
  {
    test: [/bada/i],
    detect(ua) {
      const version = getFirstMatch(/dolfin\/(\S+)/i, ua);

      return {
        name: 'Bada',
        version
      }
    }
  },
  {
    test: [/tizen/i],
    detect(ua) {
      const version = getFirstMatch(/(?:tizen\s?)?browser\/(\S+)/i, ua) || getFirstMatch(commonVersionIdentifier, ua);

      return {
        name: 'Tizen',
        version
      }
    }
  },
  {
    test: [/qupzilla/i],
    detect(ua) {
      const version = getFirstMatch(/(?:qupzilla)[\s\/](\S+)/i, ua) || getFirstMatch(commonVersionIdentifier, ua);

      return {
        name: 'QupZilla',
        version
      }
    }
  },
  {
    test: [/chromium/i],
    detect(ua) {
      const version = getFirstMatch(/(?:chromium)[\s\/](\S+)/i, ua) || getFirstMatch(commonVersionIdentifier, ua);

      return {
        name: 'Chromium',
        version
      }
    }
  },
  {
    test: [/chrome|crios|crmo/i],
    detect(ua) {
      const version = getFirstMatch(/(?:chrome|crios|crmo)\/(\S+)/i, ua);

      return {
        name: 'Chrome',
        version
      }
    }
  },

  /* Android Browser */
  {
    test(parser) {
      const notLikeAndroid = !parser.test(/^((?!like android).)*$/i);
      const butAndroid = parser.test(/android/i);
      return notLikeAndroid && butAndroid;
    },
    detect(ua) {
      const version = getFirstMatch(commonVersionIdentifier, ua);

      return {
        name: 'Android Browser',
        version
      }
    }
  },

  /* Safari */
  {
    test: [/safari|applewebkit/i],
    detect(ua) {
      const version = getFirstMatch(commonVersionIdentifier, ua);

      return {
        name: 'Safari',
        version
      }
    }
  },

  /* Googlebot */
  {
    test: [/googlebot/i],
    detect(ua) {
      const version = getFirstMatch(/googlebot\/(\d+(\.\d+))/i, ua) || getFirstMatch(commonVersionIdentifier, ua);

      return {
        name: 'Googlebot',
        version
      }
    }
  },

  /* Something else */
  {
    test: [/.*/i],
    detect(ua) {
      return {
        name: getFirstMatch(/^(.*)\/(.*) /, ua),
        version: getSecondMatch(/^(.*)\/(.*) /, ua)
      };
    }
  }
];

export default browsersList;
