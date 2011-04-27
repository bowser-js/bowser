require('smoosh').config({
  "JAVASCRIPT": {
    "DIST_DIR": "./",
    "bowser": [
      "./src/copyright.js",
      "./src/bowser.js"
    ]
  },
  "JSHINT_OPTS": {
    "boss": true,
    "forin": false,
    "curly": true,
    "debug": false,
    "devel": false,
    "evil": false,
    "regexp": false,
    "undef": false,
    "sub": false,
    "white": true,
    "indent": 2,
    "whitespace": true,
    "asi": false
  }
}).run().build().analyze();