// Test for ESM import compatibility (fixes issue #568)
// This test ensures that `import Bowser from 'bowser'` works in ESM/nodenext projects

const test = require('ava');

test('package.json should have proper exports for ESM support', (t) => {
  const packageJson = require('../../package.json');
  
  // Check that package has type: module for proper ESM support
  t.is(packageJson.type, 'module');
  
  // Check that exports field is present and configured correctly
  t.truthy(packageJson.exports);
  t.truthy(packageJson.exports['.']);
  t.is(packageJson.exports['.'].import, './src/bowser.js');
  t.is(packageJson.exports['.'].require, './src/bowser.js');
  t.is(packageJson.exports['.'].types, './index.d.ts');
});

test('main and module fields should point to source', (t) => {
  const packageJson = require('../../package.json');
  
  // Both main and module should point to the source file
  t.is(packageJson.main, 'src/bowser.js');
  t.is(packageJson.module, 'src/bowser.js');
});

test('can require the source file (CommonJS interop)', (t) => {
  // This tests that CommonJS can load the source file when using exports
  const bowserModule = require('../../src/bowser.js');
  t.truthy(bowserModule);
  t.truthy(bowserModule.default);
  t.is(typeof bowserModule.default, 'function');
  
  // Test that it provides the expected API
  const Bowser = bowserModule.default;
  t.is(typeof Bowser.getParser, 'function');
  t.is(typeof Bowser.parse, 'function');
});