/**
 * Browsers' descriptors
 *
 * The idea of descriptors is simple. You should know about them two simple things:
 * 1. Every descriptor has a method or property called `test` and a `describe` method.
 * 2. Order of descriptors is important.
 *
 * More details:
 * 1. Method or property `test` serves as a way to detect whether the UA string
 * matches some certain browser or not. The `describe` method helps to make a result
 * object with params that show some browser-specific things: name, version, etc.
 * 2. Order of descriptors is important because a Parser goes through them one by one
 * in course. For example, if you insert Chrome's descriptor as the first one,
 * more then a half of browsers will be described as Chrome, because they will pass
 * the Chrome descriptor's test.
 *
 * Descriptor's `test` could be a property with an array of RegExps, where every RegExp
 * will be applied to a UA string to test it whether it matches or not.
 * If a descriptor has two or more regexps in the `test` array it tests them one by one
 * with a logical sum operation. Parser stops if it has found any RegExp that matches the UA.
 *
 * Or `test` could be a method. In that case it gets a Parser instance and should
 * return true/false to get the Parser know if this browser descriptor matches the UA or not.
 */

import {
  getFirstMatch,
  getSecondMatch
} from './utils';

const commonVersionIdentifier = /version\/(\d+(\.?_?\d+)+)/i;
const RENDERING_ENGINES_NAMES = {
  blink: 'Blink',
  webkit: 'WebKit',
  gecko: 'Gecko',
  presto: 'Presto',
  edgehtml: 'EdgeHTML'
};

const browsersList = [
  {
    test: [/opera/i],
    describe(ua) {
      const version = getFirstMatch(commonVersionIdentifier, ua) || getFirstMatch(/(?:opera)[\s\/](\d+(\.?_?\d+)+)/i, ua);

      return {
        name: 'Opera',
        version
      };
    }
  },
  {
    test: [/opr|opios/i],
    describe(ua) {
      const version = getFirstMatch(/(?:opr|opios)[\s\/](\S+)/i, ua) || getFirstMatch(commonVersionIdentifier, ua);

      return {
        name: 'Opera',
        version
      };
    }
  },
  {
    test: [/SamsungBrowser/i],
    describe(ua) {
      const version = getFirstMatch(commonVersionIdentifier, ua) || getFirstMatch(/(?:SamsungBrowser)[\s\/](\d+(\.?_?\d+)+)/i, ua);

      return {
        name: 'Samsung Internet for Android',
        version
      };
    }
  },
  {
    test: [/coast/i],
    describe(ua) {
      const version = getFirstMatch(commonVersionIdentifier, ua) || getFirstMatch(/(?:coast)[\s\/](\d+(\.?_?\d+)+)/i, ua);

      return {
        name: 'Opera Coast',
        version
      };
    }
  },
  {
    test: [/yabrowser/i],
    describe(ua) {
      const version = getFirstMatch(commonVersionIdentifier, ua) || getFirstMatch(/(?:yabrowser)[\s\/](\d+(\.?_?\d+)+)/i, ua);

      return {
        name: 'Yandex Browser',
        version
      };
    }
  },
  {
    test: [/ucbrowser/i],
    describe(ua) {
      const version = getFirstMatch(commonVersionIdentifier, ua) || getFirstMatch(/(?:ucbrowser)[\s\/](\d+(\.?_?\d+)+)/i, ua);

      return {
        name: 'UC Browser',
        version
      };
    }
  },
  {
    test: [/mxios/i],
    describe(ua) {
      const version = getFirstMatch(commonVersionIdentifier, ua) || getFirstMatch(/(?:mxios)[\s\/](\d+(\.?_?\d+)+)/i, ua);

      return {
        name: 'Maxthon',
        version
      };
    }
  },
  {
    test: [/epiphany/i],
    describe(ua) {
      const version = getFirstMatch(commonVersionIdentifier, ua) || getFirstMatch(/(?:epiphany)[\s\/](\d+(\.?_?\d+)+)/i, ua);

      return {
        name: 'Epiphany',
        version
      };
    }
  },
  {
    test: [/puffin/i],
    describe(ua) {
      const version = getFirstMatch(commonVersionIdentifier, ua) || getFirstMatch(/(?:puffin)[\s\/](\d+(\.?_?\d+)+)/i, ua);

      return {
        name: 'Puffin',
        version
      };
    }
  },
  {
    test: [/sleipnir/i],
    describe(ua) {
      const version = getFirstMatch(commonVersionIdentifier, ua) || getFirstMatch(/(?:sleipnir)[\s\/](\d+(\.?_?\d+)+)/i, ua);

      return {
        name: 'Sleipnir',
        version
      };
    }
  },
  {
    test: [/k-meleon/i],
    describe(ua) {
      const version = getFirstMatch(commonVersionIdentifier, ua) || getFirstMatch(/(?:k-meleon)[\s\/](\d+(\.?_?\d+)+)/i, ua);

      return {
        name: 'K-Meleon',
        version
      };
    }
  },
  {
    test: [/msie|trident/i],
    describe(ua) {
      const version = getFirstMatch(/(?:msie |rv:)(\d+(\.?_?\d+)+)/i, ua);

      return {
        name: 'Internet Explorer',
        version
      };
    }
  },
  {
    test: [/chrome.+? edge/i],
    describe(ua) {
      const version = getFirstMatch(/edge\/(\d+(\.?_?\d+)+)/i, ua);

      return {
        name: 'Microsoft Edge',
        engine: 'EdgeHTML',
        version
      }
    }
  },
  {
    test: [/vivaldi/i],
    describe(ua) {
      const version = getFirstMatch(/vivaldi\/(\d+(\.?_?\d+)+)/i, ua);

      return {
        name: 'Vivaldi',
        version
      }
    }
  },
  {
    test: [/seamonkey/i],
    describe(ua) {
      const version = getFirstMatch(/seamonkey\/(\d+(\.?_?\d+)+)/i, ua);
      return {
        name: 'SeaMonkey',
        engine: RENDERING_ENGINES_NAMES.gecko,
        version
      }
    }
  },
  {
    test: [/firefox|iceweasel|fxios/i],
    describe(ua) {
      const version = getFirstMatch(/(?:firefox|iceweasel|fxios)[ \/](\d+(\.?_?\d+)+)/i, ua);
      return {
        name: 'Firefox',
        engine: RENDERING_ENGINES_NAMES.gecko,
        version
      }
    }
  },
  {
    test: [/silk/i],
    describe(ua) {
      const version = getFirstMatch(/silk\/(\d+(\.?_?\d+)+)/i, ua);
      return {
        name: 'Amazon Silk',
        version
      }
    }
  },
  {
    test: [/phantom/i],
    describe(ua) {
      const version = getFirstMatch(/phantomjs\/(\d+(\.?_?\d+)+)/i, ua);

      return {
        name: 'PhantomJS',
        version
      }
    }
  },
  {
    test: [/slimerjs/i],
    describe(ua) {
      const version = getFirstMatch(/slimerjs\/(\d+(\.?_?\d+)+)/i, ua);

      return {
        name: 'SlimerJS',
        version
      }
    }
  },
  {
    test: [/blackberry|\bbb\d+/i, /rim\stablet/i],
    describe(ua) {
      const version = getFirstMatch(commonVersionIdentifier, ua) || getFirstMatch(/blackberry[\d]+\/(\d+(\.?_?\d+)+)/i, ua);

      return {
        name: 'BlackBerry',
        version
      }
    }
  },
  {
    test: [/(web|hpw)os/i],
    describe(ua) {
      const version = getFirstMatch(commonVersionIdentifier, ua) || getFirstMatch(/w(?:eb)?osbrowser\/(\d+(\.?_?\d+)+)/i, ua);

      return {
        name: 'WebOS Browser',
        version
      }
    }
  },
  {
    test: [/bada/i],
    describe(ua) {
      const version = getFirstMatch(/dolfin\/(\d+(\.?_?\d+)+)/i, ua);

      return {
        name: 'Bada',
        version
      }
    }
  },
  {
    test: [/tizen/i],
    describe(ua) {
      const version = getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.?_?\d+)+)/i, ua) || getFirstMatch(commonVersionIdentifier, ua);

      return {
        name: 'Tizen',
        version
      }
    }
  },
  {
    test: [/qupzilla/i],
    describe(ua) {
      const version = getFirstMatch(/(?:qupzilla)[\s\/](\d+(\.?_?\d+)+)/i, ua) || getFirstMatch(commonVersionIdentifier, ua);

      return {
        name: 'QupZilla',
        version
      }
    }
  },
  {
    test: [/chromium/i],
    describe(ua) {
      const version = getFirstMatch(/(?:chromium)[\s\/](\d+(\.?_?\d+)+)/i, ua) || getFirstMatch(commonVersionIdentifier, ua);

      return {
        name: 'Chromium',
        version
      }
    }
  },
  {
    test: [/chrome|crios|crmo/i],
    describe(ua) {
      const version = getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.?_?\d+)+)/i, ua);
      let engine;
      if (/(apple)?webkit\/537\.36/i.test(ua)) {
        engine = RENDERING_ENGINES_NAMES.blink;
      } else {
        engine = RENDERING_ENGINES_NAMES.webkit;
      }

      return {
        name: 'Chrome',
        engine,
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
    describe(ua) {
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
    describe(ua) {
      const version = getFirstMatch(commonVersionIdentifier, ua);

      return {
        name: 'Safari',
        engine: RENDERING_ENGINES_NAMES.webkit,
        version
      }
    }
  },

  /* Googlebot */
  {
    test: [/googlebot/i],
    describe(ua) {
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
    describe(ua) {
      return {
        name: getFirstMatch(/^(.*)\/(.*) /, ua),
        version: getSecondMatch(/^(.*)\/(.*) /, ua)
      };
    }
  }
];

export default browsersList;
