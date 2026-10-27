// An ES module consumer: default plus named imports, types imported as types.
// This is `moduleResolution: node16` (from ESM), `nodenext` and `bundler`.
import Bowser, { parse, getParser, BROWSER_MAP, ENGINE_MAP, OS_MAP, PLATFORMS_MAP } from 'bowser';
import type { ParsedResult, Parser, ClientHints, checkTree } from 'bowser';
// The namespace import the README documents for TypeScript: it must offer
// everything the CommonJS `export =` namespace does.
import * as BowserNS from 'bowser';

const UA = 'Mozilla/5.0 (Macintosh) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

const result: ParsedResult = parse(UA);
const parser: Parser = getParser(UA);
const tree: checkTree = { chrome: '>100' };
const satisfies: boolean | undefined = parser.satisfies(tree);
const comparison: boolean | undefined = parser.compareVersion('>100');
// @ts-expect-error A browser without a detected version returns undefined.
const definiteComparison: boolean = parser.compareVersion('>100');
const hints: ClientHints = { mobile: false };
const maps: Array<Record<string, string>> = [
  Bowser.BROWSER_MAP, BROWSER_MAP, ENGINE_MAP, OS_MAP, PLATFORMS_MAP,
];

const nsResult: BowserNS.Parser.ParsedResult = BowserNS.parse(UA);
const nsParser: BowserNS.Parser.Parser = BowserNS.getParser(UA);
const nsHints: BowserNS.ClientHints = { mobile: false };
const nsMaps: Array<Record<string, string>> = [
  BowserNS.BROWSER_MAP, BowserNS.ENGINE_MAP, BowserNS.OS_MAP, BowserNS.PLATFORMS_MAP,
];

export { result, satisfies, hints, maps, nsResult, nsParser, nsHints, nsMaps };
