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
var zlib = require('zlib');

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

/**
 * Extracts an npm tarball using only Node built-ins, so the test needs no
 * external `tar`/`npm` process and runs identically on every OS and every
 * Node version in the support matrix.
 *
 * npm tarballs are gzipped ustar archives of regular files (npm rejects
 * anything else at publish time), which is the only shape handled here:
 * pax/global extended headers and directory entries are skipped, and parent
 * directories are created per file instead.
 */
function extractNpmTarball(tgz, dest) {
  var buf = zlib.gunzipSync(fs.readFileSync(tgz));
  var offset = 0;
  while (offset + 512 <= buf.length) {
    var header = buf.slice(offset, offset + 512);
    offset += 512;
    if (header[0] === 0) break; // zero block: end of archive
    var name = header.slice(0, 100).toString('utf8').replace(/\0[\s\S]*$/, '');
    var prefix = header.slice(345, 500).toString('utf8').replace(/\0[\s\S]*$/, '');
    if (prefix) name = prefix + '/' + name;
    var size = parseInt(header.slice(124, 136).toString('utf8'), 8) || 0;
    var type = header[156];
    if (type === 48 /* '0' */ || type === 0) {
      var target = path.join(dest, name);
      if (target.indexOf(dest + path.sep) !== 0) {
        throw new Error('tarball entry escapes destination: ' + name);
      }
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.writeFileSync(target, buf.slice(offset, offset + size));
    }
    offset += Math.ceil(size / 512) * 512;
  }
}

// npm tarballs always unpack to a single top-level `package/` directory.
extractNpmTarball(tarball, modules);
fs.renameSync(path.join(modules, 'package'), path.join(modules, 'bowser'));

var runner = path.join(tmp, 'assertions.cjs');
fs.writeFileSync(runner, fs.readFileSync(path.join(__dirname, 'assertions.cjs')));

var result = cp.spawnSync(process.execPath, [runner], { cwd: tmp, stdio: 'inherit' });

try {
  // fs.rmSync landed in Node 14.14; recursive fs.rmdirSync (12.10+) covers the
  // bottom of the matrix. Both work on Windows, unlike shelling out to `rm`.
  if (fs.rmSync) {
    fs.rmSync(tmp, { recursive: true, force: true });
  } else {
    fs.rmdirSync(tmp, { recursive: true });
  }
} catch (e) { /* best effort */ }

if (result.status !== 0) {
  console.error('\npackage smoke test FAILED on Node ' + process.versions.node);
  process.exit(result.status || 1);
}
