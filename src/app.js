;
(function(window, lib) {
    lib.env = lib.env || {};
    
    var ttid = lib.env.param['ttid'];
    var ua = window.navigator.userAgent;
    var reg = /@taobao_(iphone|android|ipad)_([\d\.]+)/;
    var uaMatched = ua.match(reg);
    var ttidMatched = ttid && ttid.match(reg);

    if(uaMatched || ttidMatched) {

        lib.env.taobaoApp = {
            version: uaMatched[2] || ttidMatched[2],
            platform: (uaMatched[1] || uaMatched[1]).replace(/^ip/, 'iP').replace(/^a/, 'A')
        }

        if(lib.version) {
            var Version = lib.version();
            lib.env.taobaoApp.version = new Version(lib.env.taobaoApp.version);
        }
    }

})(window, window['lib'] || (window['lib'] = {}));