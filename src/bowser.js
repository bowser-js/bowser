/*!
 * Bowser - a browser detector
 * https://github.com/lancedikson/bowser
 * MIT License | (c) Dustin Diaz 2012-2015
 * MIT License | (c) Denis Demchenko 2015-2017
 */
import Parser from './parser';

/**
 * Bowser class
 * Keep it simple as much as it can be
 * It's supposed to work with collections of Parser instances
 * rather then solve one-instance problems.
 * All the one-instance stuff is located in Parser class.
 */
class Bowser {
  /**
   * Creates a Parser instance instead of Bowser's one
   *
   * @param {String} UA — UserAgent string
   * @param {Boolean} [skipParsing=false] — same as skipParsing for Parser
   * @returns {Parser}
   *
   * @example
   * const bowser = new Bowser(window.navigator.userAgent);
   * bowser.getResult()
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
}

export default Bowser;
