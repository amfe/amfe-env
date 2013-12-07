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
    //iTouch?
    
})(window, window['lib'] || (window['lib'] = {}));