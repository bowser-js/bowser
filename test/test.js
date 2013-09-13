/**
 * Loop through all entries in our user agents object and test everything.
 *
 * @see  src/useragents.js
 * @author hannes.diercks@jimdo.com
 */

var g, ua, p,
    assert = require('assert'),
    bowser = require('../src/bowser').bowser,
    allUserAgents = require('../src/useragents').useragents;


/**
 * Get the length of an object.
 * http://stackoverflow.com/questions/5223/length-of-javascript-object-ie-associative-array
 *
 * @param  {Object} obj
 * @return {Number}
 */
function objLength(obj) {
  var size = 0, key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      size++;
    }
  }
  return size;
}

/* Groups */
for (g in allUserAgents) { (function(group, userAgents) {
  describe(group, function() {

    /* User Agents */
    for (ua in userAgents) { (function(userAgent, expections) {
      describe('#' + userAgent, function() {

        /* Get the result from bowser. */
        var result = bowser._detect(userAgent),
            expectionLength = objLength(expections);

        /* At first, check if the result has the correct length. */
        it('Should have ' + expectionLength + ' properties', function() {
          assert.equal(objLength(result), expectionLength);
        });

        /* Properties */
        for (p in expections) { (function(property, value, resultValue) {

          /* Now ensure correctness of every property. */
          it('\'s Property "' + property + '" should be ' + value, function() {
            assert.equal(resultValue, value);
          });

        })(p, expections[p], result[p]); }

      });
    })(ua, userAgents[ua]); }

  });
})(g, allUserAgents[g]); }
