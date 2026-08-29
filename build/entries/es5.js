/**
 * UMD entry point for `es5.js`.
 *
 * `src/bowser.js` also has named exports (`parse`, `getParser`) so that ESM
 * consumers can `import { getParser } from 'bowser'`. A UMD bundle with named
 * exports would expose `module.exports = { default, parse, getParser }`, which
 * would break every existing `require('bowser')` and `window.bowser` consumer.
 *
 * Re-exporting only the default here keeps the UMD output at
 * `module.exports = Bowser` / `window.bowser = Bowser`. The class carries
 * `parse` and `getParser` as static methods, so nothing is lost.
 */
import Bowser from '../../src/bowser.js';

export default Bowser;
