import test from 'ava';
import { getFirstMatch } from '../../src/utils';

test('getFirstMatch', t => {
  const matchedVersion = getFirstMatch(/version\/(\S+)/i, 'Chrome Version/11.11.11');
  t.is(matchedVersion, '11.11.11');
});
