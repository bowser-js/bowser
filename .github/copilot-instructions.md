# Bowser - Browser/Device/OS Detection Library

Bowser is a lightweight JavaScript library for detecting browser, operating system, and device information from user-agent strings. It works in both browser and Node.js environments and provides a rich API for parsing and comparing browser capabilities.

**ALWAYS follow these instructions first and fallback to additional search and context gathering only if the information here is incomplete or found to be in error.**

## Working Effectively

### Environment Setup
- **CRITICAL**: Use Node.js version 12.16.3 exactly. Newer versions (16+, 20+) will fail due to webpack/babel compatibility issues.
- Install nvm to manage Node.js versions if needed:
  ```bash
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
  nvm install 12.16.3
  nvm use 12.16.3
  ```

### Bootstrap and Build
Follow these steps exactly in order:
1. **Install dependencies**: `npm ci` -- takes 6-7 seconds. Use npm ci instead of npm install for consistency.
2. **Build the library**: `npm run build` -- takes 4-5 seconds. NEVER CANCEL. Set timeout to 30+ seconds.
3. **Run tests**: `npm test` -- takes 8 seconds. NEVER CANCEL. Set timeout to 60+ seconds.
4. **Run linting**: `npm run lint:check` -- takes 1-2 seconds.

### Build Troubleshooting
- **If build fails with "digital envelope routines::unsupported"**: You are using the wrong Node.js version. Switch to 12.16.3.
- **If build fails with "@babel/helper-compilation-targets" errors**: You are using the wrong Node.js version. Switch to 12.16.3.
- **npm install shows many deprecation warnings**: This is expected with the legacy dependencies, ignore these warnings.
- **Build shows webpack/babel warnings about core-js and caniuse-lite**: These are expected warnings, the build still succeeds correctly.
- **"WARNING: We noticed you're using the `useBuiltIns` option without declaring a core-js version"**: This is expected, ignore this warning.

## Validation

### Manual Testing Requirements
After making any changes, ALWAYS validate functionality:
1. **Test the built library**: Create a test script to verify bowser functionality works correctly
2. **Basic parsing test** (create test script in project root):
   ```javascript
   const bowser = require('./es5.js');
   const testUA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36';
   const browser = bowser.getParser(testUA);
   console.log('Browser:', browser.getBrowserName());
   console.log('OS:', browser.getOSName());
   console.log('Platform:', browser.getPlatformType());
   ```
3. **Verify build outputs**: Check that both `es5.js` and `bundled.js` are generated and have reasonable file sizes (~26KB and ~114KB respectively)

### End-to-End Scenarios
Test these complete workflows after making changes:
- **Parse a modern browser UA**: Verify Chrome, Firefox, Safari detection works correctly
- **Parse mobile browser UA**: Test mobile Chrome, Safari iOS detection
- **Test satisfies() method**: Verify version comparison logic with common version patterns
- **Test alias resolution**: Verify browser aliases work (e.g., 'chrome' instead of 'Chrome')

### Pre-commit Validation
ALWAYS run these before committing changes or the CI will fail:
- `npm run lint:check` - ESLint validation (1-2 seconds)
- `npm run build` - Verify builds successfully (4-5 seconds)
- `npm test` - Full test suite (8 seconds, 257 tests)

## Development Workflow

### Common Tasks
- **Add new browser support**: Update `src/parser-browsers.js` and add test cases to `test/acceptance/useragentstrings.yml`
- **Update browser aliases**: Modify `src/constants.js` following naming conventions (lowercase, underscores, no 'browser' suffix)
- **Fix parsing logic**: Main parsing logic is in `src/parser.js`
- **Update documentation**: Run `npm run generate-docs` to rebuild JSDoc documentation (takes <1 second)

### Testing Strategy
- **Unit tests**: Located in `test/unit/` - test individual functions and methods
- **Acceptance tests**: Located in `test/acceptance/` - test against real user-agent strings from `useragentstrings.yml`
- **Test data**: The `useragentstrings.yml` file contains 200+ real user-agent strings with expected parsing results

### Code Organization
```
src/
├── bowser.js          # Main entry point and public API
├── parser.js          # Core parsing logic and Parser class
├── parser-browsers.js # Browser detection patterns
├── parser-engines.js  # Engine detection patterns  
├── parser-os.js       # Operating system detection
├── parser-platforms.js# Platform/device type detection
├── constants.js       # Browser aliases and constants
└── utils.js           # Utility functions

test/
├── unit/              # Unit tests for individual modules
└── acceptance/        # End-to-end tests with real user agents
```

## Build and Distribution

### Output Files
- `es5.js` - Main transpiled version (~26KB) - referenced by package.json "main" field
- `bundled.js` - Version with babel polyfill included (~114KB) - for environments without polyfills
- Both files are UMD modules compatible with CommonJS, AMD, and browser globals

### Webpack Configuration
- Uses webpack 4.41.0 with babel-loader for transpilation
- Targets ES5 for maximum compatibility
- Includes compression plugin for .gz versions
- Configuration in `webpack.config.js`

## Timing Expectations

**NEVER CANCEL these commands - wait for completion:**
- `npm ci`: 6-7 seconds 
- `npm run build`: 4-5 seconds - NEVER CANCEL, set timeout to 30+ seconds
- `npm test`: 8 seconds - NEVER CANCEL, set timeout to 60+ seconds  
- `npm run lint:check`: 1-2 seconds
- `npm run generate-docs`: <1 second

## CI/CD Integration

The project uses GitHub Actions (.github/workflows/):
- **pull-request.yml**: Runs on every PR, tests with Node.js 12.16.3
- **merge-to-master.yml**: Handles merges to master branch
- **publish.yml**: Handles npm publishing
- Uses `npm ci`, `npm run build`, `npm test`, and `npm run lint:check`

## Library Usage Patterns

### Common API Usage
```javascript
// Get parser instance
const browser = Bowser.getParser(userAgentString);

// Get browser info
browser.getBrowserName();     // "Chrome"
browser.getBrowserVersion();  // "91.0.4472.114"

// Get OS info  
browser.getOSName();         // "macOS"
browser.getOSVersion();      // "10.15.7"

// Get platform info
browser.getPlatformType();   // "desktop"

// Parse everything at once
Bowser.parse(userAgentString);

// Version comparison
browser.satisfies({
  chrome: ">=70",
  firefox: ">60"
});
```

### Browser Aliases
Defined in `src/constants.js`. Follow these rules when adding:
- Use lowercase letters only
- Replace spaces/dashes with underscores  
- Drop "browser" from names when possible
- Examples: "UC Browser" → "uc", "Opera Coast" → "opera_coast"

## Troubleshooting

### Common Issues
- **Build fails**: Wrong Node.js version - use 12.16.3 exactly
- **Tests fail**: Usually indicates real bugs - don't ignore failing tests
- **Lint errors**: Run `npm run lint:fix` to auto-fix style issues
- **New browser not detected**: Add patterns to `parser-browsers.js` and test cases to `useragentstrings.yml`

### Debug Workflow
1. Add console.log() statements in parsing logic
2. Run single test: `npx ava test/unit/parser.js -m "*specific test*"`
3. Test with custom user agent: Create temporary test script
4. Check test data: Verify `useragentstrings.yml` has correct expected results

## Documentation

- **API docs**: Generated with JSDoc, run `npm run generate-docs`
- **Main docs**: `README.md` with usage examples
- **Contributing**: `.github/CONTRIBUTING.md` with development guidelines
- **Online demo**: https://bowser-js.github.io/bowser-online/

Always update documentation when making API changes or adding new features.