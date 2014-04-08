//@require version
//@require params
//@require os

;
(function(window, lib) {
    lib.env = lib.env || {};
    
    var ttid = lib.env.params['ttid'];
    var ua = window.navigator.userAgent;

    var windvine;
    var matched;
    if ((matched = ua.match(/WindVane[\/\s]([\d\.\_]+)/))) {
        windvine = matched[1];
    }

    var appname;
    var platform;
    var version;
    if ((matched = ua.match(/AliApp\(([A-Z\-]+)\/([\d\.]+)\)/))) {
        appname = matched[1];
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
        version = matched[2];
    } else if ((matched = ua.match(/@([^_@]+)_(iphone|android|ipad|apad)_([\d\.]+)/))) {
        appname = matched[1];
        platform = matched[2].replace(/^ip/, 'iP').replace(/^a/, 'A');
        version = matched[3];
    } else if (ttid && (matched = ttid.match(/@([^_@]+)_(iphone|android|ipad|apad)_([\d\.]+)/))) {
        appname = matched[1];
        platform = matched[2].replace(/^ip/, 'iP').replace(/^a/, 'A');
        version = matched[3];
    } else if (windvine) {
        windvine = lib.version(windvine);
        platform = lib.env.os.name;
        appname = 'taobao';

        if (lib.env.os.isAndroid) {
            if (windvine.gte('2.5.1') && windvine.lte('2.5.5')) {
                version = '3.9.2';
            } else if (windvine.eq('2.5.6')) {
                version = '3.9.3';
            } else if (windvine.eq('2.6.0')) {
                version = '3.9.5';
            }
        } else if (lib.env.os.isIOS) {
            if (windvine.gte('2.5.0') && windvine.lt('2.6.0')) {
                version = '3.4.0';
            } else if (windvine.eq('2.6.0')) {
                version = '3.4.5';
            }
        }
    }

    if (appname && platform && version) {
        lib.env.taobaoApp = {
            windvine: lib.version(windvine || '0.0.0'),
            appname: appname,
            version: lib.version(version || '0.0.0'),
            platform: platform
        }
    }

})(window, window['lib'] || (window['lib'] = {}));