import { getFirstMatch } from './utils';

function getWindowsVersionName(version) {
  switch (version) {
    case 'NT': return 'NT';
    case 'XP': return 'XP';
    case 'NT 5.0': return '2000';
    case 'NT 5.1': return 'XP';
    case 'NT 5.2': return '2003';
    case 'NT 6.0': return 'Vista';
    case 'NT 6.1': return '7';
    case 'NT 6.2': return '8';
    case 'NT 6.3': return '8.1';
    case 'NT 10.0': return '10';
    default: return undefined;
  }
}

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
      return {
        name: 'Android',
        version,
      };
    },
  },

  /* WebOS */
  {
    test: [/(web|hpw)os/i],
    describe(ua) {
      const version = getFirstMatch(/(?:web|hpw)os\/(\d+(\.\d+)*)/i, ua);
      return {
        name: 'WebOS',
        version,
      };
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
];
