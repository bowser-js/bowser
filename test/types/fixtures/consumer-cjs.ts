// A CommonJS consumer: default import via esModuleInterop, types reached
// through the `export =` namespace. This is what `moduleResolution: node10`
// and `node16` (from CJS) consumers write.
import Bowser from 'bowser';

const UA = 'Mozilla/5.0 (Macintosh) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

const result: Bowser.Parser.ParsedResult = Bowser.parse(UA);
const parser: Bowser.Parser.Parser = Bowser.getParser(UA);
const name: string | undefined = result.browser.name;
const satisfies: boolean | undefined = parser.satisfies({ chrome: '>100' });
const hints: Bowser.ClientHints = { mobile: false };
const maps: Record<string, string> = Bowser.BROWSER_MAP;

export { name, satisfies, hints, maps };
