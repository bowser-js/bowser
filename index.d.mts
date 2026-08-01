// ESM type definitions for Bowser v2.
//
// `index.d.ts` uses `export =`, which describes the CommonJS/UMD shape of
// `es5.js` (`module.exports = Bowser`). It is reached via the `require`
// condition and stays the source of truth for the type declarations.
//
// This file describes `bowser.mjs`, which is a real ES module: it has a default
// export *and* the `parse` / `getParser` named exports. It is reached via the
// `import` condition. Declaring it separately is what keeps the types honest
// for `moduleResolution: node16`/`bundler` consumers — reusing `index.d.ts` for
// both conditions would describe an ES module with CommonJS types.

import Bowser = require('./index.js');

export default Bowser;

export declare const parse: typeof Bowser.parse;
export declare const getParser: typeof Bowser.getParser;

export declare const BROWSER_MAP: typeof Bowser.BROWSER_MAP;
export declare const ENGINE_MAP: typeof Bowser.ENGINE_MAP;
export declare const OS_MAP: typeof Bowser.OS_MAP;
export declare const PLATFORMS_MAP: typeof Bowser.PLATFORMS_MAP;

export type ClientHints = Bowser.ClientHints;
export type Parser = Bowser.Parser.Parser;
export type ParsedResult = Bowser.Parser.ParsedResult;
export type Details = Bowser.Parser.Details;
export type BrowserDetails = Bowser.Parser.BrowserDetails;
export type EngineDetails = Bowser.Parser.EngineDetails;
export type OSDetails = Bowser.Parser.OSDetails;
export type PlatformDetails = Bowser.Parser.PlatformDetails;
export type checkTree = Bowser.Parser.checkTree;

export { Bowser };
