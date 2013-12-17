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