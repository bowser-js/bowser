// Type definitions for Bowser v2
// Project: https://github.com/lancedikson/bowser
// Definitions by: Alexander P. Cerutti <https://github.com/alexandercerutti>

declare module "bowser" {
	/**
	 * Bowser class.
	 * Keep it simple as much as it can be.
	 * It's supposed to work with collections of {@link Parser} instances
	 * rather then solve one-instance problems.
	 * All the one-instance stuff is located in Parser class.
	 */
	class Bowser {
		constructor();

		/**
		 * Creates a {@link module:parser:Parser} instance
		 *
		 * @param {String} UA UserAgent string
		 * @param {Boolean} [skipParsing=false] same as skipParsing for {@link Parser}
		 * @returns {Parser}
		 * @throws {Error} when UA is not a String
		 *
		 * @example
		 * const parser = Bowser.getParser(window.navigator.userAgent);
		 * const result = parser.getResult();
		 */
		static getParser(UA: string, skipParsing?: boolean): Parser

		/**
		 * Creates a {@link Parser} instance and runs {@link Parser.getResult} immediately
		 *
		 * @param UA
		 * @return {ParsedResult}
		 *
		 * @example
		 * const result = Bowser.parse(window.navigator.userAgent);
		 */
		static parse(UA: string): Parser.ParsedResult
	}

	/**
	 * The main class that arranges the whole parsing process.
	 */

	class Parser {
		constructor(UA: string, skipParsing?: boolean);

		/**
		 * Get parsed browser object
		 * @return {Parser.BrowserDetails} Browser's details
		 */

		getBrowser(): Parser.BrowserDetails;

		/**
		 * Get browser's name
		 * @return {String} Browser's name or an empty string
		 */

		getBrowserName(): string;

		/**
		 * Get browser's version
		 * @return {String} version of browser
		 */

		getBrowserVersion(): string;

		/**
		 * Get OS
		 * @return {Parser.OSDetails} - OS Details
		 *
		 * @example
		 * this.getOS(); // {
		 * //	 name: 'macOS',
		 * //	 version: '10.11.12',
		 * // }
		 */

		getOS(): Parser.OSDetails;

		/**
		 * Get OS name
		 * @param {Boolean} [toLowerCase] return lower-cased value
		 * @return {String} name of the OS — macOS, Windows, Linux, etc.
		 */

		getOSName(toLowerCase?: boolean): string;

		/**
		 * Get OS version
		 * @return {String} full version with dots ('10.11.12', '5.6', etc)
		 */

		getOSVersion(): string;

		/**
		 * Get parsed platform
		 * @returns {Parser.PlatformDetails}
		 */

		getPlatform(): Parser.PlatformDetails;

		/**
		 * Get platform name
		 * @param {boolean} toLowerCase
		 */

		getPlatformType(toLowerCase?: boolean): string;

		/**
		 * Get parsed engine
		 * @returns {Parser.EngineDetails}
		 */

		getEngine(): Parser.EngineDetails;

		/**
		 * Get parsed result
		 * @return {Parser.ParsedResult}
		 */

		getResult(): Parser.ParsedResult;

		/**
		 * Get UserAgent string of current Parser instance
		 * @return {String} User-Agent String of the current <Parser> object
		 */

		getUA(): string;

		/**
		 * Is anything? Check if the browser is called "anything",
		 * the OS called "anything" or the platform called "anything"
		 * @param {String} anything
		 * @returns {Boolean}
		 */

		is(anything: any): boolean;

		/**
		 * Parse full information about the browser
		 */

		parse(): void;

		/**
		 * Get parsed browser object
		 * @returns {Parser.BrowserDetails}
		 */

		parseBrowser(): Parser.BrowserDetails;

		/**
		 * Get parsed engine
		 * @returns {Parser.EngineDetails}
		 */

		parseEngine(): Parser.EngineDetails;

		/**
		 * Parse OS and save it to this.parsedResult.os
		 * @returns {Parser.OSDetails}
		 */

		parseOS(): Parser.OSDetails;

		/**
		 * Get parsed platform
		 * @returns {Parser.PlatformDetails}
		 */

		parsePlatform(): Parser.PlatformDetails;

		/**
		 * Check if parsed browser matches certain conditions
		 *
		 * @param {Parser.checkTree} checkTree It's one or two layered object,
		 * which can include a platform or an OS on the first layer
		 * and should have browsers specs on the bottom-laying layer
		 *
		 * @returns {Boolean|undefined} Whether the browser satisfies the set conditions or not.
		 * Returns `undefined` when the browser is no described in the checkTree object.
		 *
		 * @example
		 * const browser = new Bowser(UA);
		 * if (browser.check({chrome: '>118.01.1322' }))
		 * // or with os
		 * if (browser.check({windows: { chrome: '>118.01.1322' } }))
		 * // or with platforms
		 * if (browser.check({desktop: { chrome: '>118.01.1322' } }))
		 */

		satisfies(checkTree: Parser.checkTree): boolean | undefined;

		/**
		 * Check if any of the given values satifies `.is(anything)`
		 * @param {string[]} anythings
		 * @returns {boolean} true if at least one condition is satisfied, false otherwise.
		 */

		some(anythings: string[]): boolean | undefined;

		/**
		 * Test a UA string for a regexp
		 * @param regex
		 * @returns {boolean} true if the regex matches the UA, false otherwise.
		 */

		test(regex: RegExp): boolean
	}

	namespace Parser {
		interface ParsedResult {
			browser: Details;
			os: OSDetails;
			platform: PlatformDetails;
			engine: Details;
		}

		interface Details {
			name?: string;
			version?: Array<{index: number, input: string} | boolean | string | any>;
		}

		interface OSDetails extends Details {
			versionName?: string;
		}

		interface PlatformDetails {
			type?: string;
			vendor?: string;
			model?: string;
		}

		type BrowserDetails = Details;
		type EngineDetails = Details;

		interface checkTree {
			[key: string]: any;
		}
	}

	class Utils {
		/**
		 * Get first matched item for a string
		 * @param {RegExp} regexp
		 * @param {String} ua
		 * @return {Array|{index: number, input: string}|*|boolean|string}
		 */
		static getFirstMatch(regexp: RegExp, ua: string): Array<{index: number, input: string} | boolean | string | any>;
		/**
		 * Get second matched item for a string
		 * @param regexp
		 * @param {String} ua
		 * @return {Array|{index: number, input: string}|*|boolean|string}
		 */
		static getSecondMatch(regexp: RegExp, ua: string): Array<{index: number, input: string} | boolean | string | any>;
		
		/**
		 * Match a regexp and return a constant or undefined
		 * @param {RegExp} regexp
		 * @param {String} ua
		 * @param {*} _const Any const that will be returned if regexp matches the string
		 * @return {*}
		 */
		static matchAndReturnConst(regexp: RegExp, ua: string, _const: any): any | undefined;
		
		/**
		 * Retrieves Windows commercial name from NT Core version name
		 * @param {string} version
		 * @returns {string | undefined}
		 */
		static getWindowsVersionName(version: string): string | undefined;
		
		/**
		 * Get version precisions count
		 *
		 * @example
		 *	 getVersionPrecision("1.10.3") // 3
		 *
		 * @param {string} version
		 * @return {number}
		 */
		static getVersionPrecision(version: string): number
		
		/**
		 * Calculate browser version weight
		 *
		 * @example
		 *	 compareVersions('1.10.2.1',	'1.8.2.1.90')	// 1
		 *	 compareVersions('1.010.2.1', '1.09.2.1.90');	// 1
		 *	 compareVersions('1.10.2.1',	'1.10.2.1');	// 0
		 *	 compareVersions('1.10.2.1',	'1.0800.2');	// -1
		 *	 compareVersions('1.10.2.1',	'1.10',	true);	// 0
		 *
		 * @param {String} versionA versions versions to compare
		 * @param {String} versionB versions versions to compare
		 * @param {boolean} [isLoose] enable loose comparison
		 * @return {Number} comparison result: -1 when versionA is lower,
		 * 1 when versionA is bigger, 0 when both equal
		 */
		static compareVersions(versionA: string, versionB: string, isLoose?: boolean): number;
		
		/**
		 * Array::map polyfill
		 *
		 * @param	{Array} arr
		 * @param	{Function} iterator
		 * @return {Array}
		 */
		static map(arr: Array<any>, iterator: Function): Array<any>
	}

	export = Bowser;
}
