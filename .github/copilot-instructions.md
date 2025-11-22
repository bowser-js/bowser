# Copilot Instructions for Bowser

## Project Overview

Bowser is a small, fast, and rich-API browser/platform/engine detector for both browser and Node.js environments. It's designed to parse User-Agent strings and provide detailed information about browsers, operating systems, platforms, and rendering engines.

## Architecture

### Core Components

- **`src/bowser.js`**: Main entry point and public API. Provides static methods `getParser()` and `parse()`.
- **`src/parser.js`**: Core parsing engine that orchestrates all parsers and returns structured results.
- **`src/parser-browsers.js`**: Browser detection logic using regex patterns.
- **`src/parser-os.js`**: Operating system detection logic.
- **`src/parser-platforms.js`**: Platform type detection (desktop, tablet, mobile).
- **`src/parser-engines.js`**: Rendering engine detection (WebKit, Blink, Gecko, etc.).
- **`src/constants.js`**: Centralized constants including browser aliases and mappings.
- **`src/utils.js`**: Utility functions for string matching and manipulation.

### Build Output

- **`es5.js`**: ES5 transpiled version (default export).
- **`bundled.js`**: ES5 version with babel-polyfill included.

## Development Workflow

### Setup

```bash
npm install
```

### Key Commands

- **Build**: `npm run build` - Compiles source files using Webpack and Babel.
- **Test**: `npm test` - Runs unit and acceptance tests using AVA.
- **Lint**: `npm run lint:check` - Checks code style using ESLint.
- **Lint Fix**: `npm run lint:fix` - Auto-fixes linting issues.
- **Watch Mode**: `npm run watch` - Builds on file changes.
- **Test Watch**: `npm run test:watch` - Runs tests on file changes.

### Testing

- Tests are located in `test/acceptance/` and `test/unit/`.
- Acceptance tests use real User-Agent strings from `test/acceptance/useragentstrings.yml`.
- Always update `useragentstrings.yml` when adding browser support.
- Test framework: AVA with Babel integration.

## Coding Standards

### Style Guide

- **ESLint Config**: Based on Airbnb Base style guide.
- **Parser**: Uses `babel-eslint`.
- **Exceptions**:
  - Underscore-dangle allowed for private properties.
  - `no-void` disabled.
  - ES6 imports must include `.js` extension.

### Naming Conventions

- **Browser Aliases**: Use lowercase letters, replace spaces/dashes with underscores, drop "browser" suffix.
  - Examples: `Opera Coast` → `opera_coast`, `UC Browser` → `uc`, `SeaMonkey` → `seamonkey`.
- **Private Properties**: Prefix with underscore (e.g., `_ua`).
- **Constants**: Use `UPPER_SNAKE_CASE` for constant maps and aliases.

### Code Patterns

- Use ES6 modules with explicit `.js` extensions.
- Prefer static methods in Bowser class.
- Use class-based structure for Parser.
- Regex patterns should be well-documented and tested.
- Keep parsers modular and focused on single responsibility.

## Adding Browser Support

When adding support for a new browser:

1. Add regex pattern to `src/parser-browsers.js`.
2. Add browser name to `BROWSER_ALIASES_MAP` in `src/constants.js`.
3. Add corresponding entry to `BROWSER_MAP`.
4. Add test cases to `test/acceptance/useragentstrings.yml`.
5. Run tests to verify: `npm test`.
6. Check for duplicates before adding aliases.

## Branching Strategy

- **`master`**: Development branch.
- **`production`**: Production branch.
- **New Features**: Branch from `master`, PR back to `master`.
- **Hot-fixes/Browser Support**: Branch from `production`, PR back to `production`.

## Important Files

- **`index.d.ts`**: TypeScript definitions.
- **`.babelrc`**: Babel configuration for ES5 transpilation.
- **`webpack.config.js`**: Build configuration.
- **`.eslintrc.yml`**: Linting rules.
- **`package.json`**: Dependencies and scripts.

## API Design Principles

- Keep the API simple and intuitive.
- Bowser class should be stateless and provide factory methods.
- Parser class handles instance-specific logic.
- Results should be structured and predictable.
- Support both immediate parsing and lazy parsing.

## Performance Considerations

- Parsers use lazy evaluation where possible.
- Regex patterns are optimized for common browsers first.
- Optional `skipParsing` parameter for delayed parsing.
- Minimal bundle size is a priority (~4.8kB gzipped).

## Documentation

- Use JSDoc comments for all public APIs.
- Document parameters, return types, and provide examples.
- Update README.md for API changes.
- Generate docs with: `npm run generate-docs`.

## Common Pitfalls

- Always check `BROWSER_ALIASES_MAP` for existing aliases before adding new ones.
- User-Agent strings can be complex; test edge cases thoroughly.
- Remember to update both the alias map and the reverse map in constants.
- Browser versions should be treated as strings, not numbers.
- Keep regex patterns readable with comments explaining their purpose.
