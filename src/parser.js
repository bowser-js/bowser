import browsersList from './parser-browsers';

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
   * Get parsed browser object
   * @return {Object}
   *
   * @public
   */
  parseBrowser() {
    if (this.parsedResult.browser) {
      return this.parsedResult.browser;
    }

    this.parsedResult.browser = {};

    const browser = browsersList.find((browser) => {
      return browser.test(this);
    });

    if (browser) {
      this.parsedResult.browser = browser.parse(this.getUA());
    }

    return this.parsedResult.browser;
  }

  /**
   * Test a UA string for a regexp
   * @param {RegExp} regex
   * @return {Boolean}
   */
  test(regex) {
    return regex.test(this._ua);
  }

  parseBrowserName() {}
  parseBrowserVersion() {}
  parsePlatform(){}
  parseOS(){}
  parseOSName(){}
  parseOSVersion(){}
  parseFullInfo(){}
}

export default Parser;
