/*!
 * Bowser - a browser detector
 * https://github.com/ded/bowser
 * MIT License | (c) Dustin Diaz 2012-2015
 * MIT License | (c) Denis Demchenko 2015-2017
 */
import Parser from './parser';

/*
* Ideas
* - Cacheable response
* */

/**
 * Bowser class
 */
class Bowser {
  /**
   * Creates an object that parse UA
   * @param UA
   *
   * @example
   * const bowser = new Bowser(window.navigator.userAgent);
   * bowser.getBrowser()
   */
  constructor(UA) {
    if (!UA) {
      throw new Error('UserAgent is not defined');
    }
    this._ua = UA;
    this._parser = new Parser(UA);
  }

  /**
   * Get browser's version
   * @returns {String}
   */
  getBrowserVersion() {
    return this._parser.getBrowserVersion();
  }

  /**
   * Get a browser's name
   * @returns {String}
   */
  getBrowserName() {
    return this._parser.getBrowserName();
  }

  /**
   * Get an object with a name and version of the browser
   * @returns {Object}
   */
  getBrowser() {
    return this._parser.getBrowser();
  }

  /**
   * Get an object with a name and version of the OS if it's defined
   * @returns {Object}
   */
  getOS() {
    return this._parser.getOS();
  }

  /**
   * Get name of OS
   * @returns {String}
   */
  getOSName() {
    return this._parser.getOSName();
  }

  /**
   * Get OS version
   */
  getOSVersion() {
    return this._parser.getOSVersion();
  }

  /**
   * Check if the browser is in range or not
   * @param {Object} range
   * @returns {Boolean}
   */
  static inRange(range) {
    if (!range) {
      throw new Error('Range can not be empty');
    }
  }

  /**
   * Check if the browser is NOT in range or not
   * @param {Object} range
   * @returns {Boolean}
   */
  static notInRange(range) {}


  // static filter(UACollection, range) {}
  // static inRange(range, UACollection) {}
}
