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
 * `useBuiltIns: false` for `es5.js` (syntax transpilation only) and `'entry'`
 * for `bundled.js`, which expands the `core-js/stable` import in its entry.
 *
 * `'entry'` is why `bundled.js` grew from 124 kB to 174 kB when it stopped
 * being built from the deprecated `@babel/polyfill`. That package was core-js
 * **2**; `core-js/stable` is core-js **3**, whose stable surface is genuinely
 * larger — `globalThis`, `Object.fromEntries` and `URLSearchParams` are all
 * new here. The extra weight is the upgrade, not waste.
 *
 * Switching to `useBuiltIns: 'usage'` would shrink the bundle a long way, and
 * would be wrong: the README tells consumers to reach for `bundled.js`
 * precisely when they have no polyfills of their own, so it has to keep
 * shipping the full payload rather than only what bowser itself calls.
 */
const legacyBabel = (useBuiltIns: false | 'entry') => babel({
  presets: [['@babel/preset-env', {
    // Let rolldown emit the UMD wrapper; babel only lowers syntax here.
    modules: false,
    loose: true,
    useBuiltIns,
    ...(useBuiltIns ? { corejs: '3' } : {}),
    targets: legacyTargets,
  }]],
});

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
 */
const lowerChunkToEs5 = () => ({
  name: 'bowser:babel-output',
  async renderChunk(code: string, chunk: { fileName: string }) {
    const result = await transformAsync(code, {
      babelrc: false,
      configFile: false,
      // The emitted chunk is a UMD IIFE, i.e. a script, not a module.
      sourceType: 'script',
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
    // Modern ESM build. Reached via the `import` condition of the exports map.
    // Deliberately not run through babel: `module` still points at the raw
    // `src/bowser.js`, so this must not be *more* conservative than that.
    entry: { bowser: 'src/bowser.js' },
    format: ['esm'],
    outDir: '.',
    outExtensions: () => ({ js: '.mjs' }),
    platform: 'browser',
    banner,
    dts: false,
    clean: false,
  },
]);
