'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _version = require('./version');

var _version2 = _interopRequireDefault(_version);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ua = window.navigator.userAgent;
var browser;
var matched;

if (matched = ua.match(/(?:UCWEB|UCBrowser\/)([\d\.]+)/)) {
    browser = {
        name: 'UC',
        isUC: true,
        version: new _version2.default(matched[1])
    };
} else if (matched = ua.match(/MQQBrowser\/([\d\.]+)/)) {
    browser = {
        name: 'QQ',
        isQQ: true,
        version: new _version2.default(matched[1])
    };
} else if (matched = ua.match(/(?:Firefox|FxiOS)\/([\d\.]+)/)) {
    browser = {
        name: 'Firefox',
        isFirefox: true,
        version: new _version2.default(matched[1])
    };
} else if ((matched = ua.match(/MSIE\s([\d\.]+)/)) || (matched = ua.match(/IEMobile\/([\d\.]+)/))) {

    browser = {
        version: new _version2.default(matched[1])
    };

    if (ua.match(/IEMobile/)) {
        browser.name = 'IEMobile';
        browser.isIEMobile = true;
    } else {
        browser.name = 'IE';
        browser.isIE = true;
    }

    if (ua.match(/Android|iPhone/)) {
        browser.isIELikeWebkit = true;
    }
} else if (matched = ua.match(/(?:Chrome|CriOS)\/([\d\.]+)/)) {
    browser = {
        name: 'Chrome',
        isChrome: true,
        version: new _version2.default(matched[1])
    };

    if (ua.match(/Version\/[\d+\.]+\s*Chrome/)) {
        browser.name = 'Chrome Webview';
        browser.isWebview = true;
    }
} else if (!!ua.match(/Safari/) && (matched = ua.match(/Android[\s\/]([\d\.]+)/))) {
    browser = {
        name: 'Android',
        isAndroid: true,
        version: new _version2.default(matched[1])
    };
} else if (ua.match(/iPhone|iPad|iPod/)) {
    if (ua.match(/Safari/) && (matched = ua.match(/Version\/([\d\.]+)/))) {
        browser = {
            name: 'Safari',
            isSafari: true,
            version: new _version2.default(matched[1])
        };
    } else if (matched = ua.match(/OS ([\d_\.]+) like Mac OS X/)) {
        browser = {
            name: 'iOS Webview',
            isWebview: true,
            version: new _version2.default(matched[1].replace(/\_/g, '.'))
        };
    }
}

/* istanbul ignore if */
if (!browser) {
    browser = {
        name: 'unknown',
        version: new _version2.default('0.0.0')
    };
}

exports.default = browser;