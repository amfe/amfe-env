;(function(win, lib) {
    lib.env = lib.env || {};
    
    function Version(string){

        Object.defineProperty(this, 'val', {
            value: string.toString(),
            enumerable: true
        });
        
        this.gt = function(v) {
            return Version.compare(this, v) > 0;
        };

        this.gte = function(v) {
            return Version.compare(this, v) >= 0;
        };

        this.lt = function(v) {
            return Version.compare(this, v) < 0;
        };

        this.lte = function(v) {
            return Version.compare(this, v) <= 0;
        };

        this.eq = function(v) {
            return Version.compare(this, v) === 0;
        };
    };

    Version.prototype.toString = function() {
        return this.val;
    }

    Version.prototype.valueOf = function(){
        var v = this.val.split('.');
        var r = [];
        for(var i = 0; i < v.length; i++) {
            var n = parseInt(v[i],10);
            if (isNaN(n)) {
                n = 0;
            }
            var s = n.toString();
            if (s.length < 5) {
                s = Array(6 - s.length).join('0') + s;
            }
            r.push(s);
            if(r.length === 1) {
                r.push('.');
            }
        }
        return parseFloat(r.join(''));
    };

    Version.compare = function (v1,v2){
        v1 = v1.toString().split('.');
        v2 = v2.toString().split('.');
        
        for(var i = 0; i < v1.length || i < v2.length; i++) {
            var n1 = parseInt(v1[i],10),  n2 = parseInt(v2[i],10);
            
            if(window.isNaN(n1)) {
                n1 = 0;
            }
            if(window.isNaN(n2)) {
                n2 = 0;
            }
            if( n1 < n2 ) {
                return -1;
            }
            else if( n1 > n2) {
                return 1;
            }
        }
        return 0;
    }

    
    lib.version = function(s) {
        return new Version(s);
    };
})(window, window['lib'] || (window['lib'] = {}));
;
(function(window, lib) {
    lib.env = lib.env || {};
    
    var search = window.location.search.replace(/^\?/,'')
    lib.env.params = {};
    if(search) {
        var params = search.split('&');
        for(var i = 0 ; i < params.length; i++) {
            params[i] = params[i].split('=');
            try{
                lib.env.params[params[i][0]] = decodeURIComponent(params[i][1]);
            } catch(e) {
                lib.env.params[params[i][0]] = params[i][1];
            }
        }
    }

})(window, window['lib'] || (window['lib'] = {}));
;
(function(window, lib) {
    lib.env = lib.env || {};

    var ua = window.navigator.userAgent;
    var matched;
    
    if ((matched = ua.match(/Windows\sPhone\s(?:OS\s)?([\d\.]+)/))) {
        lib.env.os = {
            name: 'Windows Phone',
            isWindowsPhone: true,
            version: matched[1]
        }
    } else if(!!ua.match(/Safari/) && (matched = ua.match(/Android[\s\/]([\d\.]+)/))) {
        lib.env.os = {
            version: matched[1]
        }

        if ((!!ua.match(/Mobile\s+Safari/))) {
            lib.env.os.name = 'Android';
            lib.env.os.isAndroid = true;
        } else {
            lib.env.os.name = 'AndroidPad';
            lib.env.os.isAndroidPad = true;
        }
    } else if((matched = ua.match(/(iPhone|iPad|iPod)/))) {
        var name = matched[1];

        matched = ua.match(/OS ([\d_\.]+) like Mac OS X/);

        lib.env.os = {
            name: name,
            isIPhone: (name === 'iPhone' || name === 'iPod'),
            isIPad: name === 'iPad',
            isIOS: true,
            version: matched[1].split('_').join('.')
        }
    } else {
        lib.env.os = {
            name:'unknown',
            version:'0.0.0'
        }
    }
    
    if (lib.version) {
        lib.env.os.version = lib.version(lib.env.os.version);
    }
    
})(window, window['lib'] || (window['lib'] = {}));
;
(function(window, lib) {
    lib.env = lib.env || {};

    var ua = window.navigator.userAgent;
    var matched;
    
    if((matched = ua.match(/(?:UCWEB|UCBrowser\/)([\d\.]+)/))) {
        lib.env.browser = {
            name: 'UC',
            isUC: true,
            version: matched[1]
        }
    } else if((matched = ua.match(/MQQBrowser\/([\d\.]+)/))) {
        lib.env.browser = {
            name: 'QQ',
            isQQ: true,
            version: matched[1]
        }
    } else if ((matched = ua.match(/Firefox\/([\d\.]+)/))) {
        lib.env.browser = {
            name: 'Firefox',
            isFirefox: true,
            version: matched[1]
        }
    } else if ((matched = ua.match(/MSIE\s([\d\.]+)/)) || 
                    (matched = ua.match(/IEMobile\/([\d\.]+)/))) {

        lib.env.browser = {
            version: matched[1]
        }

        if (ua.match(/IEMobile/)) {
            lib.env.browser.name = 'IEMobile';
            lib.env.browser.isIEMobile = true;
        } else {
            lib.env.browser.name = 'IE';
            lib.env.browser.isIE = true;
        }

        if (ua.match(/Android|iPhone/)) {
            lib.env.browser.isIELikeWebkit = true;
        }
    } else if((matched = ua.match(/(?:Chrome|CriOS)\/([\d\.]+)/))) {
        lib.env.browser = {
            name: 'Chrome',
            isChrome: true,
            version: matched[1]
        }

        if (ua.match(/Version\/[\d+\.]+\s*Chrome/)) {
            lib.env.browser.name = 'Chrome Webview';
            lib.env.browser.isWebview = true;
        }
    } else if(!!ua.match(/Safari/) && (matched = ua.match(/Android[\s\/]([\d\.]+)/))) {
        lib.env.browser = {
            name: 'Android',
            isAndroid: true,
            version: matched[1]
        }
    } else if(ua.match(/iPhone|iPad|iPod/)) {
        if(ua.match(/Safari/)) {
            matched = ua.match(/Version\/([\d\.]+)/)
            lib.env.browser = {
                name: 'Safari',
                isSafari: true,
                version: matched[1]
            }
        } else {
            matched = ua.match(/OS ([\d_\.]+) like Mac OS X/);
            lib.env.browser = {
                name: 'iOS Webview',
                isWebview: true,
                version: matched[1].replace(/\_/, '.')
            }
        }
    } else {
        lib.env.browser = {
            name:'unknown',
            version:'0.0.0'
        }
    }
    
    if (lib.version) {
        lib.env.browser.version = lib.version(lib.env.browser.version);
    }
    
})(window, window['lib'] || (window['lib'] = {}));
;(function(window, lib) {
    lib.env = lib.env || {};
    
    //var ttid = lib.env.params['ttid'];
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
                platform = 'AndroidPad';
            } else {
                platform = lib.env.os.name;
            }
        } else {
            platform = lib.env.os.name;
        }
    }
    // 去除针对较老客户端的兼容性逻辑
    /* else if ((matched = ua.match(/@([^_@]+)_(iphone|android|ipad|apad)_([\d\.]+)/))) {
        aliapp = true;
        appname = matched[1];
        platform = matched[2].replace(/^ip/, 'iP').replace(/^a/, 'A');
        version = matched[3];
    }else if (ttid && (matched = ttid.match(/@([^_@]+)_(iphone|android|ipad|apad)_([\d\.]+)/))) {
        aliapp = true;
        appname = matched[1];
        platform = matched[2].replace(/^ip/, 'iP').replace(/^a/, 'A');
        version = matched[3];
    }else if (windvane) {
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
    } */

    // 兼容手淘的一个bug，在webview初始化异常时，在ua中只包含TBIOS字样，也认为是手淘webview。
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
