;
(function(window, lib) {
    lib.env = lib.env || {};

    var ua = window.navigator.userAgent;
    var matched;
    
    if((matched = ua.match(/(?:UCWEB|UCBrowser\/)([\d\.]+)/))) {
        lib.env.browser = {
            name: 'UC',
            isUC: true,
            version: matched[1]
        }
    } else if((matched = ua.match(/MQQBrowser\/([\d\.]+)/))) {
        lib.env.browser = {
            name: 'QQ',
            isQQ: true,
            version: matched[1]
        }
    } else if ((matched = ua.match(/Firefox\/([\d\.]+)/))) {
        lib.env.browser = {
            name: 'Firefox',
            isFirefox: true,
            version: matched[1]
        }
    } else if ((matched = ua.match(/MSIE\s([\d\.]+)/)) || 
                    (matched = ua.match(/IEMobile\/([\d\.]+)/))) {

        lib.env.browser = {
            version: matched[1]
        }

        if (ua.match(/IEMobile/)) {
            lib.env.browser.name = 'IEMobile';
            lib.env.browser.isIEMobile = true;
        } else {
            lib.env.browser.name = 'IE';
            lib.env.browser.isIE = true;
        }

        if (ua.match(/Android|iPhone/)) {
            lib.env.browser.isIELikeWebkit = true;
        }
    } else if((matched = ua.match(/(?:Chrome|CriOS)\/([\d\.]+)/))) {
        lib.env.browser = {
            name: 'Chrome',
            isChrome: true,
            version: matched[1]
        }

        if (ua.match(/Version\/[\d+\.]+\s*Chrome/)) {
            lib.env.browser.name = 'Chrome Webview';
            lib.env.browser.isWebview = true;
        }
    } else if(!!ua.match(/Safari/) && (matched = ua.match(/Android[\s\/]([\d\.]+)/))) {
        lib.env.browser = {
            name: 'Android',
            isAndroid: true,
            version: matched[1]
        }
    } else if(ua.match(/iPhone|iPad|iPod/)) {
        if(ua.match(/Safari/)) {
            matched = ua.match(/Version\/([\d\.]+)/)
            lib.env.browser = {
                name: 'Safari',
                isSafari: true,
                version: matched[1]
            }
        } else {
            matched = ua.match(/OS ([\d_\.]+) like Mac OS X/);
            lib.env.browser = {
                name: 'iOS Webview',
                isWebview: true,
                version: matched[1].replace(/\_/, '.')
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