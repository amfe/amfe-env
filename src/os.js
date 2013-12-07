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
            name:"desktop",
            version:"0.0"
        }
    }
    
    if(lib.version ) {
        var Version = lib.version();
        lib.env.os.version = new Version(lib.env.os.version);
    }
    
})(window, window['lib'] || (window['lib'] = {}));