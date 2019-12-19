import test from 'ava';
import {
  getFirstMatch,
  getSecondMatch,
  matchAndReturnConst,
  getWindowsVersionName,
  getMacOSVersionName,
  getAndroidVersionName,
  getVersionPrecision,
  compareVersions,
  map,
  find,
  assign,
  getBrowserAlias,
  getBrowserTypeByAlias
} from '../../src/utils';

test('getFirstMatch', (t) => {
  const matchedVersion = getFirstMatch(/version\/(\S+)/i, 'Chrome Version/11.11.11');
  t.is(matchedVersion, '11.11.11');
});

test('getSecondMatch', (t) => {
  const matchedVersion = getSecondMatch(/version\/(\S+).*version\/(\S+)/i, 'Chrome Version/11.11.11 Chrome Version/22.22.22');
  t.is(matchedVersion, '22.22.22');
});

test('matchAndReturnConst', (t) => {
  const _const = matchAndReturnConst(/version/i, 'version', "_const");
  t.is(_const, '_const');
});

test('getWindowsVersionName', (t) => {
  t.is(getWindowsVersionName('NT 5.0'), '2000');
  t.is(getWindowsVersionName('XXX'), void 0);
});

test('getMacOSVersionName', (t) => {
  t.is(getMacOSVersionName('10.14.5'), 'Mojave');
  t.is(getMacOSVersionName('10.15'), 'Catalina');
  t.is(getMacOSVersionName('10.999999'), void 0);
  t.is(getMacOSVersionName('XXX'), void 0);
});

test('getAndroidVersionName', (t) => {
  t.is(getAndroidVersionName('1.0'), void 0);
  t.is(getAndroidVersionName('8.0'), 'Oreo');
  t.is(getAndroidVersionName('9'), 'Pie');
  t.is(getAndroidVersionName('XXX'), void 0);
});

test('getVersionPrecision', (t) => {
  const precision = getVersionPrecision("10.14.5");
  t.is(precision, 3);
});

test('compareVersions', (t) => {
  const comparisionsTasks = [
    ['9.0', '10', -1],
    ['11', '10', 1],
    ['1.10.2.1', '1.8.2.1.90', 1],
    ['1.010.2.1', '1.08.2.1.90', 1],
    ['1.10.2.1', '1.10.2.1', 0],
    ['1.10.2.1', '1.10.2', 0, true],
    ['1.10.2.1', '1.10', 0, true],
    ['1.10.2.1', '1', 0, true],
    ['1.10.2.1', '1.0800.2', -1],
    ['1.0.0-alpha', '1.0.0-alpha.1', -1],
    ['1.0.0-alpha.1', '1.0.0-alpha.beta', -1],
    ['1.0.0-alpha.beta', '1.0.0-beta', -1],
    ['1.0.0-beta', '1.0.0-beta.2', -1],
    ['1.0.0-beta.11', '1.0.0-rc.1', -1],
    ['1.0.0-rc.1', '1.0.0', -1],
  ];

  comparisionsTasks.forEach((testingParams) => {
    const versionA = testingParams[0];
    const versionB = testingParams[1];
    const result = testingParams[2];
    const isLoose = testingParams.length > 3 ? testingParams[3] : false;
    let matching = isLoose ? '~' : ' == ';

    if (result > 0) {
      matching = ' > ';
    } else if (result < 0) {
      matching = ' < ';
    }

    t.is(compareVersions(versionA, versionB, isLoose), result, `version ${versionA} should be ${matching} version ${versionB}`);
  });
});

test('map', (t) => {
  const result = map([1,2], (value) => value+2);
  t.is(result[0], 3);
  t.is(result[1], 4);
  const original = Array.prototype.map;
  delete Array.prototype.map;
  const polyfillResult = map([1,2], (value) => value+2);
  Array.prototype.map = original;
  t.is(polyfillResult[0], 3);
  t.is(polyfillResult[1], 4);
});

test('find', (t) => {
  const result = find([1,2], (value) => value==2);
  t.is(result, 2);
  const original = Array.prototype.find;
  delete Array.prototype.find;
  const polyfillResultFound = find([1,2], (value) => value==2);
  const polyfillResultNotFound = find([1,2], (value) => value==3);
  Array.prototype.find = original;
  t.is(polyfillResultFound, 2);
  t.is(polyfillResultNotFound, undefined);
});

test('assign', (t) => {
  const result = assign({}, { a: 1 }, { b: 1 }, { b: 2, c: 3 });
  t.is(result['a'], 1);
  t.is(result['b'], 2);
  t.is(result['c'], 3);
  const original = Object.assign;
  delete Object.assign;
  const polyfillResult = assign({}, { a: 1 }, { b: 1 }, null, { b: 2, c: 3 });
  Object.assign = original;
  t.is(polyfillResult['a'], 1);
  t.is(polyfillResult['b'], 2);
  t.is(polyfillResult['c'], 3);
});

test('getBrowserAlias', (t) => {
  t.is(getBrowserAlias('Microsoft Edge'), 'edge');
  t.is(getBrowserAlias('Unexisting Browser'), void 0);
});

test('getBrowserTypeByAlias', (t) => {
  t.is(getBrowserTypeByAlias('edge'), 'Microsoft Edge');
  t.is(getBrowserTypeByAlias(void 0), '');
});

