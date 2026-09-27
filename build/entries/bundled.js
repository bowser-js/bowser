/**
 * UMD entry point for `bundled.js` — same as `es5.js`, but with the polyfills
 * needed by the browser targets baked in.
 *
 * This is the core-js@3 equivalent of the deprecated `@babel/polyfill` that
 * this bundle used to be built from, which was: all of ECMAScript, the
 * `timers`, `immediate` and DOM-collection iterator web polyfills, and
 * `regenerator-runtime`. `@babel/preset-env`'s `useBuiltIns: 'entry'` rewrites
 * the `core-js/*` imports below into the modules the configured targets need.
 *
 * `core-js/es` rather than `core-js/stable`: `stable` is `es` plus every web
 * polyfill, and the extra ones — `URL`, `URLSearchParams`, `queueMicrotask` —
 * were never in any released `bundled.js`, yet cost ~20 kB (~7 kB gzipped).
 * `test/acceptance/test-es5-runtime.js` pins the `@babel/polyfill` surface.
 *
 * See `./es5.js` for why this only re-exports the default.
 */
import 'core-js/es';
import 'core-js/web/dom-collections';
import 'core-js/web/immediate';
import 'core-js/web/timers';
import 'regenerator-runtime/runtime';
import Bowser from '../../src/bowser.js';

export default Bowser;
