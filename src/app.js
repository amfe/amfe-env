;
(function(window, lib) {
    lib.env = lib.env || {};
    
    var ttid = lib.env.param['ttid'];
    var ua = window.navigator.userAgent;
    var ttidReg = /@taobao_(iphone|android|ipad)_([\d\.]+)/;
    var wvMatched = ua.match(/WindVane[\/\s]([\d\.\_]+)/);
    var uaMatched = ua.match(ttidReg);
    var ttidMatched = ttid && ttid.match(ttidReg);
    var wvVersion;
    var appVersion;
    var platform = lib.os.name;
    var app;

    if (wvMatched && wvMatched[1]) {
        wvVersion = wvMatched[1];
    }

    if (uaMatched && uaMatched[1]) {
        platform = uaMatched[1];
    } else if (ttidMatched && ttidMatched[1]) {
        platform = ttidMatched[1];
    }

    if (uaMatched && uaMatched[2]) {
        appVersion = uaMatched[2];
    } else if (ttidMatched && ttidMatched[2]) {
        appVersion = ttidMatched[2];
    } else {
        if (lib.os.isAndroid) {
            if (['2.5.1', '2.5.2', '2.5.3', '2.5.4', '2.5.5'].indexOf(wvVersion) > -1) {
                appVersion = '3.9.2';
            } else if (wvVersion === '2.5.6') {
                appVersion = '3.9.3';
            } else if (wvVersion === '2.6.0') {
                appVersion = '3.9.5';
            }
        } else if (lib.os.isIOS) {
            if (parseFloat(wvVersion) >= 2.5 && parseFloat(wvVersion) < 2.6) {
                appVersion = '3.4.0';
            } else if (wvVersion === '2.6.0') {
                appVersion = '3.4.5';
            }
        }
    }

    if (appVersion) {
        app = lib.env.taobaoApp = {
            version: appVersion,
            windvine: wvVersion,
            platform: platform
        }
    }

    if (lib.version && app) {
        app.version = lib.version(app.version);
        app.windvine = lib.version(app.windvine);
    }

})(window, window['lib'] || (window['lib'] = {}));