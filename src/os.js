;
(function(window, lib) {
    lib.env = lib.env || {};

    var ua = window.navigator.userAgent;
    
    if(ua.match(/Android ([\d\.]+)/)) {
        lib.env.os = {
            name: "Android",
            isAndroid: true,
            version: RegExp.$1
        }
    } else if(ua.match(/(iPhone|iPad|iPod)/)) {
        ua.match(/OS ([\d_]+) like Mac OS X/);

        lib.env.os = {
            name:"iOS",
            isiPhone: (RegExp.$1 === 'iPhone' || RegExp.$1 === 'iPod'),
            isiPad: RegExp.$1 === 'iPad',
            isiOS: true,
            version: RegExp.$1.split("_").join(".")
        }
    } else {
        lib.env.os = {
            name:"unknown",
            version:"0.0"
        }
    }
    
    if(lib.version) {
        var Version = lib.version();
        lib.env.os.version = new Version(lib.env.os.version);
    }
    
})(window, window['lib'] || (window['lib'] = {}));