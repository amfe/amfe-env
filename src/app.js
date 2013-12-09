
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