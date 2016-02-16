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