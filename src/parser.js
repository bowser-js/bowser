import browserParsersList from './parser-browsers.js';
import osParsersList from './parser-os.js';
import platformParsersList from './parser-platforms.js';
import enginesParsersList from './parser-engines.js';
import Utils from './utils.js';

/**
 * A brand and version reported by User-Agent Client Hints.
 * @typedef {Object} ClientHintBrand
 * @property {string} brand Brand name, such as `Google Chrome`.
 * @property {string} version Version reported for the brand.
 */

/**
 * @typedef {Object} ClientHints
 * @property {ClientHintBrand[]} [brands] Brand and version entries.
 * @property {boolean} [mobile] Whether the device is mobile
 * @property {string} [platform] Platform name (e.g., "Windows", "macOS")
 * @property {string} [platformVersion] Platform version
 * @property {string} [architecture] CPU architecture
 * @property {string} [model] Device model
 * @property {boolean} [wow64] Whether running under WoW64
 */

/**
 * Parses a User-Agent string into browser, OS, platform, and engine details.
 * Client Hints are retained for inspection but do not alter parsing results.
 * @class
 */
class Parser {
  /**
   * Create instance of Parser
   *
   * @param {String} UA User-Agent string
   * @param {Boolean|ClientHints} [skipParsingOrHints=false] Either a boolean to skip parsing,
   * or a ClientHints object containing User-Agent Client Hints data
   * @param {ClientHints} [clientHints] User-Agent Client Hints data (navigator.userAgentData)
   *
   * @throws {Error} when the UA string is empty
   *
   * @constructor
   */
  constructor(UA, skipParsingOrHints = false, clientHints = null) {
    if (UA === void (0) || UA === null || UA === '') {
      throw new Error("UserAgent parameter can't be empty");
    }

    this._ua = UA;

    // Handle overloaded constructor: (UA, clientHints) or (UA, skipParsing, clientHints)
    let skipParsing = false;
    if (typeof skipParsingOrHints === 'boolean') {
      skipParsing = skipParsingOrHints;
      this._hints = clientHints;
    } else if (skipParsingOrHints != null && typeof skipParsingOrHints === 'object') {
      this._hints = skipParsingOrHints;
    } else {
      this._hints = null;
    }

    /**
     * @typedef ParsedResult
     * @property {Object} browser
     * @property {String|undefined} [browser.name]
     * Browser name, like `"Chrome"` or `"Internet Explorer"`
     * @property {String|undefined} [browser.version] Browser version as a String `"12.01.45334.10"`
     * @property {Object} os
     * @property {String|undefined} [os.name] OS name, like `"Windows"` or `"macOS"`
     * @property {String|undefined} [os.version] OS version, like `"NT 5.1"` or `"10.11.1"`
     * @property {String|undefined} [os.versionName] OS name, like `"XP"` or `"High Sierra"`
     * @property {Object} platform
     * @property {String|undefined} [platform.type]
     * Platform type: `desktop`, `tablet`, `mobile`, `tv`, or `bot`.
     * @property {String|undefined} [platform.vendor] Vendor of the device,
     * like `"Apple"` or `"Samsung"`
     * @property {String|undefined} [platform.model] Device model,
     * like `"iPhone"` or `"Kindle Fire HD 7"`
     * @property {Object} engine
     * @property {String|undefined} [engine.name]
     * Can be any of this: `WebKit`, `Blink`, `Gecko`, `Trident`, `Presto`, `EdgeHTML`,
     * `LibWeb`
     * @property {String|undefined} [engine.version] String version of the engine
     */
    this.parsedResult = {};

    if (skipParsing !== true) {
      this.parse();
    }
  }

  /**
   * Get Client Hints data
   * @return {ClientHints|null}
   *
   * @public
   * @example
   * const parser = Bowser.getParser(UA, clientHints);
   * const hints = parser.getHints();
   * console.log(hints.platform); // 'Windows'
   * console.log(hints.mobile); // false
   */
  getHints() {
    return this._hints;
  }

  /**
   * Check if a brand exists in Client Hints brands array
   * @param {string} brandName The brand name to check for
   * @return {boolean}
   *
   * @public
   * @example
   * const parser = Bowser.getParser(UA, clientHints);
   * if (parser.hasBrand('Google Chrome')) {
   *   console.log('Chrome detected!');
   * }
   */
  hasBrand(brandName) {
    if (!this._hints || !Array.isArray(this._hints.brands)) {
      return false;
    }
    const brandLower = brandName.toLowerCase();
    return this._hints.brands.some(
      b => b.brand && b.brand.toLowerCase() === brandLower,
    );
  }

  /**
   * Get brand version from Client Hints
   * @param {string} brandName The brand name to get version for
   * @return {string|undefined}
   *
   * @public
   * @example
   * const parser = Bowser.getParser(UA, clientHints);
   * const version = parser.getBrandVersion('Google Chrome');
   * console.log(version); // '131'
   */
  getBrandVersion(brandName) {
    if (!this._hints || !Array.isArray(this._hints.brands)) {
      return undefined;
    }
    const brandLower = brandName.toLowerCase();
    // `Utils.find`, not `Array.prototype.find`: the latter is ES6, and `es5.js`
    // ships no polyfills, so it throws outright on the browsers that bundle
    // targets. Every other lookup in this file already goes through the helper.
    const brand = Utils.find(
      this._hints.brands,
      b => b.brand && b.brand.toLowerCase() === brandLower,
    );
    return brand ? brand.version : undefined;
  }

  /**
   * Get the User-Agent string of the current Parser instance.
   * @return {String} User-Agent string of the current Parser object.
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
   * Parse the User-Agent string and save the result to `parsedResult.browser`.
   * @return {Object}
   */
  parseBrowser() {
    this.parsedResult.browser = {};

    const browserDescriptor = Utils.find(browserParsersList, (_browser) => {
      if (typeof _browser.test === 'function') {
        return _browser.test(this);
      }

      if (Array.isArray(_browser.test)) {
        return _browser.test.some(condition => this.test(condition));
      }

      throw new Error("Browser's test function is not valid");
    });

    if (browserDescriptor) {
      this.parsedResult.browser = browserDescriptor.describe(this.getUA(), this);
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
   * @return {String|undefined} Version of the browser, when available.
   *
   * @public
   */
  getBrowserVersion() {
    return this.getBrowser().version;
  }

  /**
   * Get parsed operating-system details.
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

    const os = Utils.find(osParsersList, (_os) => {
      if (typeof _os.test === 'function') {
        return _os.test(this);
      }

      if (Array.isArray(_os.test)) {
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
   * @return {String|undefined} Full version with dots, if available.
   */
  getOSVersion() {
    return this.getOS().version;
  }

  /**
   * Get parsed platform details.
   * @return {{}}
   */
  getPlatform() {
    if (this.parsedResult.platform) {
      return this.parsedResult.platform;
    }

    return this.parsePlatform();
  }

  /**
   * Get platform type, such as `desktop`, `mobile`, `tablet`, `tv`, or `bot`.
   * @param {Boolean} [toLowerCase=false]
   * @return {String} Platform type, or an empty string when unknown.
   */
  getPlatformType(toLowerCase = false) {
    const { type } = this.getPlatform();

    if (toLowerCase) {
      return String(type).toLowerCase() || '';
    }

    return type || '';
  }

  /**
   * Parse platform and save it to `parsedResult.platform`.
   * @return {{}}
   */
  parsePlatform() {
    this.parsedResult.platform = {};

    const platform = Utils.find(platformParsersList, (_platform) => {
      if (typeof _platform.test === 'function') {
        return _platform.test(this);
      }

      if (Array.isArray(_platform.test)) {
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
   * Get the rendering-engine name.
   * @param {Boolean} [toLowerCase=false] Return the name in lowercase.
   * @return {String} Engine name or an empty string.
   *
   * @public
   */
  getEngineName(toLowerCase) {
    if (toLowerCase) {
      return String(this.getEngine().name).toLowerCase() || '';
    }
    return this.getEngine().name || '';
  }

  /**
   * Parse engine and save it to `parsedResult.engine`.
   * @return {{}}
   */
  parseEngine() {
    this.parsedResult.engine = {};

    const engine = Utils.find(enginesParsersList, (_engine) => {
      if (typeof _engine.test === 'function') {
        return _engine.test(this);
      }

      if (Array.isArray(_engine.test)) {
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
   * @returns {Parser}
   */
  parse() {
    this.parseBrowser();
    this.parseOS();
    this.parsePlatform();
    this.parseEngine();

    return this;
  }

  /**
   * Get parsed result
   * @return {ParsedResult}
   */
  getResult() {
    return Utils.assign({}, this.parsedResult);
  }

  /**
   * Check if parsed browser matches certain conditions
   *
   * @param {Object} checkTree A map of browser names or aliases to version rules,
   * optionally nested under OS names or platform types.
   *
   * @returns {Boolean|undefined} Whether the browser satisfies the set conditions or not.
   * Returns `false` when matching OS or platform definitions do not define the browser.
   * Returns `undefined` when no scope matches and the browser is not defined at the top level.
   *
   * @example
   * const browser = Bowser.getParser(window.navigator.userAgent);
   * if (browser.satisfies({chrome: '>118.01.1322' }))
   * // or with os
   * if (browser.satisfies({windows: { chrome: '>118.01.1322' } }))
   * // or with platforms
   * if (browser.satisfies({desktop: { chrome: '>118.01.1322' } }))
   *
   * Version rules support `>`, `>=`, `<`, `<=`, `=`, and `~`; values may also
   * be arrays of rules, where any matching rule returns true. A matching OS or
   * platform scope takes precedence over top-level browser rules. If a matching
   * scope does not include the current browser, the result is false. If no
   * scope matches and no top-level browser entry applies, the result is undefined.
   */
  satisfies(checkTree) {
    const platformsAndOSes = {};
    let platformsAndOSCounter = 0;
    let scopedDefinitionMatched = false;
    const browsers = {};
    let browsersCounter = 0;

    const allDefinitions = Object.keys(checkTree);

    allDefinitions.forEach((key) => {
      const currentDefinition = checkTree[key];
      if (typeof currentDefinition === 'string' || Array.isArray(currentDefinition)) {
        browsers[key] = currentDefinition;
        browsersCounter += 1;
      } else if (typeof currentDefinition === 'object') {
        platformsAndOSes[key] = currentDefinition;
        platformsAndOSCounter += 1;
      }
    });

    if (platformsAndOSCounter > 0) {
      const platformsAndOSNames = Object.keys(platformsAndOSes);
      const OSMatchingDefinition = Utils.find(platformsAndOSNames, name => (this.isOS(name)));

      if (OSMatchingDefinition) {
        scopedDefinitionMatched = true;
        const osResult = this.satisfies(platformsAndOSes[OSMatchingDefinition]);

        if (osResult !== void 0) {
          return osResult;
        }
      }

      const platformMatchingDefinition = Utils.find(
        platformsAndOSNames,
        name => (this.isPlatform(name)),
      );
      if (platformMatchingDefinition) {
        scopedDefinitionMatched = true;
        const platformResult = this.satisfies(platformsAndOSes[platformMatchingDefinition]);

        if (platformResult !== void 0) {
          return platformResult;
        }
      }
    }

    if (scopedDefinitionMatched) {
      return false;
    }

    if (browsersCounter > 0) {
      const browserNames = Object.keys(browsers);
      const matchingDefinition = Utils.find(browserNames, name => (this.isBrowser(name, true)));

      if (matchingDefinition !== void 0) {
        return this.compareVersions(browsers[matchingDefinition]);
      }
    }

    return undefined;
  }

  /**
   * Check if the browser name equals the passed string
   * @param {string} browserName The string to compare with the browser name
   * @param [includingAlias=false] The flag showing whether alias will be included into comparison
   * @returns {boolean}
   */
  isBrowser(browserName, includingAlias = false) {
    const defaultBrowserName = this.getBrowserName().toLowerCase();
    let browserNameLower = browserName.toLowerCase();
    const alias = Utils.getBrowserTypeByAlias(browserNameLower);

    if (includingAlias && alias) {
      browserNameLower = alias.toLowerCase();
    }
    return browserNameLower === defaultBrowserName;
  }

  /**
   * Check whether the browser version matches one or more version rules.
   * Arrays use OR logic and return true when any rule matches.
   * @param {string|string[]} versionsOrVersion A version rule or rules.
   * @returns {boolean|undefined} Whether a rule matches, or undefined if a single rule is checked and no browser version is available.
   * @public
   */
  compareVersions(versionsOrVersion) {
    if (typeof versionsOrVersion === 'string') {
      return this.compareVersion(versionsOrVersion);
    }

    return versionsOrVersion.some(version => this.compareVersion(version));
  }

  /**
   * Compare the browser version against one version rule.
   * Supported operators are `>`, `>=`, `<`, `<=`, `=`, and `~`.
   * @param {string} version Version rule to compare.
   * @returns {boolean|undefined} Whether the rule matches, or undefined if the browser has no version.
   * @public
   */
  compareVersion(version) {
    let expectedResults = [0];
    let comparableVersion = version;
    let isLoose = false;

    const currentBrowserVersion = this.getBrowserVersion();

    if (typeof currentBrowserVersion !== 'string') {
      return void 0;
    }

    if (version[0] === '>' || version[0] === '<') {
      comparableVersion = version.substr(1);
      if (version[1] === '=') {
        isLoose = true;
        comparableVersion = version.substr(2);
      } else {
        expectedResults = [];
      }
      if (version[0] === '>') {
        expectedResults.push(1);
      } else {
        expectedResults.push(-1);
      }
    } else if (version[0] === '=') {
      comparableVersion = version.substr(1);
    } else if (version[0] === '~') {
      isLoose = true;
      comparableVersion = version.substr(1);
    }

    return expectedResults.indexOf(
      Utils.compareVersions(currentBrowserVersion, comparableVersion, isLoose),
    ) > -1;
  }

  /**
   * Check if the OS name equals the passed string
   * @param {string} osName The string to compare with the OS name
   * @returns {boolean}
   */
  isOS(osName) {
    return this.getOSName(true) === String(osName).toLowerCase();
  }

  /**
   * Check if the platform type equals the passed string
   * @param {string} platformType The string to compare with the platform type
   * @returns {boolean}
   */
  isPlatform(platformType) {
    return this.getPlatformType(true) === String(platformType).toLowerCase();
  }

  /**
   * Check if the engine name equals the passed string
   * @param {string} engineName The string to compare with the engine name
   * @returns {boolean}
   */
  isEngine(engineName) {
    return this.getEngineName(true) === String(engineName).toLowerCase();
  }

  /**
   * Is anything? Check if the browser is called "anything",
   * the OS called "anything" or the platform called "anything"
   * @param {String} anything
   * @param [includingAlias=false] The flag showing whether alias will be included into comparison
   * @returns {Boolean}
   */
  is(anything, includingAlias = false) {
    return this.isBrowser(anything, includingAlias) || this.isOS(anything)
      || this.isPlatform(anything);
  }

  /**
   * Check if any of the given values satisfies this.is(anything)
   * @param {String[]} [anythings=[]] Browser, OS, platform, or engine names to check.
   * @returns {Boolean}
   */
  some(anythings = []) {
    return anythings.some(anything => this.is(anything));
  }
}

export default Parser;
