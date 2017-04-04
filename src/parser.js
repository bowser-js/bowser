var browsers = require('./parser-browsers');

class Parser {
  constructor(UA) {
    this._ua = UA;
    this.result = {};
  }

  parseBrowser() {
    if (this.result.browser) {
      return this.result.browser;
    }

    const browser = browsers.find((browser) => {
      return browser.test.some((result, item) => { item.test(this._ua)});
    });
  }

  parseBrowserName() {}
  parseBrowserVersion() {}
  parsePlatform(){}
  parseOS(){}
  parseOSName(){}
  parseOSVersion(){}
  parseFullInfo(){}
}

module.exports = Parser;
