import { defineConfig } from 'tsdown';
import babel from '@rolldown/plugin-babel';
import { minify } from 'terser';
import { transformAsync } from '@babel/core';

const banner = `/*!
 * Bowser - a browser detector
 * https://github.com/lancedikson/bowser
 * MIT License | (c) Dustin Diaz 2012-2015
 * MIT License | (c) Denis Demchenko 2015-2026
 */`;

/**
 * The browser targets the UMD bundles are transpiled down to. Unchanged from
 * the webpack build these bundles replaced — the published `es5.js` is relied
 * on by script-tag and CDN consumers on very old browsers.
 */
const legacyTargets = {
  ie: '8',
  browsers: '>2%',
};

/**
 * `useBuiltIns: false` for `es5.js` and `bowser.mjs` (syntax transpilation
 * only) and `'entry'` for `bundled.js`, which expands the `core-js/*` imports in
 * its entry. `corejs: '3'` means 3.0, so `'entry'` only ever expands to modules
 * that existed in core-js 3.0 — no later additions leak in.
 *
 * Switching to `useBuiltIns: 'usage'` would shrink the bundle a long way, and
 * would be wrong: the README tells consumers to reach for `bundled.js`
 * precisely when they have no polyfills of their own, so it has to keep
 * shipping the full payload rather than only what bowser itself calls. See
 * `build/entries/bundled.js` for what that payload is.
 */
const legacyBabel = (useBuiltIns: false | 'entry') => babel({
  presets: [['@babel/preset-env', {
    // Let rolldown emit the UMD wrapper; babel only lowers syntax here.
    modules: false,
    loose: true,
    useBuiltIns,
    ...(useBuiltIns ? { corejs: '3', exclude: NOT_IN_BABEL_POLYFILL } : {}),
    targets: legacyTargets,
  }]],
});

/**
 * The only core-js 3.0 `es` / web modules with no counterpart in the
 * `@babel/polyfill` (core-js 2) set that every released `bundled.js` shipped:
 * the `concat`/`splice` species fixes, `Array#flat`, `Object.fromEntries`, the
 * Annex B `__defineGetter__` family and `NodeList#forEach`. Excluding them makes
 * the payload exactly that set again, 2.8 kB (0.9 kB gzipped) smaller.
 *
 * babel rejects unknown names here, so a rename in core-js fails the build
 * rather than silently shipping the module again.
 */
const NOT_IN_BABEL_POLYFILL = [
  'es.array.concat',
  'es.array.flat',
  'es.array.splice',
  'es.array.unscopables.flat',
  'es.object.define-getter',
  'es.object.define-setter',
  'es.object.from-entries',
  'es.object.lookup-getter',
  'es.object.lookup-setter',
  'web.dom-collections.for-each',
];

/**
 * Lowers the *emitted chunk* to ES5, after bundling and before terser.
 *
 * `legacyBabel()` above only transforms input modules. Rolldown appends its own
 * runtime helpers afterwards — notably the `__commonJS` wrapper it injects for
 * CommonJS dependencies — and emits them in modern syntax:
 *
 *     var t=(t,e)=>()=>(e||(t((e={exports:{}}).exports,e),t=null),e.exports)
 *
 * terser's `ecma: 5` does not transpile; it only avoids *introducing* newer
 * syntax. So those arrow functions survived into the published `bundled.js`,
 * making the whole file a SyntaxError in the ES5 engines it exists to serve.
 * `es5.js` has no CommonJS dependencies, so it never got a helper — which is
 * why only `bundled.js` was affected, and why this has to run on the output
 * rather than being folded into `legacyBabel()`.
 *
 * `useBuiltIns: false` here on purpose: `bundled.js` already has its polyfills
 * inlined by the input pass, and re-expanding them would recurse.
 *
 * `sourceType` is `'script'` for the UMD IIFEs and `'module'` for
 * `bowser.mjs`, whose `export` statement must survive untouched.
 */
const lowerChunkToEs5 = (sourceType: 'script' | 'module' = 'script') => ({
  name: 'bowser:babel-output',
  async renderChunk(code: string, chunk: { fileName: string }) {
    const result = await transformAsync(code, {
      babelrc: false,
      configFile: false,
      sourceType,
      // core-js is large and already ES5; skipping its size guard keeps babel
      // from silently bailing out of compiling `bundled.js`.
      compact: false,
      generatorOpts: { comments: true },
      presets: [['@babel/preset-env', {
        modules: false,
        loose: true,
        useBuiltIns: false,
        targets: legacyTargets,
      }]],
    });
    if (typeof result?.code !== 'string') {
      throw new Error(`babel produced no output for ${chunk.fileName}`);
    }
    return { code: result.code };
  },
});

/**
 * Minifies the UMD chunks with terser instead of rolldown's built-in (oxc)
 * minifier.
 *
 * This is not a preference. oxc's minifier prints every string literal as a
 * template literal and refuses any `compress.target` below `es2015`, so it
 * cannot emit ES5 — it would silently undo babel's lowering and break the very
 * old browsers `es5.js` exists to serve. terser (`ecma: 5`) is also what the
 * webpack 4 build this replaced used, via terser-webpack-plugin.
 */
const terser = () => ({
  name: 'bowser:terser',
  async renderChunk(code: string, chunk: { fileName: string }) {
    const result = await minify(code, {
      ecma: 5,
      // IE 8: reserved words as property names must stay quoted.
      ie8: true,
      safari10: true,
      // Output stops shrinking at 5 passes (measured; 6+ is byte-identical).
      compress: { passes: 5 },
      format: {
        // Keep the `/*!` banner.
        comments: /^!/,
      },
    });
    if (typeof result.code !== 'string') {
      throw new Error(`terser produced no output for ${chunk.fileName}`);
    }
    return { code: result.code };
  },
});

const umd = (name: string, entry: string, useBuiltIns: false | 'entry') => ({
  entry: { [name]: entry },
  format: ['umd' as const],
  // Lowercase, matching the global the webpack build published. Renaming this
  // to `Bowser` would break every `<script src=".../bowser/es5.js">` consumer.
  globalName: 'bowser',
  outputOptions: {
    // `module.exports = Bowser` rather than `{ default: Bowser }`.
    exports: 'default' as const,
    // Default would be `<name>.umd.js`; these files are published paths.
    entryFileNames: '[name].js',
  },
  outDir: '.',
  platform: 'browser' as const,
  plugins: [legacyBabel(useBuiltIns), lowerChunkToEs5(), terser()],
  // webpack ran in `mode: 'production'`; minification happens in `terser()`
  // above, so rolldown's own minifier stays off. See its comment for why.
  minify: false,
  banner,
  dts: false,
  // outDir is the repo root — never let tsdown clean it.
  clean: false,
});

export default defineConfig([
  umd('es5', 'build/entries/es5.js', false),
  umd('bundled', 'build/entries/bundled.js', 'entry'),
  {
    // ESM build, reached via the `import` condition of the exports map.
    //
    // Lowered to ES5 syntax like the UMD bundles, keeping only `export`. Before
    // the exports map existed, webpack, Rollup (`browser: true`) and esbuild all
    // picked the `browser` field — `es5.js` — for `import 'bowser'`, not
    // `module`. Shipping ES2015 here would make esbuild `--target=es5` fail
    // outright, and ship classes into ES5 builds from webpack, which does not
    // transpile node_modules by default.
    entry: { bowser: 'src/bowser.js' },
    format: ['esm'],
    outDir: '.',
    outExtensions: () => ({ js: '.mjs' }),
    platform: 'browser',
    plugins: [legacyBabel(false), lowerChunkToEs5('module')],
    // Must be explicit. Left unset, rolldown still re-prints the chunk *after*
    // `renderChunk` (dead-code-elimination-only minify), and its printer turns
    // `{ version: version }` back into the ES2015 shorthand `{ version }`.
    minify: false,
    banner,
    dts: false,
    clean: false,
  },
]);
