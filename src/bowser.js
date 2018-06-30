/*!
 * Bowser - a browser detector
 * https://github.com/lancedikson/bowser
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
   * @param {String} UA — UserAgent string
   * @param {Boolean} [skipParsing=false] — same as skipParsing for Parser
   *
   * @example
   * const bowser = new Bowser(window.navigator.userAgent);
   * bowser.getBrowser()
   */
  constructor(UA, skipParsing=false) {
    if (typeof UA !== 'string') {
      throw new Error('UserAgent should be a string');
    }
    return new Parser(UA, skipParsing);
  }

  static parse(UA) {
    return (new Bowser(UA)).getResult();
  }

  /**
   * Check if the browser is in range or not
   * @param {Object} range
   * @returns {Boolean}
   */
  // static inRange(range) {
  //   if (!range) {
  //     throw new Error('Range can not be empty');
  //   }
  // }

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
