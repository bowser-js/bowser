import { getFirstMatch } from './utils';

/*
 * More specific goes first
 */
export default [
  /* EdgeHTML */
  {
    test(parser) {
      return parser.getBrowserName(true) === 'microsoft edge';
    },
    describe(ua) {
      const version = getFirstMatch(/edge\/(\d+(\.?_?\d+)+)/i, ua);
      return {
        name: 'EdgeHTML',
        version,
      };
    },
  },

  /* Trident */
  {
    test: [/trident/i],
    describe(ua) {
      const engine = {
        name: 'Trident',
      };

      const version = getFirstMatch(/trident\/(\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        engine.version = version;
      }

      return engine;
    },
  },

  /* Presto */
  {
    test(parser) {
      return parser.test(/presto/i);
    },
    describe(ua) {
      const engine = {
        name: 'Presto',
      };

      const version = getFirstMatch(/presto\/(\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        engine.version = version;
      }

      return engine;
    },
  },

  /* Gecko */
  {
    test(parser) {
      const isGecko = parser.test(/gecko/i);
      const likeGecko = parser.test(/like gecko/i);
      return isGecko && !likeGecko;
    },
    describe(ua) {
      const engine = {
        name: 'Gecko',
      };

      const version = getFirstMatch(/gecko\/(\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        engine.version = version;
      }

      return engine;
    },
  },

  /* Blink */
  {
    test: [/(apple)?webkit\/537\.36/i],
    describe() {
      return {
        name: 'Blink',
      };
    },
  },

  /* WebKit */
  {
    test: [/(apple)?webkit/i],
    describe(ua) {
      const engine = {
        name: 'WebKit',
      };

      const version = getFirstMatch(/webkit\/(\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        engine.version = version;
      }

      return engine;
    },
  },
];
