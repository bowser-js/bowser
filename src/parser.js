import browserParsersList from './parser-browsers';
import osParsersList from './parser-os';

class Parser {
  /**
   * Create instance of Parser
   * @param UA
   * @throw
   * @constructor
   */
  constructor(UA) {
    if (UA === void(0) || UA === null || UA === '') {
      throw new Error("UserAgent parameter can't be empty");
    }

    this._ua = UA;
    this.parsedResult = {};
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
   *
   * @private
   */
  _parseBrowser() {
    this.parsedResult.browser = {};

    const browserDescriptor = browserParsersList.find(_browser => {
      if (typeof _browser.test === 'function') {
        return _browser.test(this);
      }

      if (_browser.test instanceof Array) {
        return _browser.test.some((condition) => {
          return this.test(condition);
        });
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

    return this._parseBrowser();
  }

  /**
   * Get browser's name
   * @return {String} Browser's name
   *
   * @public
   */
  getBrowserName() {
    return this.getBrowser().name;
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

  getPlatform(){}

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

    return this._parseOS();
  }

  /**
   * Parse OS and save it to this.parsedResult.os
   * @return {*|{}}
   * @private
   */
  _parseOS() {
    this.parsedResult.os = {};

    const os = osParsersList.find(_os => {
      if (typeof _os.test === 'function') {
        return _os.test(this);
      }

      if (_os.test instanceof Array) {
        return _os.test.some((condition) => {
          return this.test(condition);
        });
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
   * @return {String} name of the OS — macOS, Windows, Linux, etc.
   */
  getOSName() {
    return this.getOS().name;
  }

  /**
   * Get OS version
   * @return {String} full version with dots ('10.11.12', '5.6', etc)
   */
  getOSVersion() {
    return this.getOS().version;
  }

  /**
   * Parse full information about the browser
   */
  parse(){
    this._parseBrowser();
    this._parseOS();

    return this.parsedResult;
  }
}

export default Parser;
