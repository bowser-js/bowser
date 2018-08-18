import test from 'ava';
import {
  getFirstMatch,
  getWindowsVersionName,
  compareVersions,
} from '../../src/utils';

test('getFirstMatch', (t) => {
  const matchedVersion = getFirstMatch(/version\/(\S+)/i, 'Chrome Version/11.11.11');
  t.is(matchedVersion, '11.11.11');
});

test('getWindowsVersionName', (t) => {
  t.is(getWindowsVersionName('NT 5.0'), '2000');
  t.is(getWindowsVersionName('XXX'), void 0);
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
