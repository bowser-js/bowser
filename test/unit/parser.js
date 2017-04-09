import test from 'ava';
import Parser from '../../src/parser';

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36 OPR/43.0.2442.1165';
const parser = new Parser(UA);

test('constructor', t => {
  t.truthy(parser instanceof Parser);
});

test('getUA', t => {
  t.is(parser.getUA(), UA);
});

test('test', t => {
  t.truthy(parser.test(/Chrome/i));
});

test('_parseBrowser', t => {
  const b = parser._parseBrowser();
  t.is(b.name, 'Opera');
});
