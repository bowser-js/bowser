import test from 'ava';
import sinon from 'sinon';
import Parser from '../../src/parser';

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36 OPR/43.0.2442.1165';
const parser = new Parser(UA);

test('constructor', t => {
  t.truthy(parser instanceof Parser);
});

test('Parser.getUA returns a correct UA', t => {
  t.is(parser.getUA(), UA);
});

test('Parser.test', t => {
  t.truthy(parser.test(/Chrome/i));
});

test('Parser._parseBrowser is being called when the Parser.getBrowser() is called', t => {
  const spy = sinon.spy(parser, '_parseBrowser');
  const b = parser.getBrowser();
  t.truthy(spy.called);
  t.is(b.name, 'Opera');
  t.is(b.version, '43.0.2442.1165');
  parser._parseBrowser.restore();
});

test('Parser.getBrowserName returns a correct result', t => {
  t.is(parser.getBrowserName(), 'Opera');
});

test('Parser.getBrowserVersion returns a correct result', t => {
  t.is(parser.getBrowserVersion(), '43.0.2442.1165');
});

test('Parser._parseOS is being called when getOS() called', t => {
  const spy = sinon.spy(parser, '_parseOS');
  parser.getOS();
  t.truthy(spy.called);
  parser._parseOS.restore();
});

test('Parser.getOSName gives a name of the browser', t => {
  t.is(parser.getOSName(), 'macOS');
});

test('Parser.getOSName gives a lower-cased name of the browser', t => {
  t.is(parser.getOSName(true), 'macos');
});

test('Parser.getOSVersion returns a correct result', t => {
  t.is(parser.getOSVersion(), '10.12.4');
});
