const fs = require('fs');
const UAList = require('./src/useragents').useragents;
const json2yaml = require('json2yaml');
const Parser = require('./lib/parser').default;

const newBrowserList = {};

for (const browserName in UAList) {
  const newBrowser = [];
  const browserClass = UAList[browserName];

  for (const browserUA in browserClass) {
    const parsedUA = new Parser(browserUA).parse().getResult();
    const newBrowserDeclaration = {
      ua: browserUA
    };
    // const browserDeclaration = browserClass[browserUA];

    newBrowserDeclaration.spec = parsedUA;

    newBrowser.push(newBrowserDeclaration);
  }

  newBrowserList[browserName] = newBrowser;
}

const yaml = json2yaml.stringify(newBrowserList);

fs.writeFileSync('useragentstrings.yml', yaml);
