import browsersList from './parser-browsers';
import osList from './parser-os';

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

    const browser = browsersList.find(_browser => {
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

    if (browser) {
      this.parsedResult.browser = browser.detect(this.getUA());
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


  getBrowserVersion() {
    return this.getBrowser().version;
  }

  getPlatform(){}

  getOS() {
    if (this.parsedResult.os) {
      return this.parsedResult.os;
    }

    return this._parseOS();
  }

  _parseOS() {
    this.parsedResult.os = {};

    const os = osList.find(_os => {
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
      this.parsedResult.os = os.detect(this.getUA());
    }

    return this.parsedResult.os;
  }

  getOSName(){
    return this.getOS().name;
  }

  getOSVersion(){
    return this.getOS().version;
  }

  parseFullInfo(){}
}

export default Parser;
