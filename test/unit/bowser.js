import test from 'ava';
import Bowser from '../../src/bowser';
import * as BowserNS from '../../src/bowser';
import Parser from '../../src/parser';

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36 OPR/43.0.2442.1165';
const browser = Bowser.getParser(UA);

test('Bowser`s constructor returns a Parser instance', (t) => {
  t.truthy(browser instanceof Parser);
});

test('Bowser`s constructor fails if UA is empty', (t) => {
  t.throws(() => (Bowser.getParser()));
});

test('Bowser.parse parses UA and returns result', (t) => {
  t.deepEqual(Bowser.parse(UA), browser.getResult());
});

test('every static member of Bowser is also a named export', (t) => {
  // `require('bowser')` is the class itself, so `import * as Bowser` has to
  // expose the same members for code moving between the two to keep working.
  const statics = Object.getOwnPropertyNames(Bowser)
    .filter(key => ['length', 'name', 'prototype'].indexOf(key) === -1);
  t.true(statics.length > 0);
  statics.forEach((key) => {
    t.is(BowserNS[key], Bowser[key], key);
  });
});
