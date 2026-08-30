import test from 'ava';
import yaml from 'yamljs';
import path from 'path';
import Bowser from '../../src/bowser';
import BowserEs5 from '../../es5';
import BowserBundled from '../../bundled';
import BowserMjs from '../../bowser.mjs';

/**
 * Every published JS artifact is built from `src/` through a different
 * pipeline — raw ES modules, babel + terser UMD, UMD with core-js baked in,
 * and the rolldown ESM build. A regression in any one of them ships silently
 * unless each is asserted against the spec independently.
 *
 * `bowser.mjs` matters most: it is what the `import` condition of the exports
 * map resolves to, so it is the file every modern ESM and bundler consumer
 * actually runs. Testing only `src/` and `es5.js` leaves it uncovered.
 *
 * These are build outputs, so `pnpm build` has to run before `pnpm test`.
 * Importing `bowser.mjs` from this CommonJS test file relies on Node's
 * require(esm) support (Node >= 22.12) — the build toolchain already requires
 * a newer Node than that, so anything able to produce these files can load them.
 */
const artifacts = [
  ['src/bowser.js', Bowser],
  ['es5.js', BowserEs5],
  ['bundled.js', BowserBundled],
  ['bowser.mjs', BowserMjs],
];

// A missing build output fails at import with a plain "Cannot find module".
// This catches the quieter failure: an artifact that loads but is not the
// Bowser class — a broken UMD wrapper or a lost CJS interop unwrap would
// otherwise make every assertion below vacuous instead of failing.
artifacts.forEach(([name, artifact]) => {
  if (typeof artifact !== 'function' || typeof artifact.parse !== 'function') {
    throw new Error(`${name} did not load as the Bowser class — run \`pnpm build\` first`);
  }
});

const listOfUA = yaml.load(path.join(__dirname, 'useragentstrings.yml'));

const browserNames = Object.keys(listOfUA);

browserNames.forEach((browserName) => {
  listOfUA[browserName].forEach((browser, index) => {
    test(`Test ${browserName} ${index}`, (t) => {
      artifacts.forEach(([name, artifact]) => {
        t.deepEqual(artifact.parse(browser.ua), browser.spec, `${name}: ${browser.ua}`);
      });
      t.is(Bowser.parse(browser.ua).browser.name, browserName, `${browser.ua}`);
    });
  });
});
