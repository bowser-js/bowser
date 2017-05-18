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
  {
    test: [/windows phone/i],
    describe(ua) {
      const version = getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i, ua);
      return {
        name: 'Windows Phone',
        version
      }
    }
  },
  {
    test: [/windows/i],
    describe(ua) {
      const version = getFirstMatch(/Windows ((NT|XP)( \d\d?.\d)?)/i, ua);
      const versionName = getWindowsVersionName(version);

      return {
        name: 'Windows',
        version,
        versionName
      };
    }
  },
  {
    test: [/macintosh/i],
    describe(ua) {
      const version = getFirstMatch(/mac os x (\d+([_\s]\d+)*)/i, ua).replace(/[_\s]/g, '.');
      return {
        name: 'macOS',
        version
      }
    }
  }
]
