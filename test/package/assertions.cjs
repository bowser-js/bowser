/* eslint-disable */
/**
 * Runs *inside* a throwaway directory that has the packed bowser tarball
 * extracted into ./node_modules/bowser, so that bare specifiers resolve the way
 * they would for a real consumer.
 *
 * Deliberately written as ES5-compatible CommonJS: this file has to run on
 * every Node version bowser claims to support, down to 12.16.3. No optional
 * chaining, no nullish coalescing, no top-level await.
 */
var assert = require('assert');
var fs = require('fs');
var path = require('path');
var vm = require('vm');

var UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 '
  + '(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

var passed = 0;
function check(name, fn) {
  fn();
  passed += 1;
  console.log('  ok  ' + name);
}

/** Node version gate — ESM was unflagged in 12.17.0. */
function nodeAtLeast(major, minor) {
  var parts = process.versions.node.split('.');
  var m = Number(parts[0]);
  var n = Number(parts[1]);
  return m > major || (m === major && n >= minor);
}

console.log('bowser package smoke test on Node ' + process.versions.node);

// --- The CommonJS contract -------------------------------------------------
// `require('bowser')` must be the Bowser class itself. If it ever becomes
// `{ default, parse, getParser }`, every existing consumer breaks.

check('require("bowser") is the class, not a module namespace', function () {
  var Bowser = require('bowser');
  assert.strictEqual(typeof Bowser, 'function');
  assert.strictEqual(typeof Bowser.getParser, 'function');
  assert.strictEqual(typeof Bowser.parse, 'function');
  assert.strictEqual(
    Bowser.default,
    undefined,
    'require("bowser").default is set — the CJS interop unwrap was lost',
  );
});

check('require("bowser") parses a user agent', function () {
  var Bowser = require('bowser');
  assert.strictEqual(Bowser.parse(UA).browser.name, 'Chrome');
  assert.strictEqual(Bowser.getParser(UA).getBrowserName(), 'Chrome');
});

check('constant maps are exposed', function () {
  var Bowser = require('bowser');
  assert.strictEqual(typeof Bowser.BROWSER_MAP, 'object');
  assert.strictEqual(typeof Bowser.ENGINE_MAP, 'object');
  assert.strictEqual(typeof Bowser.OS_MAP, 'object');
  assert.strictEqual(typeof Bowser.PLATFORMS_MAP, 'object');
});

// --- Legacy deep paths -----------------------------------------------------
// These resolved before the exports map existed. Adding an exports map without
// listing them turns them into ERR_PACKAGE_PATH_NOT_EXPORTED.

['bowser/es5.js', 'bowser/es5', 'bowser/bundled.js', 'bowser/bundled'].forEach(function (id) {
  check('require("' + id + '") works', function () {
    var B = require(id);
    assert.strictEqual(typeof B, 'function');
    assert.strictEqual(B.parse(UA).browser.name, 'Chrome');
  });
});

// The src/*.js files are ES module sources, so they resolve but do not execute
// under require(). Bundlers are the real consumer here. Assert resolution only.
[
  'bowser.js', 'constants.js', 'parser.js', 'parser-browsers.js',
  'parser-engines.js', 'parser-os.js', 'parser-platforms.js', 'utils.js',
].forEach(function (file) {
  var withExt = 'bowser/src/' + file;
  var withoutExt = withExt.replace(/\.js$/, '');
  check('resolves "' + withExt + '" and "' + withoutExt + '"', function () {
    assert.ok(fs.existsSync(require.resolve(withExt)));
    assert.ok(fs.existsSync(require.resolve(withoutExt)));
  });
});

check('require.resolve("bowser/package.json") works', function () {
  assert.ok(fs.existsSync(require.resolve('bowser/package.json')));
});

// --- The published manifest ------------------------------------------------

check('main/browser/module/types fields are unchanged', function () {
  var pkg = require('bowser/package.json');
  assert.strictEqual(pkg.main, 'es5.js');
  assert.strictEqual(pkg.browser, 'es5.js');
  assert.strictEqual(pkg.module, 'src/bowser.js');
  assert.strictEqual(pkg.types, 'index.d.ts');
});

check('no "engines" field (would warn/fail installs on old Node)', function () {
  var pkg = require('bowser/package.json');
  assert.strictEqual(pkg.engines, undefined);
});

check('no "type" field (would reclassify es5.js as ESM)', function () {
  var pkg = require('bowser/package.json');
  assert.strictEqual(pkg.type, undefined);
});

check('published file list is exactly what we expect', function () {
  var root = path.dirname(require.resolve('bowser/package.json'));
  var actual = [];
  (function walk(dir, prefix) {
    fs.readdirSync(dir).forEach(function (name) {
      var full = path.join(dir, name);
      if (fs.statSync(full).isDirectory()) walk(full, prefix + name + '/');
      else actual.push(prefix + name);
    });
  }(root, ''));

  var expected = [
    'LICENSE', 'README.md', 'bowser.mjs', 'bundled.js', 'es5.js',
    'index.d.mts', 'index.d.ts', 'package.json',
    'src/bowser.js', 'src/constants.js', 'src/parser-browsers.js',
    'src/parser-engines.js', 'src/parser-os.js', 'src/parser-platforms.js',
    'src/parser.js', 'src/utils.js',
  ];
  assert.deepStrictEqual(actual.sort(), expected.sort());
});

// --- The UMD / CDN contract ------------------------------------------------
// Script-tag consumers get `window.bowser` (lowercase). Nothing else covers
// this path, and a renamed global fails silently at runtime.

check('es5.js sets a lowercase `bowser` global when loaded as a script', function () {
  var file = require.resolve('bowser/es5.js');
  var sandbox = {};
  sandbox.self = sandbox;
  vm.runInNewContext(fs.readFileSync(file, 'utf8'), sandbox);
  assert.strictEqual(typeof sandbox.bowser, 'function', 'global `bowser` not set');
  assert.strictEqual(sandbox.bowser.parse(UA).browser.name, 'Chrome');
  assert.strictEqual(sandbox.Bowser, undefined, 'unexpected capitalised global');
});

check('es5.js contains no ES6 template literals', function () {
  // rolldown's built-in (oxc) minifier rewrites every string literal as a
  // template literal, which is a syntax error in the old browsers this bundle
  // targets. Guards against the terser step being dropped from the build.
  var code = fs.readFileSync(require.resolve('bowser/es5.js'), 'utf8');
  assert.strictEqual(code.indexOf('`'), -1, 'es5.js contains a backtick');
});

check('es5.js keeps the copyright banner', function () {
  var code = fs.readFileSync(require.resolve('bowser/es5.js'), 'utf8');
  assert.ok(code.indexOf('Bowser - a browser detector') !== -1);
});

// --- The ESM contract ------------------------------------------------------

if (!nodeAtLeast(12, 17)) {
  console.log('  --  skipping ESM checks (Node ' + process.versions.node + ' < 12.17)');
  console.log('\n' + passed + ' checks passed');
} else {
  // eslint-disable-next-line no-eval
  eval('import("bowser")')
    .then(function (mod) {
      check('import("bowser") has a working default export', function () {
        assert.strictEqual(typeof mod.default, 'function');
        assert.strictEqual(mod.default.parse(UA).browser.name, 'Chrome');
      });
      // This is issue #511: named imports must work, and must work unbound.
      check('import("bowser") has working named exports', function () {
        assert.strictEqual(typeof mod.parse, 'function');
        assert.strictEqual(typeof mod.getParser, 'function');
        var parse = mod.parse;
        var getParser = mod.getParser;
        assert.strictEqual(parse(UA).browser.name, 'Chrome');
        assert.strictEqual(getParser(UA).getBrowserName(), 'Chrome');
      });
      console.log('\n' + passed + ' checks passed');
    })
    .catch(function (err) {
      console.error('\nESM check failed: ' + err.stack);
      process.exit(1);
    });
}
