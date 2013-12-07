
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