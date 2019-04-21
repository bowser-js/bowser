import test from 'ava';
import { BROWSER_ALIASES_MAP } from '../../src/constants';

test('check duplicate aliases', (t) => {
  const aliasesList = Object.keys(BROWSER_ALIASES_MAP).map(value => (BROWSER_ALIASES_MAP[value]));
  let foundOnce, foundTwice;

  const duplicates = aliasesList.filter(item => {
    foundOnce = aliasesList.indexOf(item);
    foundTwice = aliasesList.indexOf(item, foundOnce + 1);
    return +foundTwice !== -1;
  });

  t.deepEqual(duplicates, []);
});
