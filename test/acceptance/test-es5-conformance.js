import test from 'ava';
import fs from 'fs';
import path from 'path';
import * as acorn from 'acorn';

/**
 * `es5.js` and `bundled.js` exist to serve browsers that predate ES2015. If a
 * single arrow function or template literal reaches either file, the whole
 * script is a SyntaxError there and bowser is not merely degraded, it is dead.
 *
 * A grep for backticks is not enough. When the webpack build was replaced by
 * tsdown, rolldown's `__commonJS` interop helper — appended *after* babel runs,
 * and left alone by terser, which avoids introducing new syntax but does not
 * transpile — shipped arrow functions into `bundled.js`:
 *
 *     var t=(t,e)=>()=>(e||(t((e={exports:{}}).exports,e),t=null),e.exports)
 *
 * Parsing the emitted files at `ecmaVersion: 5` is the only check that covers
 * the whole file, including helpers no source-level transform ever sees.
 *
 * These are build outputs — run `pnpm build` before `pnpm test`.
 */
const root = path.join(__dirname, '..', '..');

const legacyBundles = ['es5.js', 'bundled.js'];

legacyBundles.forEach((file) => {
  test(`${file} parses as ES5`, (t) => {
    const source = fs.readFileSync(path.join(root, file), 'utf8');
    t.notThrows(
      () => acorn.parse(source, { ecmaVersion: 5 }),
      `${file} contains syntax newer than ES5 — it will throw on load in the `
      + 'browsers this bundle exists to support',
    );
  });

  test(`${file} contains no template literals`, (t) => {
    // Backticks inside string literals are fine (core-js has a few). Only a
    // real template-literal token is a problem, so tokenise rather than grep.
    const source = fs.readFileSync(path.join(root, file), 'utf8');
    const templates = [...acorn.tokenizer(source, { ecmaVersion: 2020 })]
      .filter((token) => token.type.label === '`' || token.type.label === 'template');
    t.is(templates.length, 0, `${file} contains a template literal`);
  });
});

test('bowser.mjs is a valid ES module', (t) => {
  const source = fs.readFileSync(path.join(root, 'bowser.mjs'), 'utf8');
  t.notThrows(() => acorn.parse(source, { ecmaVersion: 'latest', sourceType: 'module' }));
});
