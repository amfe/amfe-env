(function(window, lib) {
    lib.env = lib.env || {};
    
    lib.version = function(){
        return Version;
    };
    
    
    function Version(string){
        this.string = string;
    };
    Version.prototype.toString = function(){
        return this.string;
    };
    Version.prototype.valueOf = function(){
        var v = this.toString().split(".");
        var r = [];
        for(var i = 0; i < v.length; i++) {
            var n = parseInt(v[i],10);
            if(window.isNaN(n)) {
                n = 0;
            }
            var s = n.toString();
            if(s.length < 5)
            {
                s = Array(6-s.length).join("0") + s;
            }
            r.push(s);
            if(r.length === 1)
            {
                r.push(".");
            }
        }
        return window.parseFloat(r.join(""));
        
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
        
        v1 = v1.toString().split(".");
        v2 = v2.toString().split(".");
        
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
    
    for(var p in lib.env) {
        if(lib.env[p] && lib.env[p].version) {
            lib.env[p].version = new Version(lib.env[p].version);
        }
    }

    
})(window, window['lib'] || (window['lib'] = {}));

;
(function(window, lib) {
    lib.env = lib.env || {};
    
    
    
    var ttid = "";
    
    var srch = window.location.search.replace(/^\?/,"")
    
    lib.env.params = {};
    
    if(srch) {
        var params = srch.split("&");
        for(var i = 0 ; i < params.length; i++) {
            params[i] = params[i].split("=");
            lib.env.params[params[i][0]] = decodeURIComponent(params[i][1]);
        }
    }

    
    
    if(window.navigator.userAgent.match(/@taobao_(iphone|android|ipad)_([\d\.]+)/)
        || ttid && ttid.match(/@taobao_(iphone|android|ipad)_([\d\.]+)/)) {

        lib.env.taobaoApp = {
            version:RegExp.$2,
            platform:RegExp.$1
        }
        if(lib.version ) {
            var Version = lib.version();
            lib.env.taobaoApp.version = new Version(lib.env.taobaoApp.version);
        }
    } else {
        lib.env.taobaoApp = null;
    }



})(window, window['lib'] || (window['lib'] = {}));
;
(function(window, lib) {
    lib.env = lib.env || {};
    
    if(window.navigator.userAgent.match(/(?:UCWEB|UCBrowser\/)([\d\.]+)/)) {
        lib.env.browser = {
            name:"UC",
            version:RegExp.$1
        }
    }
    else if(window.navigator.userAgent.match(/MQQBrowser\/([\d\.]+)/)) {

        lib.env.browser = {
            name:"QQ",
            version:RegExp.$1
        }
    }
    else if((!window.navigator.userAgent.match(/Version\//) || !window.navigator.userAgent.match(/Android/) ) 
        && window.navigator.userAgent.match(/Chrome\/([\d\.]+)/)) {
        lib.env.browser = {
            name:"Chrome",
            version:RegExp.$1
        }
    }
    else if(window.navigator.userAgent.match(/Mobile Safari/) && window.navigator.userAgent.match(/Android ([\d\.]+)/)) {
        lib.env.browser = {
            name:"Android",
            version:RegExp.$1
        }
    }
    else if(window.navigator.userAgent.match(/iPhone|iPad|iPod/)) {
        if(window.navigator.userAgent.match(/Safari/)) {
            window.navigator.userAgent.match(/Version\/([\d\.]+)/)
            lib.env.browser = {
                name:"Safari",
                version:RegExp.$1
            }
        }
        else {
            window.navigator.userAgent.match(/OS ([\d_]+) like Mac OS X/);
            lib.env.browser = {
                name:"iOS Webview",
                version:RegExp.$1.split("_").join(".")
            }
        }
    }
    else {
        lib.env.browser = {
            name:"unknown",
            version:"0.0"
        }
    }
    
    if(lib.version ) {
        var Version = lib.version();
        lib.env.browser.version = new Version(lib.env.browser.version);
    }
    
})(window, window['lib'] || (window['lib'] = {}));
;
(function(window, lib) {
    lib.env = lib.env || {};
    
    if(window.navigator.userAgent.match(/Android ([\d\.]+)/)) {
        lib.env.os = {
            name:"Android",
            version:RegExp.$1
        }
    }
    else if(window.navigator.userAgent.match(/iPhone|iPad|iPod/)) {
        window.navigator.userAgent.match(/OS ([\d_]+) like Mac OS X/);

        lib.env.os = {
            name:"iOS",
            version:RegExp.$1.split("_").join(".")
        }
    }
    else {
        lib.env.os = {
            name:"unknown",
            version:"0.0"
        }
    }
    
    if(lib.version ) {
        var Version = lib.version();
        lib.env.os.version = new Version(lib.env.os.version);
    }
    
})(window, window['lib'] || (window['lib'] = {}));
