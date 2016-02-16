require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _version = require('./version');

var _version2 = _interopRequireDefault(_version);

var _os = require('./os');

var _os2 = _interopRequireDefault(_os);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ua = window.navigator.userAgent;
var aliapp = false;

var windvane;
var matched;
var appname = '';
var platform = '';
var version = '';

if (matched = ua.match(/WindVane[\/\s]([\d\.\_]+)/i)) {
    windvane = matched[1];
}

if (matched = ua.match(/AliApp\(([A-Z\-]+)\/([\d\.]+)\)/i)) {
    aliapp = true;
    appname = matched[1];
    version = matched[2];
    /* istanbul ignore next */
    if (appname.indexOf('-PD') > 0) {
        /* istanbul ignore if */
        if (_os2.default.isIOS) {
            platform = 'iPad';
        } else if (_os2.default.isAndroid) {
            platform = 'AndroidPad';
        } else {
            platform = _os2.default.name;
        }
    } else {
        platform = _os2.default.name;
    }
}

// 兼容手淘的一个bug，在webview初始化异常时，在ua中只包含TBIOS字样，也认为是手淘webview。
/* istanbul ignore if */
if (!appname && ua.indexOf('TBIOS') > 0) {
    appname = 'TB';
}

// 判断poplayer
// poplayer相关信息，在poplayer会有该字段，形如 window._ua_popLayer = 'PopLayer/1.3.4'
// poplayer信息不在ua中是因为在IOS下，修改poplayer层的ua会导致所有webview的ua改变，所以只能写在全局变量中
var poplayerInfo = window._ua_popLayer || '';
var poplayer = false;
var poplayerVersion = '';
if (poplayerInfo && (matched = poplayerInfo.match(/PopLayer\/([\d\.]+)/i))) {
    poplayer = true;
    poplayerVersion = matched[1];
}

if (aliapp) {
    aliapp = {
        windvane: new _version2.default(windvane || '0.0.0'),
        appname: appname || 'unkown',
        version: new _version2.default(version || '0.0.0'),
        platform: platform || _os2.default.name,
        poplayer: poplayer || false,
        poplayerVersion: new _version2.default(poplayerVersion || '0.0.0')
    };
}

exports.default = aliapp;

},{"./os":3,"./version":6}],2:[function(require,module,exports){
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

},{"./version":6}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _version = require('./version');

var _version2 = _interopRequireDefault(_version);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ua = window.navigator.userAgent;
var os;
var matched;

if (matched = ua.match(/Windows\sPhone\s(?:OS\s)?([\d\.]+)/)) {
    os = {
        name: 'Windows Phone',
        isWindowsPhone: true,
        version: new _version2.default(matched[1])
    };
} else if (!!ua.match(/Safari/) && (matched = ua.match(/Android[\s\/]([\d\.]+)/))) {
    os = {
        version: new _version2.default(matched[1])
    };

    if (ua.match(/Mobile\s+Safari/)) {
        os.name = 'Android';
        os.isAndroid = true;
    } else {
        os.name = 'AndroidPad';
        os.isAndroidPad = true;
    }
} else if (matched = ua.match(/(iPhone|iPad|iPod)/)) {
    var name = matched[1];

    if (matched = ua.match(/OS ([\d_\.]+) like Mac OS X/)) {
        os = {
            name: name,
            isIPhone: name === 'iPhone' || name === 'iPod',
            isIPad: name === 'iPad',
            isIOS: true,
            version: new _version2.default(matched[1].split('_').join('.'))
        };
    }
}

if (!os) {
    os = {
        name: 'unknown',
        version: new _version2.default('0.0.0')
    };
}

exports.default = os;

},{"./version":6}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var params = {};
var search = window.location.search.replace(/^\?/, '');

if (search) {
    var splits = search.split('&');
    for (var i = 0; i < splits.length; i++) {
        splits[i] = splits[i].split('=');
        try {
            params[splits[i][0]] = decodeURIComponent(splits[i][1]);
            /* istanbul ignore next */
        } catch (e) {
            /* istanbul ignore next */
            params[splits[i][0]] = splits[i][1];
        }
    }
}

exports.default = params;

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var ua = window.navigator.userAgent;

var thirdapp;

if (ua.match(/Weibo/i)) {
    /**
     * @type {Object}
     * @memberof lib.env
     * @property {String} appname - 操作系统名称，比如Weibo/Weixin/unknown等
     * @property {Boolean} isWeibo - 是否是微博
     * @property {Boolean} isWeixin - 是否是微信
     */
    thirdapp = {
        appname: 'Weibo',
        isWeibo: true
    };
} else if (ua.match(/MicroMessenger/i)) {
    thirdapp = {
        appname: 'Weixin',
        isWeixin: true
    };
    /* istanbul ignore next */
} else {
        /* istanbul ignore next */
        thirdapp = false;
    }

exports.default = thirdapp;

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Version = function () {
    _createClass(Version, null, [{
        key: 'compare',
        value: function compare(v1, v2) {
            v1 = v1.toString().split('.');
            v2 = v2.toString().split('.');

            for (var i = 0; i < v1.length || i < v2.length; i++) {
                var n1 = parseInt(v1[i], 10);
                var n2 = parseInt(v2[i], 10);

                /* istanbul ignore if */
                if (isNaN(n1)) {
                    n1 = 0;
                }

                /* istanbul ignore if */
                if (isNaN(n2)) {
                    n2 = 0;
                }
                if (n1 < n2) {
                    return -1;
                } else if (n1 > n2) {
                    return 1;
                }
            }
            return 0;
        }
    }]);

    function Version(v) {
        _classCallCheck(this, Version);

        if (v) {
            this.val = v.toString();
        } else {
            this.val = '';
        }
    }

    _createClass(Version, [{
        key: 'gt',
        value: function gt(v) {
            return Version.compare(this, v) > 0;
        }
    }, {
        key: 'gte',
        value: function gte(v) {
            return Version.compare(this, v) >= 0;
        }
    }, {
        key: 'lt',
        value: function lt(v) {
            return Version.compare(this, v) < 0;
        }
    }, {
        key: 'lte',
        value: function lte(v) {
            return Version.compare(this, v) <= 0;
        }
    }, {
        key: 'eq',
        value: function eq(v) {
            return Version.compare(this, v) === 0;
        }
    }, {
        key: 'toString',
        value: function toString() {
            return this.val.toString();
        }
    }]);

    return Version;
}();

exports.default = Version;

},{}],"amfe-env":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Version = exports.params = exports.thirdapp = exports.aliapp = exports.os = exports.browser = undefined;

var _aliapp = require('./aliapp');

var _aliapp2 = _interopRequireDefault(_aliapp);

var _browser = require('./browser');

var _browser2 = _interopRequireDefault(_browser);

var _os = require('./os');

var _os2 = _interopRequireDefault(_os);

var _thirdapp = require('./thirdapp');

var _thirdapp2 = _interopRequireDefault(_thirdapp);

var _params = require('./params');

var _params2 = _interopRequireDefault(_params);

var _version = require('./version');

var _version2 = _interopRequireDefault(_version);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.browser = _browser2.default;
exports.os = _os2.default;
exports.aliapp = _aliapp2.default;
exports.thirdapp = _thirdapp2.default;
exports.params = _params2.default;
exports.Version = _version2.default;

},{"./aliapp":1,"./browser":2,"./os":3,"./params":4,"./thirdapp":5,"./version":6}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYWxpYXBwLmpzIiwic3JjL2Jyb3dzZXIuanMiLCJzcmMvb3MuanMiLCJzcmMvcGFyYW1zLmpzIiwic3JjL3RoaXJkYXBwLmpzIiwic3JjL3ZlcnNpb24uanMiLCJzcmMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDR0EsSUFBTSxLQUFLLE9BQU8sU0FBUCxDQUFpQixTQUFqQjtBQUNYLElBQUksU0FBUyxLQUFUOztBQUVKLElBQUksUUFBSjtBQUNBLElBQUksT0FBSjtBQUNBLElBQUksVUFBVSxFQUFWO0FBQ0osSUFBSSxXQUFXLEVBQVg7QUFDSixJQUFJLFVBQVUsRUFBVjs7QUFFSixJQUFLLFVBQVUsR0FBRyxLQUFILENBQVMsNEJBQVQsQ0FBVixFQUFtRDtBQUNwRCxlQUFXLFFBQVEsQ0FBUixDQUFYLENBRG9EO0NBQXhEOztBQUlBLElBQUssVUFBVSxHQUFHLEtBQUgsQ0FBUyxrQ0FBVCxDQUFWLEVBQXlEO0FBQzFELGFBQVMsSUFBVCxDQUQwRDtBQUUxRCxjQUFVLFFBQVEsQ0FBUixDQUFWLENBRjBEO0FBRzFELGNBQVUsUUFBUSxDQUFSLENBQVY7O0FBSDBELFFBS3RELFFBQVEsT0FBUixDQUFnQixLQUFoQixJQUF5QixDQUF6QixFQUE0Qjs7QUFFNUIsWUFBSSxhQUFHLEtBQUgsRUFBVTtBQUNWLHVCQUFXLE1BQVgsQ0FEVTtTQUFkLE1BRU8sSUFBSSxhQUFHLFNBQUgsRUFBYztBQUNyQix1QkFBVyxZQUFYLENBRHFCO1NBQWxCLE1BRUE7QUFDSCx1QkFBVyxhQUFHLElBQUgsQ0FEUjtTQUZBO0tBSlgsTUFTTztBQUNILG1CQUFXLGFBQUcsSUFBSCxDQURSO0tBVFA7Q0FMSjs7OztBQXFCQSxJQUFJLENBQUMsT0FBRCxJQUFZLEdBQUcsT0FBSCxDQUFXLE9BQVgsSUFB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bUJBQU8sS0FBSyxHQUFMLENBQVMsUUFBVCxFQUFQLENBRFE7Ozs7V0F4REs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQ1FqQjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IFZlcnNpb24gZnJvbSAnLi92ZXJzaW9uJztcbmltcG9ydCBvcyBmcm9tICcuL29zJztcblxuY29uc3QgdWEgPSB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudDtcbnZhciBhbGlhcHAgPSBmYWxzZTtcblxudmFyIHdpbmR2YW5lO1xudmFyIG1hdGNoZWQ7XG52YXIgYXBwbmFtZSA9ICcnO1xudmFyIHBsYXRmb3JtID0gJyc7XG52YXIgdmVyc2lvbiA9ICcnO1xuXG5pZiAoKG1hdGNoZWQgPSB1YS5tYXRjaCgvV2luZFZhbmVbXFwvXFxzXShbXFxkXFwuXFxfXSspL2kpKSkge1xuICAgIHdpbmR2YW5lID0gbWF0Y2hlZFsxXTtcbn1cblxuaWYgKChtYXRjaGVkID0gdWEubWF0Y2goL0FsaUFwcFxcKChbQS1aXFwtXSspXFwvKFtcXGRcXC5dKylcXCkvaSkpKSB7XG4gICAgYWxpYXBwID0gdHJ1ZTtcbiAgICBhcHBuYW1lID0gbWF0Y2hlZFsxXTtcbiAgICB2ZXJzaW9uID0gbWF0Y2hlZFsyXTtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIGlmIChhcHBuYW1lLmluZGV4T2YoJy1QRCcpID4gMCkge1xuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgaWYgKG9zLmlzSU9TKSB7XG4gICAgICAgICAgICBwbGF0Zm9ybSA9ICdpUGFkJztcbiAgICAgICAgfSBlbHNlIGlmIChvcy5pc0FuZHJvaWQpIHtcbiAgICAgICAgICAgIHBsYXRmb3JtID0gJ0FuZHJvaWRQYWQnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGxhdGZvcm0gPSBvcy5uYW1lO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcGxhdGZvcm0gPSBvcy5uYW1lO1xuICAgIH1cbn1cblxuLy8g5YW85a655omL5reY55qE5LiA5LiqYnVn77yM5Zyod2Vidmlld+WIneWni+WMluW8guW4uOaXtu+8jOWcqHVh5Lit5Y+q5YyF5ZCrVEJJT1PlrZfmoLfvvIzkuZ/orqTkuLrmmK/miYvmt5h3ZWJ2aWV344CCXG4vKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbmlmICghYXBwbmFtZSAmJiB1YS5pbmRleE9mKCdUQklPUycpID4gMCkge1xuICAgIGFwcG5hbWUgPSAnVEInO1xufVxuXG4vLyDliKTmlq1wb3BsYXllclxuLy8gcG9wbGF5ZXLnm7jlhbPkv6Hmga/vvIzlnKhwb3BsYXllcuS8muacieivpeWtl+aute+8jOW9ouWmgiB3aW5kb3cuX3VhX3BvcExheWVyID0gJ1BvcExheWVyLzEuMy40J1xuLy8gcG9wbGF5ZXLkv6Hmga/kuI3lnKh1YeS4reaYr+WboOS4uuWcqElPU+S4i++8jOS/ruaUuXBvcGxheWVy5bGC55qEdWHkvJrlr7zoh7TmiYDmnIl3ZWJ2aWV355qEdWHmlLnlj5jvvIzmiYDku6Xlj6rog73lhpnlnKjlhajlsYDlj5jph4/kuK1cbnZhciBwb3BsYXllckluZm8gPSB3aW5kb3cuX3VhX3BvcExheWVyIHx8ICcnO1xudmFyIHBvcGxheWVyID0gZmFsc2U7XG52YXIgcG9wbGF5ZXJWZXJzaW9uID0gJyc7XG5pZiAocG9wbGF5ZXJJbmZvICYmIChtYXRjaGVkID0gcG9wbGF5ZXJJbmZvLm1hdGNoKC9Qb3BMYXllclxcLyhbXFxkXFwuXSspL2kpKSkge1xuICAgIHBvcGxheWVyID0gdHJ1ZTtcbiAgICBwb3BsYXllclZlcnNpb24gPSBtYXRjaGVkWzFdO1xufVxuXG5pZiAoYWxpYXBwKSB7XG4gICAgYWxpYXBwID0ge1xuICAgICAgICB3aW5kdmFuZTogbmV3IFZlcnNpb24od2luZHZhbmUgfHwgJzAuMC4wJyksXG4gICAgICAgIGFwcG5hbWU6IGFwcG5hbWUgfHwgJ3Vua293bicsXG4gICAgICAgIHZlcnNpb246IG5ldyBWZXJzaW9uKHZlcnNpb24gfHwgJzAuMC4wJyksXG4gICAgICAgIHBsYXRmb3JtOiBwbGF0Zm9ybSB8fCBvcy5uYW1lLFxuICAgICAgICBwb3BsYXllcjogcG9wbGF5ZXIgfHwgZmFsc2UsXG4gICAgICAgIHBvcGxheWVyVmVyc2lvbjogbmV3IFZlcnNpb24ocG9wbGF5ZXJWZXJzaW9uIHx8ICcwLjAuMCcpXG4gICAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYWxpYXBwO1xuXG4iLCJpbXBvcnQgVmVyc2lvbiBmcm9tICcuL3ZlcnNpb24nO1xuXG5jb25zdCB1YSA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50O1xudmFyIGJyb3dzZXI7XG52YXIgbWF0Y2hlZDtcblxuaWYoKG1hdGNoZWQgPSB1YS5tYXRjaCgvKD86VUNXRUJ8VUNCcm93c2VyXFwvKShbXFxkXFwuXSspLykpKSB7XG4gICAgYnJvd3NlciA9IHtcbiAgICAgICAgbmFtZTogJ1VDJyxcbiAgICAgICAgaXNVQzogdHJ1ZSxcbiAgICAgICAgdmVyc2lvbjogbmV3IFZlcnNpb24obWF0Y2hlZFsxXSlcbiAgICB9O1xufSBlbHNlIGlmKChtYXRjaGVkID0gdWEubWF0Y2goL01RUUJyb3dzZXJcXC8oW1xcZFxcLl0rKS8pKSkge1xuICAgIGJyb3dzZXIgPSB7XG4gICAgICAgIG5hbWU6ICdRUScsXG4gICAgICAgIGlzUVE6IHRydWUsXG4gICAgICAgIHZlcnNpb246IG5ldyBWZXJzaW9uKG1hdGNoZWRbMV0pXG4gICAgfTtcbn0gZWxzZSBpZiAoKG1hdGNoZWQgPSB1YS5tYXRjaCgvKD86RmlyZWZveHxGeGlPUylcXC8oW1xcZFxcLl0rKS8pKSkge1xuICAgIGJyb3dzZXIgPSB7XG4gICAgICAgIG5hbWU6ICdGaXJlZm94JyxcbiAgICAgICAgaXNGaXJlZm94OiB0cnVlLFxuICAgICAgICB2ZXJzaW9uOiBuZXcgVmVyc2lvbihtYXRjaGVkWzFdKVxuICAgIH07XG59IGVsc2UgaWYgKChtYXRjaGVkID0gdWEubWF0Y2goL01TSUVcXHMoW1xcZFxcLl0rKS8pKSB8fFxuICAgICAgICAgICAgICAgIChtYXRjaGVkID0gdWEubWF0Y2goL0lFTW9iaWxlXFwvKFtcXGRcXC5dKykvKSkpIHtcblxuICAgIGJyb3dzZXIgPSB7XG4gICAgICAgIHZlcnNpb246IG5ldyBWZXJzaW9uKG1hdGNoZWRbMV0pXG4gICAgfTtcblxuICAgIGlmICh1YS5tYXRjaCgvSUVNb2JpbGUvKSkge1xuICAgICAgICBicm93c2VyLm5hbWUgPSAnSUVNb2JpbGUnO1xuICAgICAgICBicm93c2VyLmlzSUVNb2JpbGUgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGJyb3dzZXIubmFtZSA9ICdJRSc7XG4gICAgICAgIGJyb3dzZXIuaXNJRSA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHVhLm1hdGNoKC9BbmRyb2lkfGlQaG9uZS8pKSB7XG4gICAgICAgIGJyb3dzZXIuaXNJRUxpa2VXZWJraXQgPSB0cnVlO1xuICAgIH1cbn0gZWxzZSBpZigobWF0Y2hlZCA9IHVhLm1hdGNoKC8oPzpDaHJvbWV8Q3JpT1MpXFwvKFtcXGRcXC5dKykvKSkpIHtcbiAgICBicm93c2VyID0ge1xuICAgICAgICBuYW1lOiAnQ2hyb21lJyxcbiAgICAgICAgaXNDaHJvbWU6IHRydWUsXG4gICAgICAgIHZlcnNpb246IG5ldyBWZXJzaW9uKG1hdGNoZWRbMV0pXG4gICAgfTtcblxuICAgIGlmICh1YS5tYXRjaCgvVmVyc2lvblxcL1tcXGQrXFwuXStcXHMqQ2hyb21lLykpIHtcbiAgICAgICAgYnJvd3Nlci5uYW1lID0gJ0Nocm9tZSBXZWJ2aWV3JztcbiAgICAgICAgYnJvd3Nlci5pc1dlYnZpZXcgPSB0cnVlO1xuICAgIH1cbn0gZWxzZSBpZighIXVhLm1hdGNoKC9TYWZhcmkvKSAmJiAobWF0Y2hlZCA9IHVhLm1hdGNoKC9BbmRyb2lkW1xcc1xcL10oW1xcZFxcLl0rKS8pKSkge1xuICAgIGJyb3dzZXIgPSB7XG4gICAgICAgIG5hbWU6ICdBbmRyb2lkJyxcbiAgICAgICAgaXNBbmRyb2lkOiB0cnVlLFxuICAgICAgICB2ZXJzaW9uOiBuZXcgVmVyc2lvbihtYXRjaGVkWzFdKVxuICAgIH07XG59IGVsc2UgaWYodWEubWF0Y2goL2lQaG9uZXxpUGFkfGlQb2QvKSkge1xuICAgIGlmKHVhLm1hdGNoKC9TYWZhcmkvKSAmJiAobWF0Y2hlZCA9IHVhLm1hdGNoKC9WZXJzaW9uXFwvKFtcXGRcXC5dKykvKSkpIHtcbiAgICAgICAgYnJvd3NlciA9IHtcbiAgICAgICAgICAgIG5hbWU6ICdTYWZhcmknLFxuICAgICAgICAgICAgaXNTYWZhcmk6IHRydWUsXG4gICAgICAgICAgICB2ZXJzaW9uOiBuZXcgVmVyc2lvbihtYXRjaGVkWzFdKVxuICAgICAgICB9O1xuICAgIH0gZWxzZSBpZiAoKG1hdGNoZWQgPSB1YS5tYXRjaCgvT1MgKFtcXGRfXFwuXSspIGxpa2UgTWFjIE9TIFgvKSkpIHtcbiAgICAgICAgYnJvd3NlciA9IHtcbiAgICAgICAgICAgIG5hbWU6ICdpT1MgV2VidmlldycsXG4gICAgICAgICAgICBpc1dlYnZpZXc6IHRydWUsXG4gICAgICAgICAgICB2ZXJzaW9uOiBuZXcgVmVyc2lvbihtYXRjaGVkWzFdLnJlcGxhY2UoL1xcXy9nLCAnLicpKVxuICAgICAgICB9O1xuICAgIH1cbn1cblxuLyogaXN0YW5idWwgaWdub3JlIGlmICovXG5pZiAoIWJyb3dzZXIpIHtcbiAgICBicm93c2VyID0ge1xuICAgICAgICBuYW1lOiAndW5rbm93bicsXG4gICAgICAgIHZlcnNpb246IG5ldyBWZXJzaW9uKCcwLjAuMCcpXG4gICAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYnJvd3NlcjsiLCJpbXBvcnQgVmVyc2lvbiBmcm9tICcuL3ZlcnNpb24nO1xuXG5jb25zdCB1YSA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50O1xudmFyIG9zO1xudmFyIG1hdGNoZWQ7XG5cbmlmICgobWF0Y2hlZCA9IHVhLm1hdGNoKC9XaW5kb3dzXFxzUGhvbmVcXHMoPzpPU1xccyk/KFtcXGRcXC5dKykvKSkpIHtcbiAgICBvcyA9IHtcbiAgICAgICAgbmFtZTogJ1dpbmRvd3MgUGhvbmUnLFxuICAgICAgICBpc1dpbmRvd3NQaG9uZTogdHJ1ZSxcbiAgICAgICAgdmVyc2lvbjogbmV3IFZlcnNpb24obWF0Y2hlZFsxXSlcbiAgICB9O1xufSBlbHNlIGlmKCEhdWEubWF0Y2goL1NhZmFyaS8pICYmIChtYXRjaGVkID0gdWEubWF0Y2goL0FuZHJvaWRbXFxzXFwvXShbXFxkXFwuXSspLykpKSB7XG4gICAgb3MgPSB7XG4gICAgICAgIHZlcnNpb246IG5ldyBWZXJzaW9uKG1hdGNoZWRbMV0pXG4gICAgfTtcblxuICAgIGlmICh1YS5tYXRjaCgvTW9iaWxlXFxzK1NhZmFyaS8pKSB7XG4gICAgICAgIG9zLm5hbWUgPSAnQW5kcm9pZCc7XG4gICAgICAgIG9zLmlzQW5kcm9pZCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgb3MubmFtZSA9ICdBbmRyb2lkUGFkJztcbiAgICAgICAgb3MuaXNBbmRyb2lkUGFkID0gdHJ1ZTtcbiAgICB9XG59IGVsc2UgaWYoKG1hdGNoZWQgPSB1YS5tYXRjaCgvKGlQaG9uZXxpUGFkfGlQb2QpLykpKSB7XG4gICAgdmFyIG5hbWUgPSBtYXRjaGVkWzFdO1xuXG4gICAgaWYgKChtYXRjaGVkID0gdWEubWF0Y2goL09TIChbXFxkX1xcLl0rKSBsaWtlIE1hYyBPUyBYLykpKSB7XG4gICAgICAgIG9zID0ge1xuICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgIGlzSVBob25lOiAobmFtZSA9PT0gJ2lQaG9uZScgfHwgbmFtZSA9PT0gJ2lQb2QnKSxcbiAgICAgICAgICAgIGlzSVBhZDogbmFtZSA9PT0gJ2lQYWQnLFxuICAgICAgICAgICAgaXNJT1M6IHRydWUsXG4gICAgICAgICAgICB2ZXJzaW9uOiBuZXcgVmVyc2lvbihtYXRjaGVkWzFdLnNwbGl0KCdfJykuam9pbignLicpKVxuICAgICAgICB9O1xuICAgIH1cbn1cblxuaWYgKCFvcykge1xuICAgIG9zID0ge1xuICAgICAgICBuYW1lOiAndW5rbm93bicsXG4gICAgICAgIHZlcnNpb246IG5ldyBWZXJzaW9uKCcwLjAuMCcpXG4gICAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgb3M7IiwidmFyIHBhcmFtcyA9IHt9O1xuY29uc3Qgc2VhcmNoID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaC5yZXBsYWNlKC9eXFw/LywgJycpO1xuXG5pZiAoc2VhcmNoKSB7XG4gICAgbGV0IHNwbGl0cyA9IHNlYXJjaC5zcGxpdCgnJicpO1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzcGxpdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgc3BsaXRzW2ldID0gc3BsaXRzW2ldLnNwbGl0KCc9Jyk7XG4gICAgICAgIHRyeXtcbiAgICAgICAgICAgIHBhcmFtc1tzcGxpdHNbaV1bMF1dID0gZGVjb2RlVVJJQ29tcG9uZW50KHNwbGl0c1tpXVsxXSk7XG4gICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgICAgICBwYXJhbXNbc3BsaXRzW2ldWzBdXSA9IHNwbGl0c1tpXVsxXTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgcGFyYW1zO1xuIiwiY29uc3QgdWEgPSB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudDtcblxudmFyIHRoaXJkYXBwO1xuXG5pZiAodWEubWF0Y2goL1dlaWJvL2kpKSB7XG4gICAgLyoqXG4gICAgICogQHR5cGUge09iamVjdH1cbiAgICAgKiBAbWVtYmVyb2YgbGliLmVudlxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBhcHBuYW1lIC0g5pON5L2c57O757uf5ZCN56ew77yM5q+U5aaCV2VpYm8vV2VpeGluL3Vua25vd27nrYlcbiAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IGlzV2VpYm8gLSDmmK/lkKbmmK/lvq7ljZpcbiAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IGlzV2VpeGluIC0g5piv5ZCm5piv5b6u5L+hXG4gICAgICovXG4gICAgdGhpcmRhcHAgPSB7XG4gICAgICAgIGFwcG5hbWU6ICdXZWlibycsXG4gICAgICAgIGlzV2VpYm86IHRydWVcbiAgICB9O1xufSBlbHNlIGlmKHVhLm1hdGNoKC9NaWNyb01lc3Nlbmdlci9pKSkge1xuICAgIHRoaXJkYXBwID0ge1xuICAgICAgICBhcHBuYW1lOiAnV2VpeGluJyxcbiAgICAgICAgaXNXZWl4aW46IHRydWVcbiAgICB9O1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG59IGVsc2Uge1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgdGhpcmRhcHAgPSBmYWxzZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdGhpcmRhcHA7XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBWZXJzaW9uIHtcbiAgICBzdGF0aWMgY29tcGFyZSAodjEsIHYyKXtcbiAgICAgICAgdjEgPSB2MS50b1N0cmluZygpLnNwbGl0KCcuJyk7XG4gICAgICAgIHYyID0gdjIudG9TdHJpbmcoKS5zcGxpdCgnLicpO1xuXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCB2MS5sZW5ndGggfHwgaSA8IHYyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgbjEgPSBwYXJzZUludCh2MVtpXSwgMTApO1xuICAgICAgICAgICAgdmFyIG4yID0gcGFyc2VJbnQodjJbaV0sIDEwKTtcblxuICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgICAgICBpZihpc05hTihuMSkpIHtcbiAgICAgICAgICAgICAgICBuMSA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICAgICAgaWYoaXNOYU4objIpKSB7XG4gICAgICAgICAgICAgICAgbjIgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoIG4xIDwgbjIgKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiggbjEgPiBuMikge1xuICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yICh2KSB7XG4gICAgICAgIGlmICh2KSB7XG4gICAgICAgICAgICB0aGlzLnZhbCA9IHYudG9TdHJpbmcoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudmFsID0gJyc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBndCAodikge1xuICAgICAgICByZXR1cm4gVmVyc2lvbi5jb21wYXJlKHRoaXMsIHYpID4gMDtcbiAgICB9XG5cbiAgICBndGUgKHYpIHtcbiAgICAgICAgcmV0dXJuIFZlcnNpb24uY29tcGFyZSh0aGlzLCB2KSA+PSAwO1xuICAgIH1cblxuICAgIGx0ICh2KSB7XG4gICAgICAgIHJldHVybiBWZXJzaW9uLmNvbXBhcmUodGhpcywgdikgPCAwO1xuICAgIH1cblxuICAgIGx0ZSAodikge1xuICAgICAgICByZXR1cm4gVmVyc2lvbi5jb21wYXJlKHRoaXMsIHYpIDw9IDA7XG4gICAgfVxuXG4gICAgZXEgKHYpIHtcbiAgICAgICAgcmV0dXJuIFZlcnNpb24uY29tcGFyZSh0aGlzLCB2KSA9PT0gMDtcbiAgICB9XG5cbiAgICB0b1N0cmluZyAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbC50b1N0cmluZygpO1xuICAgIH1cbn1cbiIsImltcG9ydCBhbGlhcHAgZnJvbSAnLi9hbGlhcHAnO1xuaW1wb3J0IGJyb3dzZXIgZnJvbSAnLi9icm93c2VyJztcbmltcG9ydCBvcyBmcm9tICcuL29zJztcbmltcG9ydCB0aGlyZGFwcCBmcm9tICcuL3RoaXJkYXBwJztcbmltcG9ydCBwYXJhbXMgZnJvbSAnLi9wYXJhbXMnO1xuaW1wb3J0IFZlcnNpb24gZnJvbSAnLi92ZXJzaW9uJztcblxuZXhwb3J0IHtcbiAgICBicm93c2VyLFxuICAgIG9zLFxuICAgIGFsaWFwcCxcbiAgICB0aGlyZGFwcCxcbiAgICBwYXJhbXMsXG4gICAgVmVyc2lvblxufTsiXX0=
