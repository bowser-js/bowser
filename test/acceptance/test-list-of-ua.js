import test from 'ava';
import yaml from 'yamljs';
import path from 'path';
import Bowser from '../../src/bowser';
import BowserBuild from '../../es5';

const listOfUA = yaml.load(path.join(__dirname, 'useragentstrings.yml'));

const browserNames = Object.keys(listOfUA);

browserNames.forEach((browserName) => {
  listOfUA[browserName].forEach((browser, index) => {
    test(`Test ${browserName} ${index}`, (t) => {
      const parsed = Bowser.parse(browser.ua);
      const parsedBuild = BowserBuild.parse(browser.ua);
      t.deepEqual(parsed, browser.spec, `${browser.ua}`);
      t.deepEqual(parsedBuild, browser.spec, `${browser.ua}`);
      t.is(parsed.browser.name, browserName, `${browser.ua}`);
    });
  });
});
