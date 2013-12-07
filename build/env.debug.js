
;
(function(window, lib) {
    lib.env = lib.env || {};
    
    window.location.href.match(/^(https?):\/\/(?:([^:]+)(?::([^@]+))@)?([^:\/]+)(?:\:([\d]+))?(\/[^?;]+)?(?:\?([^?;\/#]+))?(?:#([^#]+))?$/)
    
    var ttid = "";
    if(RegExp.$7) {
        var params = RegExp.$7.split("&");
        for(var i = 0 ; i < params.length; i++) {
            params[i] = params[i].split("=");
            if(params[i][0]=="ttid") {
                ttid = decodeURIComponent(params[i][1]);
            }
        }
    }
    

    
    
    lib.env.ttid = ttid

    
    
    if(window.navigator.userAgent.match(/@taobao_(iphone|android|ipad)_([\d\.]+)/)
        || ttid && ttid.match(/@taobao_(iphone|android|ipad)_([\d\.]+)/)) {

        lib.env.taobaoApp = {
            version:RegExp.$2,
            platform:RegExp.$1
        }
    } else {
        lib.env.taobaoApp = null;
    }

    

})(window, window['lib'] || (window['lib'] = {}));
;
(function(window, lib) {
    lib.env = lib.env || {};
    
    if(window.navigator.userAgent.match(/UCWEB([\d\.]+)/)) {
        lib.env.browser = {
            name:"UC",
            version:RegExp.$1
        }
    }
    else if(window.navigator.userAgent.match(/UCBrowser\/([\d\.]+)/)) {
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
    else if(window.navigator.userAgent.match(/Chrome\/([\d\.]+)/)) {
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
    else if(window.navigator.userAgent.match(/iPhone|iPad/)) {
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
    else if(window.navigator.userAgent.match(/iPhone|iPad/)) {
        window.navigator.userAgent.match(/OS ([\d_]+) like Mac OS X/);

        lib.env.os = {
            name:"iOS",
            version:RegExp.$1.split("_").join(".")
        }
    }
    else {
        lib.env.os = {
            name:"desktop",
            version:"0.0"
        }
    }
    //iTouch?
    
})(window, window['lib'] || (window['lib'] = {}));
