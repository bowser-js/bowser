import {
  getFirstMatch,
  getWindowsVersionName,
  getAndroidVersionName,
} from './utils';

export default [
  /* Windows Phone */
  {
    test: [/windows phone/i],
    describe(ua) {
      const version = getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i, ua);
      return {
        name: 'Windows Phone',
        version,
      };
    },
  },

  /* Windows */
  {
    test: [/windows/i],
    describe(ua) {
      const version = getFirstMatch(/Windows ((NT|XP)( \d\d?.\d)?)/i, ua);
      const versionName = getWindowsVersionName(version);

      return {
        name: 'Windows',
        version,
        versionName,
      };
    },
  },

  /* macOS */
  {
    test: [/macintosh/i],
    describe(ua) {
      const version = getFirstMatch(/mac os x (\d+(\.?_?\d+)+)/i, ua).replace(/[_\s]/g, '.');
      return {
        name: 'macOS',
        version,
      };
    },
  },

  /* iOS */
  {
    test: [/(ipod|iphone|ipad)/i],
    describe(ua) {
      const version = getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i, ua).replace(/[_\s]/g, '.');

      return {
        name: 'iOS',
        version,
      };
    },
  },

  /* Android */
  {
    test(parser) {
      const notLikeAndroid = !parser.test(/like android/i);
      const butAndroid = parser.test(/android/i);
      return notLikeAndroid && butAndroid;
    },
    describe(ua) {
      const version = getFirstMatch(/android[\s/-](\d+(\.\d+)*)/i, ua);
      const versionName = getAndroidVersionName(version);
      const os = {
        name: 'Android',
        version,
      };
      if (versionName) {
        os.versionName = versionName;
      }
      return os;
    },
  },

  /* WebOS */
  {
    test: [/(web|hpw)[o0]s/i],
    describe(ua) {
      const version = getFirstMatch(/(?:web|hpw)[o0]s\/(\d+(\.\d+)*)/i, ua);
      const os = {
        name: 'WebOS',
      };

      if (version && version.length) {
        os.version = version;
      }
      return os;
    },
  },

  /* BlackBerry */
  {
    test: [/blackberry|\bbb\d+/i, /rim\stablet/i],
    describe(ua) {
      const version = getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i, ua)
        || getFirstMatch(/blackberry\d+\/(\d+([_\s]\d+)*)/i, ua)
        || getFirstMatch(/\bbb(\d+)/i, ua);

      return {
        name: 'BlackBerry',
        version,
      };
    },
  },

  /* Bada */
  {
    test: [/bada/i],
    describe(ua) {
      const version = getFirstMatch(/bada\/(\d+(\.\d+)*)/i, ua);

      return {
        name: 'Bada',
        version,
      };
    },
  },

  /* Tizen */
  {
    test: [/tizen/i],
    describe(ua) {
      const version = getFirstMatch(/tizen[/\s](\d+(\.\d+)*)/i, ua);

      return {
        name: 'Tizen',
        version,
      };
    },
  },

  /* Linux */
  {
    test: [/linux/i],
    describe() {
      return {
        name: 'Linux',
      };
    },
  },

  /* Chrome OS */
  {
    test: [/CrOS/],
    describe() {
      return {
        name: 'Chrome OS',
      };
    },
  },
];
