import { mkdir, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const websiteDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const repoDir = path.resolve(websiteDir, '..');

// jsdoc-api writes its temporary files and cache beneath os.homedir(). Keep
// those generated files local to the docs package so generation also works in
// restricted build environments that cannot write to the user's home folder.
os.homedir = () => path.join(websiteDir, '.jsdoc-api');
const { default: jsdoc2md } = await import('jsdoc-to-markdown');

const references = [
  {
    source: 'src/bowser.js',
    output: 'bowser.md',
    title: 'Bowser API',
    description: 'The Bowser facade, parsing entry points, and public constant maps.',
    aliases: ['getParser', 'parse'],
  },
  {
    source: 'src/parser.js',
    output: 'parser.md',
    title: 'Parser API',
    description: 'Parser methods, result structures, version matching, and Client Hints access.',
    aliases: [
      'getBrandVersion', 'getBrowser', 'getBrowserName', 'getBrowserVersion',
      'getEngine', 'getEngineName', 'getHints', 'getOS', 'getOSName', 'getOSVersion',
      'getPlatform', 'getPlatformType', 'getResult', 'getUA', 'hasBrand', 'is',
      'isBrowser', 'isEngine', 'isOS', 'isPlatform', 'parse', 'parseBrowser',
      'parseEngine', 'parseOS', 'parsePlatform', 'satisfies', 'some', 'test',
      'compareVersions', 'compareVersion',
    ],
  },
  {
    source: 'src/utils.js',
    output: 'utils.md',
    title: 'Utilities API',
    description: 'Documented utility methods available from the `src/utils.js` package subpath.',
    aliases: [
      'assign', 'find', 'getAndroidVersionName', 'getBrowserAlias', 'isFirefoxOnIpad',
      'getBrowserTypeByAlias', 'getFirstMatch', 'getMacOSVersionName',
      'getSecondMatch', 'getVersionPrecision', 'map', 'matchAndReturnConst',
      'getWindowsVersionName', 'compareVersions',
    ],
  },
];

function normalizeGeneratedAnchors(markdown) {
  const lines = markdown.split('\n');
  const remappedIds = new Map();

  function normalizedId(id) {
    if (id.startsWith('Bowser.')) return id.slice('Bowser.'.length);
    if (id.startsWith('Parser+')) return id.slice('Parser+'.length);
    if (id === 'new_Parser_new') return 'constructor';
    if (id === 'module_utils') return 'utils';
    if (id === 'exp_module_utils--module.exports') return 'Utils';
    if (id.startsWith('module_utils--module.exports.')) {
      return id.slice('module_utils--module.exports.'.length);
    }
    return id;
  }

  for (let index = 0; index < lines.length; index += 1) {
    const anchor = lines[index].match(/^<a name="([^"]+)"><\/a>$/);
    if (!anchor) continue;

    const oldId = anchor[1];
    const newId = normalizedId(oldId);
    const headingIndex = lines.findIndex((line, lineIndex) => (
      lineIndex > index && /^#{2,6} /.test(line)
    ));

    if (headingIndex === -1) {
      throw new Error(`Could not find generated heading for API fragment #${oldId}`);
    }

    lines[headingIndex] += ` {#${newId}}`;
    remappedIds.set(oldId, newId);
    lines.splice(index, 1);
    index -= 1;
  }

  let normalized = lines.join('\n');
  const anchorMappings = Array.from(remappedIds).sort(([left], [right]) => right.length - left.length);
  for (const [oldId, newId] of anchorMappings) {
    normalized = normalized.replaceAll(`#${oldId}`, `#${newId}`);
  }
  return normalized;
}

function validateLegacyAnchors(markdown, names) {
  names.forEach((name) => {
    if (!markdown.includes(`{#${name}}`)) {
      throw new Error(`Could not find generated API heading for legacy fragment #${name}`);
    }
  });
  return markdown;
}

function normalizeMarkdownWhitespace(markdown) {
  let insideCodeFence = false;

  return markdown.split('\n').map((line) => {
    if (/^\s*(`{3,}|~{3,})/.test(line)) {
      insideCodeFence = !insideCodeFence;
      return line.replace(/[\t ]+$/, '');
    }
    if (insideCodeFence) return line;

    const trimmed = line.replace(/[\t ]+$/, '');
    return /[\t ]{2,}$/.test(line) ? `${trimmed}<br />` : trimmed;
  }).join('\n');
}

function linkParserReferences(markdown) {
  return markdown.replace(/\]\(Parser(?:\.([A-Za-z0-9_]+))?\)/g, (_link, method) => (
    method ? `](../parser/#${method})` : '](../parser/)'
  ));
}

await mkdir(path.join(websiteDir, 'docs', 'api'), { recursive: true });

for (const reference of references) {
  const generated = await jsdoc2md.render({
    files: path.join(repoDir, reference.source),
    'heading-depth': 2,
    'example-lang': 'js',
    'global-index-format': 'grouped',
    'module-index-format': 'grouped',
    'member-index-format': 'list',
    separators: true,
  });
  const normalized = normalizeGeneratedAnchors(generated.trim());
  const linked = reference.output === 'bowser.md'
    ? linkParserReferences(normalized)
    : normalized;
  const named = reference.output === 'utils.md'
    ? linked.replaceAll('module.exports', 'Utils')
    : linked;
  const normalizedWhitespace = normalizeMarkdownWhitespace(named);
  const anchored = validateLegacyAnchors(normalizedWhitespace, reference.aliases);
  const frontMatter = [
    '---',
    `title: ${JSON.stringify(reference.title)}`,
    '---',
    '',
    `> ${reference.description} This page is generated from source JSDoc comments.`,
    '',
  ].join('\n');

  await writeFile(path.join(websiteDir, 'docs', 'api', reference.output), `${frontMatter}${anchored}\n`);
}
