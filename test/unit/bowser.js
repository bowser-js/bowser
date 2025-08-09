import test from 'ava';
import Bowser, { getParser, parse, BROWSER_MAP, ENGINE_MAP, OS_MAP, PLATFORMS_MAP } from '../../src/bowser';
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

test('Named export getParser works like Bowser.getParser', (t) => {
  const namedExportParser = getParser(UA);
  t.truthy(namedExportParser instanceof Parser);
  t.deepEqual(namedExportParser.getResult(), browser.getResult());
});

test('Named export parse works like Bowser.parse', (t) => {
  t.deepEqual(parse(UA), Bowser.parse(UA));
});

test('Named exports of constants are available', (t) => {
  t.truthy(BROWSER_MAP);
  t.truthy(ENGINE_MAP);
  t.truthy(OS_MAP);
  t.truthy(PLATFORMS_MAP);
  t.is(BROWSER_MAP, Bowser.BROWSER_MAP);
  t.is(ENGINE_MAP, Bowser.ENGINE_MAP);
  t.is(OS_MAP, Bowser.OS_MAP);
  t.is(PLATFORMS_MAP, Bowser.PLATFORMS_MAP);
});
