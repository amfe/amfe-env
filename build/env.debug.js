;(function(win, lib) {

    lib.env = lib.env || {};
    /**
     * 版本好
     * @class lib.env~Version
     * @param {String} v - 版本号字符串
     */
    function Version(v){

        Object.defineProperty(this, 'val', {
            value: v.toString(),
            enumerable: true
        });

        /**
         * 判断是否大于某个版本
         * @method gt
         * @param {String} v - 需要比较的版本号
         * @return {Boolean} 是否大于
         * @instance
         * @memberof Version
         */
        this.gt = function(v) {
            return Version.compare(this, v) > 0;
        };

        /**
         * 判断是否大于等于某个版本
         * @method gte
         * @param {String} v - 需要比较的版本号
         * @return {Boolean} 是否大于等于
         * @instance
         * @memberof Version
         */
        this.gte = function(v) {
            return Version.compare(this, v) >= 0;
        };

        /**
         * 判断是否小于某个版本
         * @method lt
         * @param {String} v - 需要比较的版本号
         * @return {Boolean} 是否小于
         * @instance
         * @memberof Version
         */
        this.lt = function(v) {
            return Version.compare(this, v) < 0;
        };

        /**
         * 判断是否小于等于某个版本
         * @method lte
         * @param {String} v - 需要比较的版本号
         * @return {Boolean} 是否小于等于
         * @instance
         * @memberof Version
         */
        this.lte = function(v) {
            return Version.compare(this, v) <= 0;
        };

        /**
         * 判断是否等于某个版本
         * @method eq
         * @param {String} v - 需要比较的版本号
         * @return {Boolean} 是否等于
         * @instance
         * @memberof Version
         */
        this.eq = function(v) {
            return Version.compare(this, v) === 0;
        };
    };

    /**
     * 返回当前版本字符串
     * @method toString
     * @return {String} 当前版本字符串
     * @instance
     * @memberof Version
     */
    Version.prototype.toString = function() {
        return this.val;
    }

    /**
     * 返回当前版本
     * @method valueOf
     * @return {Boolean} 当前版本
     * @instance
     * @memberof Version
     */
    Version.prototype.valueOf = function(){
        var v = this.val.split('.');
        var r = [];
        for(var i = 0; i < v.length; i++) {
            var n = parseInt(v[i],10);
            if (isNaN(n)) {
                n = 0;
            }
            var s = n.toString();
            if (s.length < 5) {
                s = Array(6 - s.length).join('0') + s;
            }
            r.push(s);
            if(r.length === 1) {
                r.push('.');
            }
        }
        return parseFloat(r.join(''));
    };

    /**
     * 返回当前版本字符串
     * @method compare
     * @param {String} v1 - 需要比较的版本1
     * @param {String} v2 - 需要比较的版本2
     * @return {Number} 0表示相等，-1表示小于，1表示大于
     * @memberof Version
     */
    Version.compare = function (v1,v2){
        v1 = v1.toString().split('.');
        v2 = v2.toString().split('.');
        
        for(var i = 0; i < v1.length || i < v2.length; i++) {
            var n1 = parseInt(v1[i],10),  n2 = parseInt(v2[i],10);
            
            if(window.isNaN(n1)) {
                n1 = 0;
            }
            if(window.isNaN(n2)) {
                n2 = 0;
            }
            if( n1 < n2 ) {
                return -1;
            }
            else if( n1 > n2) {
                return 1;
            }
        }
        return 0;
    }


    /**
     * 解析和操作版本号
     * @method version
     * @param {string} v - 需要解析的版本号
     * @return {lib.env~Version} Verson实例
     * @memberof lib
     */
    lib.version = function(v) {
        return new Version(v);
    };
})(window, window['lib'] || (window['lib'] = {}));
;
(function(window, lib) {
    lib.env = lib.env || {};
    var search = window.location.search.replace(/^\?/,'')

    /**
     * 当前URL的查询串键值对
     * @member {Object} params
     * @memberof lib.env
     */
    lib.env.params = {};
    if(search) {
        var params = search.split('&');
        for(var i = 0 ; i < params.length; i++) {
            params[i] = params[i].split('=');
            try{
                lib.env.params[params[i][0]] = decodeURIComponent(params[i][1]);
            } catch(e) {
                lib.env.params[params[i][0]] = params[i][1];
            }
        }
    }

})(window, window['lib'] || (window['lib'] = {}));
;
(function(window, lib) {
    lib.env = lib.env || {};

    var ua = window.navigator.userAgent;
    var matched;
    
    if ((matched = ua.match(/Windows\sPhone\s(?:OS\s)?([\d\.]+)/))) {
        /**
         * @type {Object}
         * @memberof lib.env
         * @property {String} name - 操作系统名称，比如Android/AndroidPad/iPhone/iPod/iPad/Windows Phone/unknown等
         * @property {lib.env~Version} version - 操作系统版本号
         * @property {Boolean} isWindowsPhone - 是否是Windows Phone
         * @property {Boolean} isIPhone - 是否是iPhone/iTouch
         * @property {Boolean} isIPad - 是否是iPad
         * @property {Boolean} isIOS - 是否是iOS
         * @property {Boolean} isAndroid - 是否是Android手机
         * @property {Boolean} isAndroidPad - 是否是Android平板
         */
        lib.env.os = {
            name: 'Windows Phone',
            isWindowsPhone: true,
            version: matched[1]
        }
    } else if(!!ua.match(/Safari/) && (matched = ua.match(/Android[\s\/]([\d\.]+)/))) {
        lib.env.os = {
            version: matched[1]
        }

        if ((!!ua.match(/Mobile\s+Safari/))) {
            lib.env.os.name = 'Android';
            lib.env.os.isAndroid = true;
        } else {
            lib.env.os.name = 'AndroidPad';
            lib.env.os.isAndroidPad = true;
        }
    } else if((matched = ua.match(/(iPhone|iPad|iPod)/))) {
        var name = matched[1];

        matched = ua.match(/OS ([\d_\.]+) like Mac OS X/);

        lib.env.os = {
            name: name,
            isIPhone: (name === 'iPhone' || name === 'iPod'),
            isIPad: name === 'iPad',
            isIOS: true,
            version: matched[1].split('_').join('.')
        }
    } else {
        lib.env.os = {
            name:'unknown',
            version:'0.0.0'
        }
    }
    
    if (lib.version) {
        lib.env.os.version = lib.version(lib.env.os.version);
    }
    
})(window, window['lib'] || (window['lib'] = {}));
;
(function(window, lib) {
    lib.env = lib.env || {};

    var ua = window.navigator.userAgent;
    var matched;

    if((matched = ua.match(/(?:UCWEB|UCBrowser\/)([\d\.]+)/))) {
        /**
         * @type {Object}
         * @memberof lib.env
         * @property {String} name - 浏览器名称，比如UC/QQ/Firefox/Chrome/Android/Safari/iOS Webview/Chrome Webview/IE/IEMobile/unknown等
         * @property {lib.env~Version} version - 浏览器版本号
         * @property {Boolean} isUC - 是否是UC浏览器
         * @property {Boolean} isQQ - 是否是QQ浏览器
         * @property {Boolean} isIE - 是否是IE浏览器
         * @property {Boolean} isIEMobile - 是否是IE移动版浏览器
         * @property {Boolean} isIELikeWebkit - 是否是IE兼容了Webkit特性的浏览器
         * @property {Boolean} isChrome - 是否是Chrome浏览器
         * @property {Boolean} isAndroid - 是否是Android的原生浏览器
         * @property {Boolean} isSafari - 是否是Safari浏览器
         * @property {Boolean} isWebview - 是否是iOS下的Webview或Android下Chrome的Webview
         */
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
                version: matched[1].replace(/\_/g, '.')
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
;
(function(window, lib) {
    lib.env = lib.env || {};

    var ua = window.navigator.userAgent;
    var matched;
    
    if (!!ua.match(/Weibo/i)) {
        /**
         * @type {Object}
         * @memberof lib.env
         * @property {String} appname - 操作系统名称，比如Weibo/Weixin/unknown等
         * @property {Boolean} isWeibo - 是否是微博
         * @property {Boolean} isWeixin - 是否是微信
         */
        lib.env.thirdapp = {
            appname: 'Weibo',
            isWeibo: true
        }
    } else if(!!ua.match(/MicroMessenger/i)) {
        lib.env.thirdapp = {
            appname: 'Weixin',
            isWeixin: true
        }
    } else {
        lib.env.thirdapp = false;
    }
})(window, window['lib'] || (window['lib'] = {}));
;(function(window, lib) {
    lib.env = lib.env || {};
    
    var ua = window.navigator.userAgent;

    var windvane;
    var matched;
    if ((matched = ua.match(/WindVane[\/\s]([\d\.\_]+)/))) {
        windvane = matched[1];
    }

    var aliapp = false;
    var appname = '';
    var platform = '';
    var version = '';
    if ((matched = ua.match(/AliApp\(([A-Z\-]+)\/([\d\.]+)\)/i))) {
        aliapp = true;
        appname = matched[1];
        version = matched[2];
        if (appname.indexOf('-PD') > 0) {
            if (lib.env.os.isIOS) {
                platform = 'iPad';
            } else if (lib.env.os.isAndroid) {
                platform = 'AndroidPad';
            } else {
                platform = lib.env.os.name;
            }
        } else {
            platform = lib.env.os.name;
        }
    }

    // 兼容手淘的一个bug，在webview初始化异常时，在ua中只包含TBIOS字样，也认为是手淘webview。
    if (!appname && ua.indexOf('TBIOS') > 0) {
        appname = 'TB';
    }

    if (aliapp) {
        /**
         * @type {Object}
         * @memberof lib.env
         * @property {lib.env~Version} windavne - windvane的版本
         * @property {String} appname - App的名称，比如TB/TM等
         * @property {lib.env~Version} version - 客户端的版本
         * @property {String} platform - 平台名称，比如iPhone/iPad/Android/AndroidPad等
         */
        lib.env.aliapp = {
            windvane: lib.version(windvane || '0.0.0'),
            appname: appname || 'unkown',
            version: lib.version(version || '0.0.0'),
            platform: platform || lib.env.os.name
        }
    } else {
        lib.env.aliapp = false;
    }

    // 向下兼容老版本
    lib.env.taobaoApp = lib.env.aliapp;

})(window, window['lib'] || (window['lib'] = {}));
/**
 * @namespace lib
 */

/**
 * @namespace env
 * @memberOf lib
 */
