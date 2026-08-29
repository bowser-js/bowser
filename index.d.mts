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

// BROWSER_MAP / ENGINE_MAP / OS_MAP / PLATFORMS_MAP are *not* named exports of
// bowser.mjs — they exist only as static getters on the class. Declaring them
// here would let TypeScript accept `import { BROWSER_MAP } from 'bowser'`,
// which throws at runtime. Reach them via the default export instead.

export type ClientHints = Bowser.ClientHints;
export type Parser = Bowser.Parser.Parser;
export type ParsedResult = Bowser.Parser.ParsedResult;
export type Details = Bowser.Parser.Details;
export type BrowserDetails = Bowser.Parser.BrowserDetails;
export type EngineDetails = Bowser.Parser.EngineDetails;
export type OSDetails = Bowser.Parser.OSDetails;
export type PlatformDetails = Bowser.Parser.PlatformDetails;
export type checkTree = Bowser.Parser.checkTree;
