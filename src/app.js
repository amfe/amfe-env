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

    var platform = lib.os.name;
    var version = '0.0.0';
    if (ua.match(/@taobao_(iphone|android|ipad)_([\d\.]+)/) ||
            (ttid && ttid.match(/@taobao_(iphone|android|ipad)_([\d\.]+)/))) {
        platform = RegExp.$1;
        version = RegExp.$2;
    } else if (windvine) {
        windvine = lib.version(windvine);

        if (lib.os.isAndroid) {
            if (!windvine.lowerThen('2.5.1') && !windvine.hightThen('2.5.5')) {
                version = '3.9.2';
            } else if (windvine.is('2.5.6')) {
                version = '3.9.3';
            } else if (windvine.is('2.6.0')) {
                version = '3.9.5';
            }
        } else if (lib.os.isIOS) {
            if (!windvine.lowerThen('2.5.0') && windvine.lowerThen('2.6.0')) {
                version = '3.4.0';
            } else if (windvine.is('2.6.0')) {
                version = '3.4.5';
            }
        }
    }

    if (windvine) {
        lib.env.taobaoApp = {
            windvine: windvine,
            version: lib.version(version),
            platform: platform
        }
    }

})(window, window['lib'] || (window['lib'] = {}));