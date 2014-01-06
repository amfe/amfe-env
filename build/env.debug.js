;
(function(window, lib) {
    lib.env = lib.env || {};
    
    function Version(string){
        this.string = string.toString();
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
    
    Version.prototype.gt = function(v) {
        return Version.compare(this,v) > 0;
    };

    Version.prototype.gte = function(v) {
        return Version.compare(this,v) >= 0;
    };

    Version.prototype.lt = function(v) {
        return Version.compare(this,v) < 0;
    };

    Version.prototype.lte = function(v) {
        return Version.compare(this,v) <= 0;
    };

    Version.prototype.eq = function(v) {
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
        var params = search.split('&');
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
    var matched;
    
    if((matched = ua.match(/Android ([\d\.]+)/))) {
        lib.env.os = {
            name: 'Android',
            isAndroid: true,
            version: matched[1]
        }
    } else if((matched = ua.match(/(iPhone|iPad|iPod)/))) {
        var name = matched[1];

        matched = ua.match(/OS ([\d_]+) like Mac OS X/);

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
    } else if((!ua.match(/Version\//) || !ua.match(/Android/)) 
        && (matched = ua.match(/Chrome\/([\d\.]+)/))) {
        lib.env.browser = {
            name: 'Chrome',
            isChrome: true,
            version: matched[1]
        }
    } else if(ua.match(/Mobile Safari/) && (matched = ua.match(/Android ([\d\.]+)/))) {
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
            matched = ua.match(/OS ([\d_]+) like Mac OS X/);
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

    var platform;
    var version;
    if ((matched = ua.match(/@taobao_(iphone|android|ipad)_([\d\.]+)/))) {
        platform = matched[1].replace(/^ip/, 'iP').replace(/^a/, 'A');
        version = matched[2];
    } else if (ttid && (matched = ttid.match(/@taobao_(iphone|android|ipad)_([\d\.]+)/))) {
        platform = matched[1].replace(/^ip/, 'iP').replace(/^a/, 'A');
        version = matched[2];
    } else if (windvine) {
        windvine = lib.version(windvine);
        platform = lib.env.os.name;

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

    if (platform && version) {
        lib.env.taobaoApp = {
            windvine: lib.version(windvine || '0.0.0'),
            version: lib.version(version || '0.0.0'),
            platform: platform
        }
    }

})(window, window['lib'] || (window['lib'] = {}));
