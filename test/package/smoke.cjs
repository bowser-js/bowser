/* eslint-disable */
/**
 * Verifies the *packed* bowser package against the surface real consumers use.
 *
 *   node test/package/smoke.cjs <path-to-bowser-x.y.z.tgz>
 *
 * The tarball is extracted into a throwaway directory as ./node_modules/bowser
 * and `assertions.cjs` is run next to it, so bare specifiers such as
 * `require('bowser')` and `require('bowser/es5.js')` resolve exactly as they
 * would after `npm install bowser`.
 *
 * Run this on every Node version bowser supports — that is the point of it.
 * See `.github/workflows/pull-request.yml`.
 *
 * Deliberately ES5-compatible CommonJS so it runs on Node 12.16.3.
 */
var cp = require('child_process');
var fs = require('fs');
var os = require('os');
var path = require('path');

var tarball = process.argv[2];

if (!tarball) {
  console.error('usage: node test/package/smoke.cjs <path-to-tarball.tgz>');
  console.error('');
  console.error('Create one with:');
  console.error('  npm version 0.0.0-ci --no-git-tag-version --allow-same-version');
  console.error('  npm pack');
  process.exit(1);
}

tarball = path.resolve(tarball);
if (!fs.existsSync(tarball)) {
  console.error('no such tarball: ' + tarball);
  process.exit(1);
}

var tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'bowser-smoke-'));
var modules = path.join(tmp, 'node_modules');
fs.mkdirSync(modules);

// `npm install <tarball>` would work too, but plain tar keeps this dependency
// free and identical across the whole Node matrix. npm tarballs always unpack
// to a single top-level `package/` directory.
cp.execFileSync('tar', ['-xzf', tarball, '-C', modules], { stdio: 'inherit' });
fs.renameSync(path.join(modules, 'package'), path.join(modules, 'bowser'));

var runner = path.join(tmp, 'assertions.cjs');
fs.writeFileSync(runner, fs.readFileSync(path.join(__dirname, 'assertions.cjs')));

var result = cp.spawnSync(process.execPath, [runner], { cwd: tmp, stdio: 'inherit' });

try {
  // fs.rmSync landed in Node 14.14; rimraf-by-hand keeps Node 12 happy.
  cp.execFileSync('rm', ['-rf', tmp]);
} catch (e) { /* best effort */ }

if (result.status !== 0) {
  console.error('\npackage smoke test FAILED on Node ' + process.versions.node);
  process.exit(result.status || 1);
}
