(function redirectLegacyDocumentation() {
  const baseUrl = '/bowser/';
  const apiTargets = {
    'Bowser.html': 'api/bowser/',
    'BowserUAIsNotAStringError.html': 'api/bowser/#getParser',
    'Parser.html': 'api/parser/',
    'global.html': 'api/utils/',
  };
  const sourceTargets = {
    'bowser.js.html': 'src/bowser.js',
    'parser.js.html': 'src/parser.js',
    'utils.js.html': 'src/utils.js',
  };
  const indexFragments = {
    overview: '#overview',
    'use-cases': 'getting-started/',
    'browser-props-detection': 'getting-started/#parse-browser-details',
    'using-user-agent-client-hints': 'client-hints/',
    'filtering-browsers': 'filtering/',
  };

  const fileName = window.location.pathname.split('/').pop() || 'index.html';
  const oldFragment = decodeURIComponent(window.location.hash.slice(1));
  let destination;

  if (fileName === 'index.html') {
    destination = `${baseUrl}${indexFragments[oldFragment] || ''}`;
  } else if (sourceTargets[fileName]) {
    destination = `https://github.com/bowser-js/bowser/blob/master/${sourceTargets[fileName]}`;
  } else if (fileName === 'global.html' && ['ClientHints', 'ParsedResult'].includes(oldFragment)) {
    destination = `${baseUrl}api/parser/#${oldFragment}`;
  } else {
    destination = `${baseUrl}${apiTargets[fileName] || ''}`;
    if (oldFragment && !fileName.startsWith('BowserUA')) {
      const fragment = fileName === 'Parser.html' && oldFragment === 'Parser'
        ? 'constructor'
        : oldFragment.replace(/^\./, '');
      destination += `#${fragment}`;
    }
  }

  window.location.replace(destination);
}());
