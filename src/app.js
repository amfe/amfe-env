//@require version
//@require params
//@require os

;
(function(window, lib) {
    lib.env = lib.env || {};
    
    var ttid = lib.env.param['ttid'];
    var ua = window.navigator.userAgent;

    var windvine;
    if (ua.match(/WindVane[\/\s]([\d\.\_]+)/)) {
        windvine = RegExp.$1;
    }

    var platform;
    var version;
    if (ua.match(/@taobao_(iphone|android|ipad)_([\d\.]+)/)) {
        platform = RegExp.$1.replace(/^ip/, 'iP').replace(/^a/, 'A');
        version = RegExp.$2;
    } else if (windvine) {
        windvine = lib.version(windvine);
        platform = lib.os.name;

        if (lib.os.isAndroid) {
            if (windvine.gte('2.5.1') && windvine.lte('2.5.5')) {
                version = '3.9.2';
            } else if (windvine.eq('2.5.6')) {
                version = '3.9.3';
            } else if (windvine.eq('2.6.0')) {
                version = '3.9.5';
            }
        } else if (lib.os.isIOS) {
            if (windvine.gte('2.5.0') && windvine.lt('2.6.0')) {
                version = '3.4.0';
            } else if (windvine.eq('2.6.0')) {
                version = '3.4.5';
            }
        }
    }

    if (!version && ttid && ttid.match(/@taobao_(iphone|android|ipad)_([\d\.]+)/)) {
        platform = RegExp.$1.replace(/^ip/, 'iP').replace(/^a/, 'A');
        version = RegExp.$2;
    }

    if (windvine || (platform && version)) {
        lib.env.taobaoApp = {
            windvine: lib.version(windvine || '0.0.0'),
            version: lib.version(version || '0.0.0'),
            platform: platform
        }
    }

})(window, window['lib'] || (window['lib'] = {}));