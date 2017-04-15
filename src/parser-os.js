import { getFirstMatch } from './utils';

export default [
  {
    test: [/windows phone/i],
    detect(ua) {
      const version = getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i, ua);
      return {
        name: 'Windows Phone',
        version
      }
    }
  },
  {
    test: [/macintosh/i],
    detect(ua) {
      const version = getFirstMatch(/mac os x (\d+([_\s]\d+)*)/i, ua).replace(/[_\s]/g, '.');
      return {
        name: 'macOS',
        version
      }
    }
  }
]
