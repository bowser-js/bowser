/**
 * UMD entry point for `bundled.js` — same as `es5.js`, but with the polyfills
 * needed by the browser targets baked in.
 *
 * `core-js/stable` + `regenerator-runtime/runtime` is the core-js@3 equivalent
 * of the deprecated `@babel/polyfill` that this bundle used to be built from.
 * `@babel/preset-env`'s `useBuiltIns: 'entry'` rewrites the `core-js/stable`
 * import below into just the polyfills the configured targets actually need.
 *
 * See `./es5.js` for why this only re-exports the default.
 */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Bowser from '../../src/bowser.js';

export default Bowser;
