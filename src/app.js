//@require version
//@require params
//@require os

;
(function(window, lib) {
    lib.env = lib.env || {};
    
    var ttid = lib.env.params['ttid'];
    var ua = window.navigator.userAgent;

    var windvane;
    var matched;
    if ((matched = ua.match(/WindVane[\/\s]([\d\.\_]+)/))) {
        windvane = matched[1];
    }

    var aliapp = false;
    var appname = '';
    var platform = '';
    var version = '';
    if ((matched = ua.match(/AliApp\(([A-Z\-]+)\/([\d\.]+)\)/))) {
        aliapp = true;
        appname = matched[1];
        version = matched[2];
        if (appname.indexOf('-PD') > 0) {
            if (lib.env.os.isIOS) {
                platform = 'iPad';
            } else if (lib.env.os.isAndroid) {
                platform = 'aPad';
            } else {
                platform = lib.env.os.name;
            }
        } else {
            platform = lib.env.os.name;
        }
    } else if ((matched = ua.match(/@([^_@]+)_(iphone|android|ipad|apad)_([\d\.]+)/))) {
        aliapp = true;
        appname = matched[1];
        platform = matched[2].replace(/^ip/, 'iP').replace(/^a/, 'A');
        version = matched[3];
    } else if (ttid && (matched = ttid.match(/@([^_@]+)_(iphone|android|ipad|apad)_([\d\.]+)/))) {
        aliapp = true;
        appname = matched[1];
        platform = matched[2].replace(/^ip/, 'iP').replace(/^a/, 'A');
        version = matched[3];
    } else if (windvane) {
        aliapp = true;
        platform = lib.env.os.name;

        var wvver = lib.version(windvane);
        if (lib.env.os.isAndroid) {
            if (wvver.gte('2.5.1') && wvver.lte('2.5.5')) {
                appname = 'taobao';
                version = '3.9.2';
            } else if (wvver.eq('2.5.6')) {
                appname = 'taobao';
                version = '3.9.3';
            } else if (wvver.eq('2.6.0')) {
                appname = 'taobao';
                version = '3.9.5';
            }
        } else if (lib.env.os.isIOS) {
            if (wvver.gte('2.5.0') && wvver.lt('2.6.0')) {
                appname = 'taobao';
                version = '3.4.0';
            } else if (wvver.eq('2.6.0')) {
                appname = 'taobao';
                version = '3.4.5';
            }
        }
    }

    if (!appname && ua.indexOf('TBIOS') > 0) {
        appname = 'TB';
    }

    if (aliapp) {
        lib.env.aliapp = {
            windvane: lib.version(windvane || '0.0.0'),
            appname: (appname === 'taobao'?'TB':appname) || 'unkown',
            version: lib.version(version || '0.0.0'),
            platform: platform || lib.env.os.name
        }
    } else {
        lib.env.aliapp = false;
    }

    // 向下兼容老版本
    lib.env.taobaoApp = lib.env.aliapp;

})(window, window['lib'] || (window['lib'] = {}));