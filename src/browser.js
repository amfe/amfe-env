;
(function(window, lib) {
    lib.env = lib.env || {};

    var ua = window.navigator.userAgent;
    
    if(ua.match(/(?:UCWEB|UCBrowser\/)([\d\.]+)/)) {
        lib.env.browser = {
            name: 'UC',
            isUC: true,
            version: RegExp.$1
        }
    } else if(ua.match(/MQQBrowser\/([\d\.]+)/)) {
        lib.env.browser = {
            name: 'QQ',
            isQQ: true,
            version: RegExp.$1
        }
    } else if((!ua.match(/Version\//) || !ua.match(/Android/) ) 
        && ua.match(/Chrome\/([\d\.]+)/)) {
        lib.env.browser = {
            name: 'Chrome',
            isChrome: true,
            version: RegExp.$1
        }
    } else if(ua.match(/Mobile Safari/) && ua.match(/Android ([\d\.]+)/)) {
        lib.env.browser = {
            name: 'Android',
            isAndroid: true,
            version: RegExp.$1
        }
    } else if(ua.match(/iPhone|iPad|iPod/)) {
        if(ua.match(/Safari/)) {
            ua.match(/Version\/([\d\.]+)/)
            lib.env.browser = {
                name: 'Safari',
                isSafari: true,
                version: RegExp.$1
            }
        } else {
            ua.match(/OS ([\d_]+) like Mac OS X/);
            lib.env.browser = {
                name: 'iOS Webview',
                isWebview: true,
                version: RegExp.$1.replace('_', '')
            }
        }
    } else {
        lib.env.browser = {
            name:'unknown',
            version:'0.0.0'
        }
    }
    
    if (lib.version) {
        lib.env.browser.version = lib.version(lib.env.browser.version);
    }
    
})(window, window['lib'] || (window['lib'] = {}));