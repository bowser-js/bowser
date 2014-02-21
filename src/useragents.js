/**
 * Example User Agents and their expected bowser objects.
 * Most of them where found at http://www.useragentstring.com/
 *
 * @see  test/test.js
 * @author hannes.diercks@jimdo.com
 */
module.exports.useragents = {
    Chrome: {
      'Mozilla/5.0 (Linux; Android 4.3; Galaxy Nexus Build/JWR66Y) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1700.99 Mobile Safari/537.36': {
        chrome: true
      , android: true
      , osversion: '4.3'
      , mobile: true
      , version: '32.0'
      , webkit: true
      , a: true
      }
    , 'Mozilla/5.0 (Linux; Android 4.1; Galaxy Nexus Build/JRN84D) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19': {
        chrome: true
      , android: true
      , osversion: '4.1'
      , mobile: true
      , version: '18.0'
      , webkit: true
      , c: true
      }
    , 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 5_1_1 like Mac OS X; en) AppleWebKit/534.46.0 (KHTML, like Gecko) CriOS/19.0.1084.60 Mobile/9B206 Safari/7534.48.3': {
        chrome: true
      , iphone: true
      , ios: true
      , osversion: '5.1.1'
      , mobile: true
      , version: '19.0'
      , webkit: true
      , c: true
      }
    , 'Mozilla/5.0 (iPad; U; CPU OS 5_1_1 like Mac OS X; en-us) AppleWebKit/534.46.0 (KHTML, like Gecko) CriOS/19.0.1084.60 Mobile/9B206 Safari/7534.48.3': {
        chrome: true
      , ipad: true
      , ios: true
      , osversion: '5.1.1'
      , mobile: true
      , version: '19.0'
      , webkit: true
      , c: true
      }
    , 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.17 Safari/537.36': {
        chrome: true
      , version: '30.0'
      , webkit: true
      , a: true
      }
    , 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.62 Safari/537.36': {
        chrome: true
      , version: '29.0'
      , webkit: true
      , a: true
      }
    , 'Mozilla/5.0 (X11; CrOS i686 4319.74.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.57 Safari/537.36': {
        chrome: true
      , version: '29.0'
      , webkit: true
      , a: true
      }
    , 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.2 Safari/537.36': {
        chrome: true
      , version: '29.0'
      , webkit: true
      , a: true
      }
    , 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/28.0.1468.0 Safari/537.36': {
        chrome: true
      , version: '28.0'
      , webkit: true
      , a: true
      }
    , 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_7) AppleWebKit/534.24 (KHTML, like Gecko) Chrome/11.0.696.57 Safari/534.24': {
        chrome: true
      , version: '11.0'
      , webkit: true
      , c: true
      }
    , 'Mozilla/5.0 (X11; U; Linux i686; en-US) AppleWebKit/534.3 (KHTML, like Gecko) Chrome/6.0.462.0 Safari/534.3': {
        chrome: true
      , version: '6.0'
      , webkit: true
      , c: true
      }
    }
  , 'Amazon Silk': {
      'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_3; en-us; Silk/1.0.22.153_10033210) AppleWebKit/533.16 (KHTML, like Gecko) Version/5.0 Safari/533.16 Silk-Accelerated=true': {
        name: 'Amazon Silk'
      , webkit: true
      , android: true
      , mobile: true
      , version : '1.0'
      , x: true
      }
    }
  , Opera: {
      'Mozilla/5.0 (Linux; Android 4.3; Galaxy Nexus Build/JWR66Y) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1700.72 Mobile Safari/537.36 OPR/19.0.1340.69721': {
        opera: true
      , webkit: true
      , android: true
      , osversion: '4.3'
      , mobile: true
      , version: '19.0'
      , a: true
      }
    , 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/28.0.1500.52 Safari/537.36 OPR/15.0.1147.100': {
        opera: true
      , webkit: true
      , version: '15.0'
      , a: true
      }
    , 'Opera/9.80 (Android 4.3; Linux; Opera Mobi/ADR-1309251116) Presto/2.11.355 Version/12.10': {
        opera: true
      , version: '12.10'
      , android: true
      , osversion: '4.3'
      , mobile: true
      , a: true
      }
    , 'Opera/9.80 (Windows NT 6.0) Presto/2.12.388 Version/12.14': {
        opera: true
      , version: '12.14'
      , a: true
      }
    , 'Mozilla/5.0 (Windows NT 6.0; rv:2.0) Gecko/20100101 Firefox/4.0 Opera 12.14': {
        opera: true
      , version: '12.14'
      , a: true
      }
    , 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.0) Opera 12.14': {
        opera: true
      , version: '12.14'
      , a: true
      }
    , 'Opera/12.80 (Windows NT 5.1; U; en) Presto/2.10.289 Version/12.02': {
        opera: true
      , version: '12.02'
      , a: true
      }
    , 'Opera/9.80 (X11; Linux i686; U; es-ES) Presto/2.8.131 Version/11.11': {
        opera: true
      , version: '11.11'
      , a: true
      }
    , 'Opera/9.80 (Macintosh; Intel Mac OS X 10.6.7; U; en) Presto/2.7.62 Version/11.01': {
        opera: true
      , version: '11.01'
      , a: true
      }
    , 'Opera/9.80 (Windows NT 5.2; U; zh-cn) Presto/2.6.30 Version/10.63': {
        opera: true
      , version: '10.63'
      , a: true
      }
    , 'Opera/9.80 (X11; Linux i686; U; it) Presto/2.5.24 Version/10.54': {
        opera: true
      , version: '10.54'
      , a: true
      }
    , 'Opera/9.70 (Linux ppc64 ; U; en) Presto/2.2.1': {
        opera: true
      , version: '9.70'
      , c: true
      }
    , 'Opera/9.63 (X11; Linux i686)': {
        opera: true
      , version: '9.63'
      , c: true
      }
    , 'Mozilla/5.0 (X11; Linux i686; U; en) Opera 8.52': {
        opera: true
      , version: '8.52'
      , c: true
      }
    }
  , Safari: {
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/537.13+ (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2': {
        safari: true
      , version: '5.1'
      , webkit: true
      , a: true
      }
    , 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_7; en-us) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1': {
        safari: true
      , version: '5.0'
      , webkit: true
      , a: true
      }
    , 'Mozilla/5.0 (Windows; U; Windows NT 5.1; ru-RU) AppleWebKit/533.18.1 (KHTML, like Gecko) Version/5.0.2 Safari/533.18.5': {
        safari: true
      , version: '5.0'
      , webkit: true
      , a: true
      }
    , 'Mozilla/5.0 (X11; U; Linux x86_64; en-us) AppleWebKit/531.2+ (KHTML, like Gecko) Version/5.0 Safari/531.2+': {
        safari: true
      , version: '5.0'
      , webkit: true
      , a: true
      }
    , 'Mozilla/5.0 (Windows; U; Windows NT 5.0; en-en) AppleWebKit/533.16 (KHTML, like Gecko) Version/4.1 Safari/533.16': {
        safari: true
      , version: '4.1'
      , webkit: true
      , c: true
      }
    , 'Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10_6_1; en_GB, en_US) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Safari/531.21.10': {
        safari: true
      , version: '4.0'
      , webkit: true
      , c: true
      }
    , 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_5_7; de-de) AppleWebKit/525.28.3 (KHTML, like Gecko) Version/3.2.3 Safari/525.28.3': {
        safari: true
      , version: '3.2'
      , webkit: true
      , c: true
      }
    }
  , 'Internet Explorer': {
      'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0; ARM; Touch; WPDesktop)': {
        msie: true
      , version: '10.0'
      , a: true
      }
    , 'Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; .NET4.0E; .NET4.0C; Media Center PC 6.0; rv:11.0) like Gecko': {
        msie: true
      , version: '11.0'
      , a: true
      }
    , 'Mozilla/5.0 (compatible; MSIE 10.6; Windows NT 6.1; Trident/5.0; InfoPath.2; SLCC1; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729; .NET CLR 2.0.50727) 3gpp-gba UNTRUSTED/1.0': {
        msie: true
      , version: '10.6'
      , a: true
      }
    , 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/4.0; InfoPath.2; SV1; .NET CLR 2.0.50727; WOW64)': {
        msie: true
      , version: '10.0'
      , a: true
      }
    , 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Win64; x64; Trident/5.0; .NET CLR 3.5.30729; .NET CLR 3.0.30729; .NET CLR 2.0.50727; Media Center PC 6.0)': {
        msie: true
      , version: '9.0'
      , a: true
      }
    , 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C)': {
        msie: true
      , version: '8.0'
      , c: true
      }
    , 'Mozilla/4.0 (compatible; MSIE 7.0b; Windows NT 5.1; .NET CLR 1.1.4322; InfoPath.1; .NET CLR 2.0.50727)': {
        msie: true
      , version: '7.0'
      , c: true
      }
    , 'Mozilla/4.0 (compatible; MSIE 6.1; Windows XP; .NET CLR 1.1.4322; .NET CLR 2.0.50727)': {
        msie: true
      , version: '6.1'
      , c: true
      }
    , 'Mozilla/4.0 (Compatible; Windows NT 5.1; MSIE 6.0) (compatible; MSIE 6.0; Windows NT 5.1; .NET CLR 1.1.4322; .NET CLR 2.0.50727)': {
        msie: true
      , version: '6.0'
      , c: true
      }
    , 'Mozilla/4.0 (compatible; MSIE 5.01; Windows NT)': {
        msie: true
      , version: '5.01'
      , c: true
      }
    }
  , Firefox: {
      'Mozilla/5.0 (Mobile; rv:26.0) Gecko/26.0 Firefox/26.0': {
        mozilla: true
      , gecko: true
      , firefox: true
      , version: '26.0'
      , mobile: true
      , firefoxos: true
      , a: true
      }
    , 'Mozilla/5.0 (Tablet; rv:26.0) Gecko/26.0 Firefox/26.0': {
        mozilla: true
      , gecko: true
      , firefox: true
      , version: '26.0'
      , mobile: true
      , firefoxos: true
      , a: true
      }
    , 'Mozilla/5.0 (Mobile; LG-D300; rv:18.1) Gecko/18.1 Firefox/18.1': {
        mozilla: true
      , gecko: true
      , firefox: true
      , version: '18.1'
      , mobile: true
      , firefoxos: true
      , a: true
      }
    , 'Mozilla/5.0 (Android; Mobile; rv:27.0) Gecko/27.0 Firefox/27.0': {
        mozilla: true
      , gecko: true
      , firefox: true
      , version: '27.0'
      , mobile: true
      , android: true
      , a: true
      }
    , 'Mozilla/5.0 (Android; Tablet; rv:26.0) Gecko/26.0 Firefox/26.0': {
        mozilla: true
      , gecko: true
      , firefox: true
      , version: '26.0'
      , mobile: true
      , android: true
      , a: true
      }
    , 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:25.0) Gecko/20100101 Firefox/25.0': {
        mozilla: true
      , gecko: true
      , firefox: true
      , version: '25.0'
      , a: true
      }
    , 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:24.0) Gecko/20100101 Firefox/24.0': {
        mozilla: true
      , gecko: true
      , firefox: true
      , version: '24.0'
      , a: true
      }
    , 'Mozilla/5.0 (X11; Linux i686; rv:21.0) Gecko/20100101 Firefox/21.0': {
        mozilla: true
      , gecko: true
      , firefox: true
      , version: '21.0'
      , a: true
      }
    , 'Mozilla/5.0 (Windows NT 6.2; WOW64; rv:15.0) Gecko/20120910144328 Firefox/15.0.2': {
        mozilla: true
      , gecko: true
      , firefox: true
      , version: '15.0'
      , a: true
      }
    , 'Mozilla/5.0 (Windows; U; Windows NT 6.1; WOW64; en-US; rv:2.0.4) Gecko/20120718 AskTbAVR-IDW/3.12.5.17700 Firefox/14.0.1': {
        mozilla: true
      , gecko: true
      , firefox: true
      , version: '14.0'
      , a: true
      }
    , 'Mozilla/5.0 (Windows NT 5.1; rv:6.0) Gecko/20100101 Firefox/6.0 FirePHP/0.6': {
        mozilla: true
      , gecko: true
      , firefox: true
      , version: '6.0'
      , c: true
      }
    , 'Mozilla/5.0 (X11; Linux x86_64; rv:2.2a1pre) Gecko/20100101 Firefox/4.2a1pre': {
        mozilla: true
      , gecko: true
      , firefox: true
      , version: '4.2'
      , c: true
      }
    , 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:2.0) Gecko/20100101 Firefox/4.0': {
        mozilla: true
      , gecko: true
      , firefox: true
      , version: '4.0'
      , c: true
      }
    , 'Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US; rv:1.9.2b1) Gecko/20091014 Firefox/3.6b1 GTB5': {
        mozilla: true
      , gecko: true
      , firefox: true
      , version: '3.6'
      , c: true
      }
    , 'Mozilla/5.0 (Windows; U; Windows NT 6.0; de; rv:1.9.0.15) Gecko/2009101601 Firefox 2.1 (.NET CLR 3.5.30729)': {
        mozilla: true
      , gecko: true
      , firefox: true
      , version: '2.1'
      , c: true
      }
    , 'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.8.0.7) Gecko/20061014 Firefox/1.5.0.7': {
        mozilla: true
      , gecko: true
      , firefox: true
      , version: '1.5'
      , c: true
      }
    }
  , SeaMonkey: {
      'Mozilla/5.0 (Windows NT 5.2; rv:10.0.1) Gecko/20100101 Firefox/10.0.1 SeaMonkey/2.7.1': {
        mozilla: true
      , gecko: true
      , seamonkey: true
      , version: '2.7'
      , x: true
      }
    , 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.5; rv:10.0.1) Gecko/20100101 Firefox/10.0.1 SeaMonkey/2.7.1': {
        mozilla: true
      , gecko: true
      , seamonkey: true
      , version: '2.7'
      , x: true
      }
    , 'Mozilla/5.0 (X11; Linux i686; rv:10.0.1) Gecko/20100101 Firefox/10.0.1 SeaMonkey/2.7.1': {
        mozilla: true
      , gecko: true
      , seamonkey: true
      , version: '2.7'
      , x: true
      }
    }
  , iPhone: {
      'Mozilla/5.0 (iPhone; CPU iPhone OS 7_0_4 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Mobile/11B554a': {
        ios: true
      , osversion: '7.0.4'
      , iphone: true
      , mobile: true
      , webkit: true
      , a: true
      }
    , 'Mozilla/5.0 (iPhone Simulator; U; CPU iPhone OS 4_3_2 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8H7 Safari/6533.18.5': {
        ios: true
      , osversion: '4.3.2'
      , version: '5.0'
      , iphone: true
      , mobile: true
      , webkit: true
      , c: true
      }
    , 'Mozilla/5.0 (iPhone; U; CPU like Mac OS X; en) AppleWebKit/420+ (KHTML, like Gecko) Version/3.0 Mobile/1A543a Safari/419.3': {
        ios: true
      , version: '3.0'
      , iphone: true
      , mobile: true
      , webkit: true
      , x: true
      }
    , 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_1 like Mac OS X; en-us) AppleWebKit/532.9 (KHTML, like Gecko) Version/4.0.5 Mobile/8B5097d Safari/6531.22.7': {
        ios: true
      , osversion: '4.1'
      , version: '4.0'
      , iphone: true
      , mobile: true
      , webkit: true
      , c: true
      }
    , 'Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10_5_2; en-gb) AppleWebKit/526+ (KHTML, like Gecko) Version/3.1 iPhone': {
        ios: true
      , version: '3.1'
      , iphone: true
      , mobile: true
      , webkit: true
      , x: true
      }
    }
  , iPad: {
      'Mozilla/5.0 (iPad; CPU OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5355d Safari/8536.25': {
        ios: true
      , osversion: '6.0'
      , name: 'iPad'
      , version: '6.0'
      , ipad: true
      , mobile: true
      , webkit: true
      , a: true
      }
    , 'Mozilla/5.0 (iPad; CPU OS 5_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko ) Version/5.1 Mobile/9B176 Safari/7534.48.3': {
        ios: true
      , osversion: '5.1'
      , name: 'iPad'
      , version: '5.1'
      , ipad: true
      , mobile: true
      , webkit: true
      , c: true
      }
    , 'Mozilla/5.0 (iPad; U; CPU OS 4_3_2 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8H7 Safari/6533.18.5': {
        ios: true
      , osversion: '4.3.2'
      , name: 'iPad'
      , version: '5.0'
      , ipad: true
      , mobile: true
      , webkit: true
      , c: true
      }
    , 'Mozilla/5.0 (iPad; U; CPU OS 3_2 like Mac OS X; es-es) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B360 Safari/531.21.10': {
        ios: true
      , osversion: '3.2'
      , name: 'iPad'
      , version: '4.0'
      , ipad: true
      , mobile: true
      , webkit: true
      , c: true
      }
    }
  , iPod: {
      'Mozilla/5.0 (iPod; CPU iPhone OS 5_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9B176 Safari/7534.48.3': {
        ios: true
      , osversion: '5.1'
      , version: '5.1'
      , ipod: true
      , mobile: true
      , webkit: true
      , c: true
      }
    , 'Mozilla/5.0 (iPod; U; CPU iPhone OS 4_3_3 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8J2 Safari/6533.18.5': {
        ios: true
      , osversion: '4.3.3'
      , version: '5.0'
      , ipod: true
      , mobile: true
      , webkit: true
      , c: true
      }
    , 'Mozilla/5.0 (iPod; U; CPU like Mac OS X; en) AppleWebKit/420.1 (KHTML, like Gecko) Version/3.0 Mobile/4A93 Safari/419.3': {
        ios: true
      , version: '3.0'
      , ipod: true
      , mobile: true
      , webkit: true
      , x: true
      }
    }
  , BlackBerry: {
      'Mozilla/5.0 (BlackBerry; U; BlackBerry 9900; en) AppleWebKit/534.11+ (KHTML, like Gecko) Version/7.1.0.346 Mobile Safari/534.11+': {
        blackberry: true
      , version: '7.1'
      , webkit: true
      , mobile: true
      , x: true
      }
    , 'Mozilla/5.0 (BlackBerry; U; BlackBerry 9800; en-US) AppleWebKit/534.8+ (KHTML, like Gecko) Version/6.0.0.450 Mobile Safari/534.8+': {
        blackberry: true
      , version: '6.0'
      , webkit: true
      , mobile: true
      , x: true
      }
    , 'BlackBerry9800/5.0.0.862 Profile/MIDP-2.1 Configuration/CLDC-1.1 VendorID/331 UNTRUSTED/1.0 3gpp-gba': {
        blackberry: true
      , version: '5.0'
      , mobile: true
      , x: true
      }
    , 'BlackBerry8320/4.5.0.52 Profile/MIDP-2.0 Configuration/CLDC-1.1 VendorID/179': {
        blackberry: true
      , version: '4.5'
      , mobile: true
      , x: true
      }
    }
  , 'Windows Phone': {
      'Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 920; Vodafone)': {
        windowsphone: true
      , osversion: '8.0'
      , msie: true
      , version: '10.0'
      , mobile: true
      , a: true
      }
    , 'Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 920)': {
        windowsphone: true
      , osversion: '8.0'
      , msie: true
      , version: '10.0'
      , mobile: true
      , a: true
      }
    , 'Mozilla/5.0 (compatible; MSIE 9.0; Windows Phone OS 7.5; Trident/5.0; IEMobile/9.0)': {
        windowsphone: true
      , osversion: '7.5'
      , msie: true
      , version: '9.0'
      , mobile: true
      , a: true
      }
    , 'Mozilla/4.0 (compatible; MSIE 7.0; Windows Phone OS 7.0; Trident/3.1; IEMobile/7.0; Nokia;N70)': {
        windowsphone: true
      , osversion: '7.0'
      , msie: true
      , version: '7.0'
      , mobile: true
      , c: true
      }
    }
  , WebOS: {
      'Mozilla/5.0 (webOS/1.0; U; en-US) AppleWebKit/525.27.1 (KHTML, like Gecko) Version/1.0 Safari/525.27.1 Pre/1.0': {
        webos: true
      , webkit: true
      , version: '1.0'
      , mobile: true
      , x: true
      }
    }
  , Android: {
      'Mozilla/5.0 (Linux; U; Android 2.3.4; en-us; T-Mobile G2 Build/GRJ22) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1': {
        android: true
      , osversion: '2.3.4'
      , webkit: true
      , version: 4.0
      , mobile: true
      , x: true
      }
    , 'Mozilla/5.0 (Linux; U; Android 1.6; ar-us; SonyEricssonX10i Build/R2BA026) AppleWebKit/528.5+ (KHTML, like Gecko) Version/3.1.2 Mobile Safari/525.20.1': {
        android: true
      , osversion: '1.6'
      , webkit: true
      , version: 3.1
      , mobile: true
      , x: true
      }
    }
  , TouchPad: {
      'Mozilla/5.0 (hp-tabled;Linux;hpwOS/3.0.5; U; en-US)) AppleWebKit/534.6 (KHTML, like Gecko) wOSBrowser/234.83 Safari/534.6 TouchPad/1.0': {
        touchpad: true
      , version: '1.0'
      , webkit: true
      , x: true
      }
    }
  , PhantomJS: {
      'Mozilla/5.0 (Macintosh; Intel Mac OS X) AppleWebKit/534.34 (KHTML, like Gecko) PhantomJS/1.5.0 Safari/534.34': {
        phantom: true
      , webkit: true
      , version: '1.5'
      , x: true
      }
    }
};