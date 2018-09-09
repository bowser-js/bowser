import test from 'ava';
import sinon from 'sinon';
import Parser from '../../src/parser';

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36 OPR/43.0.2442.1165';
const parser = new Parser(UA, true);

test('constructor', (t) => {
  t.truthy(parser instanceof Parser);
});

test('Parser.getUA returns a correct UA', (t) => {
  t.is(parser.getUA(), UA);
});

test('Parser.test', (t) => {
  t.truthy(parser.test(/Chrome/i));
});

test('Parser.parseBrowser is being called when the Parser.getBrowser() is called', (t) => {
  const spy = sinon.spy(parser, 'parseBrowser');
  const b = parser.getBrowser();
  t.truthy(spy.called);
  t.is(b.name, 'Opera');
  t.is(b.version, '43.0.2442.1165');
  parser.parseBrowser.restore();
});

test('Parser.getBrowserName returns a correct result', (t) => {
  t.is(parser.getBrowserName(), 'Opera');
});

test('Parser.getBrowserVersion returns a correct result', (t) => {
  t.is(parser.getBrowserVersion(), '43.0.2442.1165');
});

test('Parser.parseOS is being called when getOS() called', (t) => {
  const spy = sinon.spy(parser, 'parseOS');
  parser.getOS();
  t.truthy(spy.called);
  parser.parseOS.restore();
});

test('Parser.getOSName gives a name of the browser', (t) => {
  t.is(parser.getOSName(), 'macOS');
});

test('Parser.getOSName gives a lower-cased name of the browser', (t) => {
  t.is(parser.getOSName(true), 'macos');
});

test('Parser.getOSVersion returns a correct result', (t) => {
  t.is(parser.getOSVersion(), '10.12.4');
});

test('Skip parsing shouldn\'t parse', (t) => {
  t.deepEqual((new Parser(UA, true)).getResult(), {});
});

test('Parser.satisfies should make simple comparisons', (t) => {
  // also covers Parser.compareVersion() method
  t.is(parser.satisfies({ opera: '>42' }), true);
  t.is(parser.satisfies({ opera: '<44' }), true);
  t.is(parser.satisfies({ opera: '=43.0.2442.1165' }), true);
  t.is(parser.satisfies({ opera: '~43.0' }), true);
  t.is(parser.satisfies({ opera: '~43' }), true);
});

test('Parser.satisfies should make complex comparison', (t) => {
  t.is(parser.satisfies({
    macos: {
      safari: '>11',
    },
    ios: {
      safari: '>10',
    },
    opera: '>42',
  }), true);
});

test('Parser.satisfies should respect platform and OS specific declarations', (t) => {
  t.is(parser.satisfies({
    macos: {
      opera: '>45',
    },
    opera: '>42',
  }), false);

  t.is(parser.satisfies({
    desktop: {
      opera: '>45',
    },
    opera: '>42',
  }), false);

  t.is(parser.satisfies({
    macos: {
      opera: '>45',
    },
    desktop: {
      opera: '>42',
    },
    opera: '>42',
  }), false);

  t.is(parser.satisfies({
    macos: {
      chrome: '>45',
    },
    desktop: {
      chrome: '>42',
    },
    firefox: '>42',
  }), void 0);
});

test('Parser.satisfies for versionless UA strings', (t) => {
  const _parser = new Parser('Mozilla/5.0 (iPhone; CPU iPhone OS 11_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15G77 [FBAN/FBIOS;FBDV/iPhone7,2;FBMD/iPhone;FBSN/iOS;FBSV/11.4.1;FBSS/2;FBCR/vfnl;FBID/phone;FBLC/nl_NL;FBOP/5;FBRV/0]');

  t.is(_parser.satisfies({
    safari: '>9',
  }), void 0);
});

test('Parser.is should pass', (t) => {
  t.is(parser.is('opera'), true);
  t.is(parser.is('desktop'), true);
  t.is(parser.is('macos'), true);
});

test('Parser.some should pass', (t) => {
  t.is(parser.some(['opera', 'chrome', 'firefox']), true);
  t.is(parser.some(['macos', 'windows']), true);
  t.is(parser.some(['chrome', 'firefox']), false);
  t.is(parser.some([]), false);
  t.is(parser.some(), false);
});
