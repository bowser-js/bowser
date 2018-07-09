import test from 'ava';
import yaml from 'yamljs';
import path from 'path';
import Bowser from '../../src/bowser';

const listOfUA = yaml.load(path.join(__dirname, 'useragentstrings.yml'));

const browserNames = Object.keys(listOfUA);

browserNames.forEach((browserName) => {
  listOfUA[browserName].forEach((browser) => {
    test('Check all the test browsers', (t) => {
      const parsed = Bowser.parse(browser.ua);
      t.deepEqual(parsed, browser.spec, `${browser.ua}`);
      t.is(parsed.browser.name, browserName, `${browser.ua}`);
    });
  });
});
