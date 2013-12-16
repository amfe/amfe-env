;
(function(window, lib) {
    lib.env = lib.env || {};
    
    var srch = window.location.search.replace(/^\?/,'')
    lib.env.params = {};
    if(srch) {
        var params = srch.split('&');
        for(var i = 0 ; i < params.length; i++) {
            params[i] = params[i].split('=');
            lib.env.params[params[i][0]] = decodeURIComponent(params[i][1]);
        }
    }

})(window, window['lib'] || (window['lib'] = {}));