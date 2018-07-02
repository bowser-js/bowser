import browserParsersList from './parser-browsers';
import osParsersList from './parser-os';
import platformParsersList from './parser-platforms';
import enginesParsersList from './parser-engines';
import { compareVersions } from './utils';

class Parser {
  /**
   * Create instance of Parser
   *
   * @param {String} UA — User-Agent string
   * @param {Boolean} [skipParsing=false] — parser can skip parsing in purpose of performance
   * improvements if you need to make a more particular parsing
   * like `.parseBrowser()` or `.parsePlatform()`
   *
   * @throw {Error} in case of empty UA String
   *
   * @constructor
   */
  constructor(UA, skipParsing = false) {
    if (UA === void (0) || UA === null || UA === '') {
      throw new Error("UserAgent parameter can't be empty");
    }

    this._ua = UA;
    this.parsedResult = {};

    if (skipParsing !== true) {
      this.parse();
    }
  }

  /**
   * Get UserAgent string of current Parser instance
   * @return {String}
   *
   * @public
   */
  getUA() {
    return this._ua;
  }

  /**
   * Test a UA string for a regexp
   * @param {RegExp} regex
   * @return {Boolean}
   */
  test(regex) {
    return regex.test(this._ua);
  }

  /**
   * Get parsed browser object
   * @return {Object}
   */
  parseBrowser() {
    this.parsedResult.browser = {};

    const browserDescriptor = browserParsersList.find((_browser) => {
      if (typeof _browser.test === 'function') {
        return _browser.test(this);
      }

      if (_browser.test instanceof Array) {
        return _browser.test.some(condition => this.test(condition));
      }

      throw new Error("Browser's test function is not valid");
    });

    if (browserDescriptor) {
      this.parsedResult.browser = browserDescriptor.describe(this.getUA());
    }

    return this.parsedResult.browser;
  }

  /**
   * Get parsed browser object
   * @return {Object}
   *
   * @public
   */
  getBrowser() {
    if (this.parsedResult.browser) {
      return this.parsedResult.browser;
    }

    return this.parseBrowser();
  }

  /**
   * Get browser's name
   * @return {String} Browser's name or an empty string
   *
   * @public
   */
  getBrowserName(toLowerCase) {
    if (toLowerCase) {
      return String(this.getBrowser().name).toLowerCase() || '';
    }
    return this.getBrowser().name || '';
  }


  /**
   * Get browser's version
   * @return {String} version of browser
   *
   * @public
   */
  getBrowserVersion() {
    return this.getBrowser().version;
  }

  /**
   * Get OS
   * @return {Object}
   *
   * @example
   * this.getOS();
   * {
   *   name: 'macOS',
   *   version: '10.11.12'
   * }
   */
  getOS() {
    if (this.parsedResult.os) {
      return this.parsedResult.os;
    }

    return this.parseOS();
  }

  /**
   * Parse OS and save it to this.parsedResult.os
   * @return {*|{}}
   */
  parseOS() {
    this.parsedResult.os = {};

    const os = osParsersList.find((_os) => {
      if (typeof _os.test === 'function') {
        return _os.test(this);
      }

      if (_os.test instanceof Array) {
        return _os.test.some(condition => this.test(condition));
      }

      throw new Error("Browser's test function is not valid");
    });

    if (os) {
      this.parsedResult.os = os.describe(this.getUA());
    }

    return this.parsedResult.os;
  }

  /**
   * Get OS name
   * @param {Boolean} [toLowerCase] return lower-cased value
   * @return {String} name of the OS — macOS, Windows, Linux, etc.
   */
  getOSName(toLowerCase) {
    const { name } = this.getOS();

    if (toLowerCase) {
      return String(name).toLowerCase() || '';
    }

    return name || '';
  }

  /**
   * Get OS version
   * @return {String} full version with dots ('10.11.12', '5.6', etc)
   */
  getOSVersion() {
    return this.getOS().version;
  }

  /**
   * Get parsed platform
   * @return {{}}
   */
  getPlatform() {
    if (this.parsedResult.platform) {
      return this.parsedResult.platform;
    }

    return this.parsePlatform();
  }

  /**
   * Get platform name
   * @param {Boolean} toLowerCase
   * @return {*}
   */
  getPlatformName(toLowerCase) {
    const { name } = this.getPlatform();

    if (toLowerCase) {
      return String(name).toLowerCase() || '';
    }

    return name || '';
  }

  /**
   * Get parsed platform
   * @return {{}}
   */
  parsePlatform() {
    this.parsedResult.platform = {};

    const platform = platformParsersList.find((_platform) => {
      if (typeof _platform.test === 'function') {
        return _platform.test(this);
      }

      if (_platform.test instanceof Array) {
        return _platform.test.some(condition => this.test(condition));
      }

      throw new Error("Browser's test function is not valid");
    });

    if (platform) {
      this.parsedResult.platform = platform.describe(this.getUA());
    }

    return this.parsedResult.platform;
  }

  /**
   * Get parsed engine
   * @return {{}}
   */
  getEngine() {
    if (this.parsedResult.engine) {
      return this.parsedResult.engine;
    }

    return this.parseEngine();
  }

  /**
   * Get parsed platform
   * @return {{}}
   */
  parseEngine() {
    this.parsedResult.engine = {};

    const engine = enginesParsersList.find((_engine) => {
      if (typeof _engine.test === 'function') {
        return _engine.test(this);
      }

      if (_engine.test instanceof Array) {
        return _engine.test.some(condition => this.test(condition));
      }

      throw new Error("Browser's test function is not valid");
    });

    if (engine) {
      this.parsedResult.engine = engine.describe(this.getUA());
    }

    return this.parsedResult.engine;
  }

  /**
   * Parse full information about the browser
   */
  parse() {
    this.parseBrowser();
    this.parseOS();
    this.parsePlatform();
    this.parseEngine();

    return this;
  }

  getResult() {
    return this.parsedResult;
  }

  /**
   * Check if parsed browser matches certain conditions
   *
   * @param {Object} checkTree — It's one or two layered object,
   * which can include a platform or an OS on the first layer
   * and should have browsers specs on the bottom-laying layer
   *
   * @example
   * const browser = new Bowser(UA);
   * if (browser.check({chrome: '>118.01.1322' }))
   * // or with os
   * if (browser.check({windows: { chrome: '>118.01.1322' } }))
   * // or with platforms
   * if (browser.check({desktop: { chrome: '>118.01.1322' } }))
   */
  check(checkTree) {
    const keysToProcess = Object.keys(checkTree);
    return keysToProcess.some((browserAttribute) => {
      const objectOrVersion = checkTree[browserAttribute];

      if (typeof objectOrVersion === 'object') {
        return (this.isOs(browserAttribute) || this.isPlatform(browserAttribute))
          && this.check(objectOrVersion);
      }

      return this.isBrowser(browserAttribute) && this.satisfies(objectOrVersion);
    });
  }

  isBrowser(browserName) {
    return this.getBrowserName(true) === String(browserName).toLowerCase();
  }

  satisfies(version) {
    let expectedResult = 0;
    let comparableVersion = version;

    if (version[0] === '>') {
      expectedResult = 1;
      comparableVersion = version.substr(1);
    } else if (version[0] === '<') {
      expectedResult = -1;
      comparableVersion = version.substr(1);
    } else if (version[0] === '=') {
      comparableVersion = version.substr(1);
    }
    return compareVersions(this.getBrowserVersion(), comparableVersion) === expectedResult;
  }

  isOs(osName) {
    return this.getOSName(true) === String(osName).toLowerCase();
  }

  isPlatform(platformName) {
    return this.getPlatformName(true) === String(platformName).toLowerCase();
  }
}

export default Parser;
