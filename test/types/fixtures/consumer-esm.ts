// An ES module consumer: default plus named imports, types imported as types.
// This is `moduleResolution: node16` (from ESM), `nodenext` and `bundler`.
import Bowser, { parse, getParser } from 'bowser';
import type { ParsedResult, Parser, ClientHints, checkTree } from 'bowser';

const UA = 'Mozilla/5.0 (Macintosh) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

const result: ParsedResult = parse(UA);
const parser: Parser = getParser(UA);
const tree: checkTree = { chrome: '>100' };
const satisfies: boolean | undefined = parser.satisfies(tree);
const hints: ClientHints = { mobile: false };
// BROWSER_MAP is deliberately not a named export of bowser.mjs — it only
// exists as a static on the class. Reaching it any other way must not compile.
const maps: Record<string, string> = Bowser.BROWSER_MAP;

export { result, satisfies, hints, maps };
