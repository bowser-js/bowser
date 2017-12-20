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
   * Creates an object that parses UA
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
    return new Parser(UA);
  }

  static parse(UA) {
    return (new this.constructor(UA)).getResult();
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
  // static notInRange(range) {}


  // static filter(UACollection, range) {}
  // static inRange(range, UACollection) {}
}

export default Bowser;
