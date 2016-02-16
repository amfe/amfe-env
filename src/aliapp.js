import Version from './version';
import os from './os';

const ua = window.navigator.userAgent;
var aliapp = false;

var windvane;
var matched;
var appname = '';
var platform = '';
var version = '';

if ((matched = ua.match(/WindVane[\/\s]([\d\.\_]+)/i))) {
    windvane = matched[1];
}

if ((matched = ua.match(/AliApp\(([A-Z\-]+)\/([\d\.]+)\)/i))) {
    aliapp = true;
    appname = matched[1];
    version = matched[2];
    /* istanbul ignore next */
    if (appname.indexOf('-PD') > 0) {
        /* istanbul ignore if */
        if (os.isIOS) {
            platform = 'iPad';
        } else if (os.isAndroid) {
            platform = 'AndroidPad';
        } else {
            platform = os.name;
        }
    } else {
        platform = os.name;
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
        windvane: new Version(windvane || '0.0.0'),
        appname: appname || 'unkown',
        version: new Version(version || '0.0.0'),
        platform: platform || os.name,
        poplayer: poplayer || false,
        poplayerVersion: new Version(poplayerVersion || '0.0.0')
    };
}

export default aliapp;

