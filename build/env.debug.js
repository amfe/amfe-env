;
(function(window, lib) {
    lib.env = lib.env || {};
    
    function Version(string){
        this.string = string;
    };

    Version.prototype.toString = function(){
        return this.string;
    };

    Version.prototype.valueOf = function(){
        var v = this.toString().split('.');
        var r = [];
        for(var i = 0; i < v.length; i++) {
            var n = parseInt(v[i],10);
            if(window.isNaN(n)) {
                n = 0;
            }
            var s = n.toString();
            if(s.length < 5) {
                s = Array(6-s.length).join('0') + s;
            }
            r.push(s);
            if(r.length === 1) {
                r.push('.');
            }
        }
        return window.parseFloat(r.join(''));
        
    };
    
    Version.prototype.higherThan = function(v) {
        return Version.compare(this,v) > 0;
    };

    Version.prototype.lowerThan = function(v) {
        return Version.compare(this,v) < 0;
    };

    Version.prototype.is = function(v) {
        return Version.compare(this,v) === 0;
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

    
    lib.version = function(string){
        return new Version(string);
    };
    
})(window, window['lib'] || (window['lib'] = {}));
;
(function(window, lib) {
    lib.env = lib.env || {};
    
    var search = window.location.search.replace(/^\?/,'')
    lib.env.params = {};
    if(search) {
        var params = srch.split('&');
        for(var i = 0 ; i < params.length; i++) {
            params[i] = params[i].split('=');
            lib.env.params[params[i][0]] = decodeURIComponent(params[i][1]);
        }
    }

})(window, window['lib'] || (window['lib'] = {}));
;
(function(window, lib) {
    lib.env = lib.env || {};

    var ua = window.navigator.userAgent;
    
    if(ua.match(/Android ([\d\.]+)/)) {
        lib.env.os = {
            name: 'Android',
            isAndroid: true,
            version: RegExp.$1
        }
    } else if(ua.match(/(iPhone|iPad|iPod)/)) {
        var name = RegExp.$1;

        ua.match(/OS ([\d_]+) like Mac OS X/);

        lib.env.os = {
            name: name,
            isIPhone: (name === 'iPhone' || name === 'iPod'),
            isIPad: name === 'iPad',
            isIOS: true,
            version: RegExp.$1.split('_').join('.')
        }
    } else {
        lib.env.os = {
            name:'unknown',
            version:'0.0.0'
        }
    }
    
    if(lib.version) {
        lib.env.os.version = lib.version(lib.env.os.version);
    }
    
})(window, window['lib'] || (window['lib'] = {}));
;
(function(window, lib) {
    lib.env = lib.env || {};

    var ua = ua;
    
    if(ua.match(/(?:UCWEB|UCBrowser\/)([\d\.]+)/)) {
        lib.env.browser = {
            name: 'UC',
            isUC: true,
            version: RegExp.$1
        }
    } else if(ua.match(/MQQBrowser\/([\d\.]+)/)) {
        lib.env.browser = {
            name: 'QQ',
            isQQ: true,
            version: RegExp.$1
        }
    } else if((!ua.match(/Version\//) || !ua.match(/Android/) ) 
        && ua.match(/Chrome\/([\d\.]+)/)) {
        lib.env.browser = {
            name: 'Chrome',
            isChrome: true,
            version: RegExp.$1
        }
    } else if(ua.match(/Mobile Safari/) && ua.match(/Android ([\d\.]+)/)) {
        lib.env.browser = {
            name: 'Android',
            isAndroid: true,
            version: RegExp.$1
        }
    } else if(ua.match(/iPhone|iPad|iPod/)) {
        if(ua.match(/Safari/)) {
            ua.match(/Version\/([\d\.]+)/)
            lib.env.browser = {
                name: 'Safari',
                isSafari: true,
                version: RegExp.$1
            }
        } else {
            ua.match(/OS ([\d_]+) like Mac OS X/);
            lib.env.browser = {
                name: 'iOS Webview',
                isWebview: true,
                version: RegExp.$1.split('_').join('.')
            }
        }
    } else {
        lib.env.browser = {
            name:'unknown',
            version:'0.0.0'
        }
    }
    
    if(lib.version) {
        lib.env.browser.version = lib.version(lib.env.browser.version);
    }
    
})(window, window['lib'] || (window['lib'] = {}));
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
