import { defineConfig } from 'tsdown';
import babel from '@rolldown/plugin-babel';
import { minify } from 'terser';

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
  plugins: [legacyBabel(useBuiltIns), terser()],
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
