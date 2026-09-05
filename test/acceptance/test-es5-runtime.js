import test from 'ava';
import fs from 'fs';
import path from 'path';
import vm from 'vm';

/**
 * Runs the legacy bundles on a global object stripped back to ES5.1.
 *
 * `test-es5-conformance.js` checks *syntax*. This checks *runtime APIs*, which
 * is a separate failure mode babel cannot protect against: `@babel/preset-env`
 * lowers syntax, but without `useBuiltIns` it never polyfills library calls. A
 * single `Array.prototype.includes` or `Object.assign` in the parser source
 * compiles cleanly, passes every test on modern Node, and then throws
 * `TypeError: undefined is not a function` on the old browsers `es5.js` targets.
 *
 * `es5.js` ships with no polyfills at all, so it has to survive here on its own.
 * `bundled.js` carries core-js and has to install what it needs and still work.
 *
 * These are build outputs — run `pnpm build` before `pnpm test`.
 */
const root = path.join(__dirname, '..', '..');

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 '
  + '(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

// Everything below postdates ES5.1. Not exhaustive — it covers the APIs a UA
// parser plausibly reaches for, which is what makes it a useful tripwire.
const ES6_GLOBALS = ['Promise', 'Symbol', 'Map', 'Set', 'WeakMap', 'WeakSet', 'Proxy', 'Reflect', 'globalThis', 'BigInt'];
const ES6_STATICS = {
  Object: ['assign', 'entries', 'values', 'fromEntries', 'getOwnPropertySymbols', 'setPrototypeOf'],
  Array: ['from', 'of'],
  String: ['raw', 'fromCodePoint'],
  Number: ['isInteger', 'isNaN', 'parseFloat', 'isFinite', 'EPSILON'],
  Math: ['trunc', 'sign', 'log2', 'clz32'],
};
const ES6_PROTOS = {
  Array: ['includes', 'find', 'findIndex', 'flat', 'flatMap', 'fill', 'copyWithin', 'at'],
  String: ['includes', 'startsWith', 'endsWith', 'repeat', 'padStart', 'padEnd', 'trimStart', 'trimEnd', 'matchAll', 'at', 'normalize', 'codePointAt'],
};

function createEs5Context() {
  const context = vm.createContext({});
  // UMD bundles look for a global; `self` is the browser-shaped one.
  vm.runInContext('this.self = this;', context);
  const deletions = []
    .concat(ES6_GLOBALS.map((g) => `this.${g}`))
    .concat(...Object.entries(ES6_STATICS).map(([o, keys]) => keys.map((k) => `${o}.${k}`)))
    .concat(...Object.entries(ES6_PROTOS).map(([o, keys]) => keys.map((k) => `${o}.prototype.${k}`)))
    .map((ref) => `try { delete ${ref}; } catch (e) {}`)
    .join('\n');
  vm.runInContext(deletions, context);
  return context;
}

test('the ES5 sandbox actually strips the modern APIs', (t) => {
  // Guards the guard: if stripping silently stopped working, every assertion
  // below would pass against a fully modern global and prove nothing.
  const context = createEs5Context();
  t.is(vm.runInContext('typeof Promise', context), 'undefined');
  t.is(vm.runInContext('typeof Object.assign', context), 'undefined');
  t.is(vm.runInContext('typeof [].includes', context), 'undefined');
  t.is(vm.runInContext('typeof "".startsWith', context), 'undefined');
});

['es5.js', 'bundled.js'].forEach((file) => {
  test(`${file} runs on an ES5-only global`, (t) => {
    const context = createEs5Context();
    const source = fs.readFileSync(path.join(root, file), 'utf8');

    t.notThrows(() => vm.runInContext(source, context), `${file} threw while loading`);
    t.is(vm.runInContext('typeof this.bowser', context), 'function');

    context.__ua = UA;
    t.is(vm.runInContext('this.bowser.parse(this.__ua).browser.name', context), 'Chrome');
    t.is(vm.runInContext('this.bowser.parse(this.__ua).os.name', context), 'macOS');
    t.true(vm.runInContext('this.bowser.getParser(this.__ua).satisfies({ chrome: ">100" })', context));
  });
});

/**
 * Client Hints go down a different code path than `parse()` — `isBrandVersion`
 * and `getBrandVersion` reach into `_hints.brands` directly — so the checks
 * above never touch them. `getBrandVersion` used `Array.prototype.find`, which
 * is ES6, and threw on exactly the browsers `es5.js` exists for.
 *
 * The inputs are built by a script evaluated *inside* the context rather than
 * assigned onto it. An array created in the host realm keeps the host's
 * `Array.prototype`, so its `find` survives the sandbox's delete and the test
 * passes against a bug that is still there. A real browser hands the parser a
 * same-realm array, which is what this reproduces.
 */
['es5.js', 'bundled.js'].forEach((file) => {
  test(`${file} handles Client Hints on an ES5-only global`, (t) => {
    const context = createEs5Context();
    vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context);

    const result = vm.runInContext(`
      var ua = ${JSON.stringify(UA)};
      var hints = {
        brands: [
          { brand: 'Chromium', version: '131' },
          { brand: 'Google Chrome', version: '131' },
        ],
        mobile: false,
        platform: 'macOS',
      };
      var parser = this.bowser.getParser(ua, false, hints);
      ({
        brandVersion: parser.getBrandVersion('Google Chrome'),
        missingBrand: parser.getBrandVersion('Firefox'),
        hasBrand: parser.hasBrand('Google Chrome'),
        hasOtherBrand: parser.hasBrand('Firefox'),
        hints: !!parser.getHints(),
      })
    `, context);

    t.is(result.brandVersion, '131');
    t.is(result.missingBrand, undefined);
    t.true(result.hasBrand);
    t.false(result.hasOtherBrand);
    t.true(result.hints);
  });
});

test('bundled.js installs the polyfills it promises', (t) => {
  // The README tells consumers to reach for bundled.js when they have no
  // polyfills of their own, so it has to actually populate the environment.
  const context = createEs5Context();
  vm.runInContext(fs.readFileSync(path.join(root, 'bundled.js'), 'utf8'), context);
  t.is(vm.runInContext('typeof Promise', context), 'function');
  t.is(vm.runInContext('typeof Object.assign', context), 'function');
  t.is(vm.runInContext('typeof [].includes', context), 'function');
});
