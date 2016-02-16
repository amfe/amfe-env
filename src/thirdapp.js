const ua = window.navigator.userAgent;

var thirdapp;

if (ua.match(/Weibo/i)) {
    /**
     * @type {Object}
     * @memberof lib.env
     * @property {String} appname - 操作系统名称，比如Weibo/Weixin/unknown等
     * @property {Boolean} isWeibo - 是否是微博
     * @property {Boolean} isWeixin - 是否是微信
     */
    thirdapp = {
        appname: 'Weibo',
        isWeibo: true
    };
} else if(ua.match(/MicroMessenger/i)) {
    thirdapp = {
        appname: 'Weixin',
        isWeixin: true
    };
    /* istanbul ignore next */
} else {
    /* istanbul ignore next */
    thirdapp = false;
}

export default thirdapp;
