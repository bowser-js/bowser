import test from 'ava';
import yaml from 'yamljs';
import path from 'path';
import Bowser from '../../src/new-bowser';

const listOfUA = yaml.load(path.join(__dirname, 'useragentstrings.yml'));

test('Check all the test browsers', t => {
  for (const browserName in listOfUA) {
    listOfUA[browserName].forEach((browser) => {
      const parsed = new Bowser(browser.ua).parse().getResult();
      t.deepEqual(parsed, browser.spec, `${browser.ua}`);
      t.is(parsed.browser.name, browserName, `${browser.ua}`);
    });
  }
});
