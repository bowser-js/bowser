/**
 * Example User Agents and thair expected bowser objects.
 *
 * @see  test/test.js
 * @author hannes.diercks@jimdo.com
 */

module.exports.useragents = {
  Chrome: {
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_7) AppleWebKit/534.24 (KHTML, like Gecko) Chrome/11.0.696.57 Safari/534.24': {
      chrome: true,
      version: '11.0',
      webkit: true,
      a: true
    }
  },
  Opera: {
    'Opera/9.80 (Macintosh; Intel Mac OS X 10.6.7; U; en) Presto/2.7.62 Version/11.01': {
      opera: true,
      version: '11.01',
      a: true
    }
  },
  Safari: {
    'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_7; en-us) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1': {
      safari: true,
      version: '5.0',
      webkit: true,
      a: true
    }
  },
  'Internet Explorer': {
    'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C)': {
      msie: true,
      version: '8.0',
      a: true
    }
  },
  Firefox: {
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:2.0) Gecko/20100101 Firefox/4.0': {
      mozilla: true,
      gecko: true,
      firefox: true,
      version: '4.0',
      a: true
    }
  },
  iPhone: {
    'Mozilla/5.0 (iPhone Simulator; U; CPU iPhone OS 4_3_2 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8H7 Safari/6533.18.5': {
      ios: true,
      version: '5.0',
      iphone: true,
      mobile: true,
      webkit: true,
      x: true
    }
  },
  iPad: {
    'Mozilla/5.0 (iPad; U; CPU OS 4_3_2 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8H7 Safari/6533.18.5': {
      ios: true,
      version: '5.0',
      ipad: true,
      mobile: true,
      webkit: true,
      x: true
    }
  },
  Android: {
    'Mozilla/5.0 (Linux; U; Android 2.3.4; en-us; T-Mobile G2 Build/GRJ22) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1': {
      android: true,
      webkit: true,
      version: 4.0,
      mobile: true,
      x: true
    }
  },
  Touchpad: {
    'Mozilla/5.0 (hp-tabled;Linux;hpwOS/3.0.5; U; en-US)) AppleWebKit/534.6 (KHTML, like Gecko) wOSBrowser/234.83 Safari/534.6 TouchPad/1.0': {
      touchpad: true,
      version: '1.0',
      webkit: true,
      x: true
    }
  },
  PhantomJS: {
    'Mozilla/5.0 (Macintosh; Intel Mac OS X) AppleWebKit/534.34 (KHTML, like Gecko) PhantomJS/1.5.0 Safari/534.34': {
      phantom: true,
      webkit: true,
      version: '1.5',
      x: true
    }
  }
};
