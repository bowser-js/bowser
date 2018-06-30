import test from 'ava';
import {
  getFirstMatch,
  getWindowsVersionName,
} from '../../src/utils';

test('getFirstMatch', (t) => {
  const matchedVersion = getFirstMatch(/version\/(\S+)/i, 'Chrome Version/11.11.11');
  t.is(matchedVersion, '11.11.11');
});

test('getWindowsVersionName', (t) => {
  t.is(getWindowsVersionName('NT 5.0'), '2000');
  t.is(getWindowsVersionName('XXX'), void 0);
});
