/**
 * Type-checks a real consumer against the *packed* package under every module
 * resolution mode TypeScript offers.
 *
 *   node test/types/check.mjs <path-to-bowser-x.y.z.tgz>
 *
 * `attw` already runs in CI, but it answers a narrower question: whether the
 * types *resolve* to the right file for each condition. It does not compile
 * anything, so it cannot catch a declaration that resolves fine and then fails
 * to describe the runtime — a missing member, a wrong signature, or a named
 * export declared in `index.d.mts` that `bowser.mjs` does not actually have.
 *
 * Both directions are asserted. The negative cases matter as much as the
 * positive ones: `index.d.mts` deliberately omits `BROWSER_MAP` and friends as
 * named exports because importing them that way throws at runtime, and only a
 * compile that is expected to *fail* can hold that line.
 *
 * Run against the tarball rather than the repo so the exports map, the
 * `types`/`typesVersions` fields and the published file list are all exercised
 * exactly as a consumer sees them.
 */
import cp from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.join(here, '..', '..');
const tsc = path.join(repoRoot, 'node_modules', '.bin', 'tsc');

const tarball = process.argv[2];
if (!tarball || !fs.existsSync(tarball)) {
  console.error('usage: node test/types/check.mjs <path-to-tarball.tgz>');
  process.exit(1);
}

/** Each mode a real consumer can be configured with. */
const MODES = [
  { name: 'node10 (CJS)', moduleResolution: 'node10', module: 'commonjs', type: 'commonjs', fixture: 'consumer-cjs.ts' },
  { name: 'node16 (CJS)', moduleResolution: 'node16', module: 'node16', type: 'commonjs', fixture: 'consumer-cjs.ts' },
  { name: 'node16 (ESM)', moduleResolution: 'node16', module: 'node16', type: 'module', fixture: 'consumer-esm.ts' },
  { name: 'nodenext (ESM)', moduleResolution: 'nodenext', module: 'nodenext', type: 'module', fixture: 'consumer-esm.ts' },
  { name: 'bundler', moduleResolution: 'bundler', module: 'esnext', type: 'module', fixture: 'consumer-esm.ts' },
];

/**
 * Imports that must NOT compile, because the runtime does not provide them.
 * Keeps `index.d.mts` honest — if any of these starts compiling, the types are
 * promising something `bowser.mjs` will not deliver.
 */
const MUST_NOT_COMPILE = [
  ['BROWSER_MAP is not a named export', 'import { BROWSER_MAP } from "bowser"; export default BROWSER_MAP;'],
  ['OS_MAP is not a named export', 'import { OS_MAP } from "bowser"; export default OS_MAP;'],
  ['ENGINE_MAP is not a named export', 'import { ENGINE_MAP } from "bowser"; export default ENGINE_MAP;'],
  ['PLATFORMS_MAP is not a named export', 'import { PLATFORMS_MAP } from "bowser"; export default PLATFORMS_MAP;'],
  ['Parser is a type, not a value', 'import { Parser } from "bowser"; export default new Parser("x");'],
];

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'bowser-types-'));
const modules = path.join(tmp, 'node_modules');
fs.mkdirSync(modules, { recursive: true });
cp.execFileSync('tar', ['xzf', path.resolve(tarball), '-C', modules]);
fs.renameSync(path.join(modules, 'package'), path.join(modules, 'bowser'));

/** Runs tsc over a single file in a project configured for `mode`. */
function typeCheck(mode, fileName, source) {
  // Nested one level under `tmp`, so resolution walks up into tmp/node_modules
  // the way a real consumer's does. `paths` would short-circuit the exports map.
  const dir = path.join(tmp, `case-${Math.abs(hash(mode.name + fileName))}`);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'app.ts'), source);
  fs.writeFileSync(path.join(dir, 'package.json'), JSON.stringify({
    name: 'consumer', version: '1.0.0', private: true, type: mode.type,
  }));
  fs.writeFileSync(path.join(dir, 'tsconfig.json'), JSON.stringify({
    compilerOptions: {
      strict: true,
      noEmit: true,
      // Do not skip: a broken .d.ts in the package itself must fail the check.
      skipLibCheck: false,
      target: 'es2020',
      module: mode.module,
      moduleResolution: mode.moduleResolution,
      esModuleInterop: true,
      resolveJsonModule: true,
      types: [],
    },
    files: ['app.ts'],
  }));
  const result = cp.spawnSync(tsc, ['-p', 'tsconfig.json'], { cwd: dir, encoding: 'utf8' });
  return { ok: result.status === 0, output: `${result.stdout || ''}${result.stderr || ''}`.trim() };
}

function hash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i += 1) { h = ((h << 5) - h + s.charCodeAt(i)) | 0; }
  return h;
}

let failures = 0;
console.log(`Type-checking consumers against ${path.basename(tarball)}\n`);

for (const mode of MODES) {
  const source = fs.readFileSync(path.join(here, 'fixtures', mode.fixture), 'utf8');
  const { ok, output } = typeCheck(mode, mode.fixture, source);
  if (ok) {
    console.log(`  ok    ${mode.name.padEnd(16)} ${mode.fixture}`);
  } else {
    failures += 1;
    console.log(`  FAIL  ${mode.name.padEnd(16)} ${mode.fixture}\n${output.replace(/^/gm, '          ')}`);
  }
}

console.log('');
// Only needs one ESM-shaped mode; the .d.mts is what is under test.
const negativeMode = MODES.find((m) => m.name === 'node16 (ESM)');
for (const [label, source] of MUST_NOT_COMPILE) {
  const { ok } = typeCheck(negativeMode, `negative-${label}`, source);
  if (ok) {
    failures += 1;
    console.log(`  FAIL  types accept something the runtime rejects: ${label}`);
  } else {
    console.log(`  ok    rejected: ${label}`);
  }
}

try { fs.rmSync(tmp, { recursive: true, force: true }); } catch { /* best effort */ }

console.log('');
if (failures) {
  console.error(`${failures} type check(s) failed`);
  process.exit(1);
}
console.log(`all ${MODES.length + MUST_NOT_COMPILE.length} type checks passed`);
