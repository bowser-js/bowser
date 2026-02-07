import test from 'ava';
import sinon from 'sinon';
import Parser from '../../src/parser';
import Bowser from '../../src/bowser';

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36 OPR/43.0.2442.1165';
const parser = new Parser(UA, true);

const EDGE_UA = 'Mozilla/5.0 (Linux; Android 8.0; Pixel XL Build/OPP3.170518.006) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.0 Mobile Safari/537.36 EdgA/41.1.35.1';
const edgeParser = new Parser(EDGE_UA, true);

const FOCUS_UA = 'Mozilla/5.0 (Linux; Android 7.1.1) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Focus/1.2.1 Chrome/59.0.3071.125';
const focusParser = new Parser(FOCUS_UA, true);

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

test('Parser.parseEngine is being called when getEngine() called', (t) => {
  const spy = sinon.spy(parser, 'parseEngine');
  parser.getEngine();
  t.truthy(spy.called);
  parser.parseEngine.restore();
});

test('Parser.getEngineName gives a name of the engine', (t) => {
  t.is(parser.getEngineName(), 'Blink');
});

test('Parser.getEngineName gives a lower-cased name of the engine', (t) => {
  t.is(parser.getEngineName(true), 'blink');
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
  t.is(parser.satisfies({ opera: '>=43' }), true);
  t.is(parser.satisfies({ opera: '<=43' }), true);
  t.is(parser.satisfies({ opera: '>=43.0' }), true);
  t.is(parser.satisfies({ opera: '>=43.0.2442.1165' }), true);
  t.is(parser.satisfies({ opera: '<=43.0.2442.1165' }), true);
  t.is(parser.satisfies({ opera: '>=43.0.2443' }), false);
  t.is(parser.satisfies({ opera: '<=43.0.2443' }), true);
  t.is(parser.satisfies({ opera: '>=43.0.2441' }), true);
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

test('Parser.satisfies should consider aliases while handling browsers', (t) => {
  t.is(edgeParser.satisfies({ 'Microsoft Edge': '=41.1.35.1' }), true);
  t.is(edgeParser.satisfies({ 'microsoft edge': '=41.1.35.1' }), true);
  t.is(edgeParser.satisfies({ 'edge': '=41.1.35.1' }), true);
  t.is(edgeParser.satisfies({ 'Edge': '=41.1.35.1' }), true);
});

test('Parser.is should pass', (t) => {
  t.is(parser.is('opera'), true);
  t.is(parser.is('desktop'), true);
  t.is(parser.is('macos'), true);
});

test('Parser.is should pass when not including aliases', (t) => {
  t.is(edgeParser.is('Microsoft Edge', false), true);
  t.is(edgeParser.is('microsoft edge', false), true);
  t.is(edgeParser.is('mIcrosoft eDge', false), true);
  t.is(edgeParser.is('edge', false), false);
  t.is(edgeParser.is('Edge', false), false);
  t.is(edgeParser.is('desktop', false), false);
  t.is(edgeParser.is('macos', false), false);
  t.is(edgeParser.is('mobile', false), true);
  t.is(edgeParser.is('android', false), true);
});

test('Parser.is should pass when including aliases', (t) => {
  t.is(edgeParser.is('Microsoft Edge', true), true);
  t.is(edgeParser.is('microsoft edge', true), true);
  t.is(edgeParser.is('mIcrosoft eDge', true), true);
  t.is(edgeParser.is('edge', true), true);
  t.is(edgeParser.is('Edge', true), true);
  t.is(edgeParser.is('desktop', true), false);
  t.is(edgeParser.is('macos', true), false);
  t.is(edgeParser.is('mobile', true), true);
  t.is(edgeParser.is('android', true), true);
});

test('Parser.is using constants should pass', (t) => {
  t.is(parser.is(Bowser.BROWSER_MAP.opera), true);
  t.is(parser.is(Bowser.PLATFORMS_MAP.desktop), true);
  t.is(parser.is(Bowser.OS_MAP.MacOS), true);
});

test('Parser.some should pass', (t) => {
  t.is(parser.some(['opera', 'chrome', 'firefox']), true);
  t.is(parser.some(['macos', 'windows']), true);
  t.is(parser.some(['chrome', 'firefox']), false);
  t.is(parser.some([]), false);
  t.is(parser.some(), false);
});

test('Parser.isBrowser should pass when not loosely checking', (t) => {
  t.is(edgeParser.isBrowser('Microsoft Edge', false), true);
  t.is(edgeParser.isBrowser('microsoft edge', false), true);
  t.is(edgeParser.isBrowser('mIcrosoft eDge', false), true);
  t.is(edgeParser.isBrowser('edge', false), false);
  t.is(edgeParser.isBrowser('Edge', false), false);
});

test('Parser.isBrowser should pass when loosely checking', (t) => {
  t.is(edgeParser.isBrowser('Microsoft Edge', true), true);
  t.is(edgeParser.isBrowser('microsoft edge', true), true);
  t.is(edgeParser.isBrowser('mIcrosoft eDge', true), true);
  t.is(edgeParser.isBrowser('edge', true), true);
  t.is(edgeParser.isBrowser('Edge', true), true);
});

test('Parser.isBrowser should pass for non-aliased browsers', (t) => {
  t.is(focusParser.isBrowser('Focus', true), true);
  t.is(focusParser.isBrowser('Focus', false), true);
});

test('Parser.isEngine should pass', (t) => {
  t.is(parser.isEngine('blink'), true);
  t.is(parser.isEngine('webkit'), false);
});

// Client Hints tests
const DDG_ANDROID_UA = 'Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.6778.200 Mobile Safari/537.36';
const DDG_ANDROID_HINTS = {
  brands: [
    { brand: 'DuckDuckGo', version: '5.225.1' },
    { brand: 'Chromium', version: '131' },
    { brand: 'Not)A;Brand', version: '99' },
  ],
  mobile: true,
  platform: 'Android',
  platformVersion: '14',
};

const CHROME_HINTS = {
  brands: [
    { brand: 'Google Chrome', version: '131' },
    { brand: 'Chromium', version: '131' },
    { brand: 'Not_A Brand', version: '24' },
  ],
  mobile: false,
  platform: 'Windows',
  platformVersion: '15.0.0',
};

const EDGE_HINTS = {
  brands: [
    { brand: 'Microsoft Edge', version: '131' },
    { brand: 'Chromium', version: '131' },
    { brand: 'Not-A.Brand', version: '24' },
  ],
  mobile: false,
  platform: 'Windows',
};

test('Parser.getHints returns null when no hints provided', (t) => {
  const p = new Parser(UA, true);
  t.is(p.getHints(), null);
});

test('Parser.getHints returns hints when provided via constructor', (t) => {
  const p = new Parser(DDG_ANDROID_UA, false, DDG_ANDROID_HINTS);
  t.deepEqual(p.getHints(), DDG_ANDROID_HINTS);
});

test('Parser.getHints with overloaded constructor (UA, hints)', (t) => {
  const p = new Parser(DDG_ANDROID_UA, DDG_ANDROID_HINTS);
  t.deepEqual(p.getHints(), DDG_ANDROID_HINTS);
});

test('Parser.hasBrand returns true for existing brand', (t) => {
  const p = new Parser(DDG_ANDROID_UA, false, DDG_ANDROID_HINTS);
  t.true(p.hasBrand('DuckDuckGo'));
  t.true(p.hasBrand('Chromium'));
});

test('Parser.hasBrand is case insensitive', (t) => {
  const p = new Parser(DDG_ANDROID_UA, false, DDG_ANDROID_HINTS);
  t.true(p.hasBrand('duckduckgo'));
  t.true(p.hasBrand('DUCKDUCKGO'));
  t.true(p.hasBrand('chromium'));
});

test('Parser.hasBrand returns false for non-existent brand', (t) => {
  const p = new Parser(DDG_ANDROID_UA, false, DDG_ANDROID_HINTS);
  t.false(p.hasBrand('Firefox'));
  t.false(p.hasBrand('Safari'));
});

test('Parser.hasBrand returns false when no hints provided', (t) => {
  const p = new Parser(DDG_ANDROID_UA, true);
  t.false(p.hasBrand('DuckDuckGo'));
});

test('Parser.hasBrand detects GREASE "Not A Brand" variants', (t) => {
  const p1 = new Parser(DDG_ANDROID_UA, false, DDG_ANDROID_HINTS);
  t.true(p1.hasBrand('Not)A;Brand'));

  const p2 = new Parser(DDG_ANDROID_UA, false, CHROME_HINTS);
  t.true(p2.hasBrand('Not_A Brand'));

  const p3 = new Parser(DDG_ANDROID_UA, false, EDGE_HINTS);
  t.true(p3.hasBrand('Not-A.Brand'));
});

test('Parser.getBrandVersion returns version for existing brand', (t) => {
  const p = new Parser(DDG_ANDROID_UA, false, DDG_ANDROID_HINTS);
  t.is(p.getBrandVersion('DuckDuckGo'), '5.225.1');
  t.is(p.getBrandVersion('Chromium'), '131');
});

test('Parser.getBrandVersion is case insensitive', (t) => {
  const p = new Parser(DDG_ANDROID_UA, false, DDG_ANDROID_HINTS);
  t.is(p.getBrandVersion('duckduckgo'), '5.225.1');
  t.is(p.getBrandVersion('CHROMIUM'), '131');
});

test('Parser.getBrandVersion returns undefined for non-existent brand', (t) => {
  const p = new Parser(DDG_ANDROID_UA, false, DDG_ANDROID_HINTS);
  t.is(p.getBrandVersion('Firefox'), undefined);
});

test('Parser.getBrandVersion returns undefined when no hints provided', (t) => {
  const p = new Parser(DDG_ANDROID_UA, true);
  t.is(p.getBrandVersion('DuckDuckGo'), undefined);
});

test('Parser.getBrandVersion returns version for GREASE brands', (t) => {
  const p = new Parser(DDG_ANDROID_UA, false, DDG_ANDROID_HINTS);
  t.is(p.getBrandVersion('Not)A;Brand'), '99');
});

test('Parser detects DuckDuckGo from client hints brands', (t) => {
  const p = new Parser(DDG_ANDROID_UA, false, DDG_ANDROID_HINTS);
  t.is(p.getBrowserName(), 'DuckDuckGo');
  t.is(p.getBrowserVersion(), '5.225.1');
});

test('Parser falls back to UA when no client hints provided', (t) => {
  const p = new Parser(DDG_ANDROID_UA);
  // Without hints, Chrome is detected from the UA string
  t.is(p.getBrowserName(), 'Chrome');
  t.is(p.getBrowserVersion(), '131.0.6778.200');
});

test('Parser with empty brands array falls back to UA parsing', (t) => {
  const emptyHints = { brands: [], mobile: true, platform: 'Android' };
  const p = new Parser(DDG_ANDROID_UA, false, emptyHints);
  t.false(p.hasBrand('DuckDuckGo'));
  t.is(p.getBrowserName(), 'Chrome');
});

test('Parser handles malformed hints gracefully', (t) => {
  const malformedHints = { brands: [{ brand: null }, { version: '1.0' }, {}] };
  const p = new Parser(DDG_ANDROID_UA, false, malformedHints);
  t.false(p.hasBrand('DuckDuckGo'));
  t.is(p.getBrandVersion('anything'), undefined);
});

test('Parser with Chrome client hints', (t) => {
  const chromeUA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';
  const p = new Parser(chromeUA, false, CHROME_HINTS);
  t.true(p.hasBrand('Google Chrome'));
  t.true(p.hasBrand('Chromium'));
  t.true(p.hasBrand('Not_A Brand'));
  t.is(p.getBrandVersion('Google Chrome'), '131');
});

test('Parser with Edge client hints', (t) => {
  const edgeUA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0';
  const p = new Parser(edgeUA, false, EDGE_HINTS);
  t.true(p.hasBrand('Microsoft Edge'));
  t.true(p.hasBrand('Chromium'));
  t.is(p.getBrandVersion('Microsoft Edge'), '131');
});

const BRAVE_HINTS = {
  brands: [
    { brand: 'Brave', version: '1.73.97' },
    { brand: 'Chromium', version: '131' },
    { brand: 'Not_A Brand', version: '24' },
  ],
  mobile: false,
  platform: 'Windows',
  platformVersion: '15.0.0',
};

const BRAVE_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

test('Parser detects Brave from client hints brands', (t) => {
  const p = new Parser(BRAVE_UA, false, BRAVE_HINTS);
  t.is(p.getBrowserName(), 'Brave');
  t.is(p.getBrowserVersion(), '1.73.97');
});

test('Parser.hasBrand detects Brave', (t) => {
  const p = new Parser(BRAVE_UA, false, BRAVE_HINTS);
  t.true(p.hasBrand('Brave'));
  t.true(p.hasBrand('brave'));
});

test('Parser.getBrandVersion returns version for Brave', (t) => {
  const p = new Parser(BRAVE_UA, false, BRAVE_HINTS);
  t.is(p.getBrandVersion('Brave'), '1.73.97');
});
