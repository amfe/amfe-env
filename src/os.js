import Version from './version';

const ua = window.navigator.userAgent;
var os;
var matched;

if ((matched = ua.match(/Windows\sPhone\s(?:OS\s)?([\d\.]+)/))) {
    os = {
        name: 'Windows Phone',
        isWindowsPhone: true,
        version: new Version(matched[1])
    };
} else if(!!ua.match(/Safari/) && (matched = ua.match(/Android[\s\/]([\d\.]+)/))) {
    os = {
        version: new Version(matched[1])
    };

    if (ua.match(/Mobile\s+Safari/)) {
        os.name = 'Android';
        os.isAndroid = true;
    } else {
        os.name = 'AndroidPad';
        os.isAndroidPad = true;
    }
} else if((matched = ua.match(/(iPhone|iPad|iPod)/))) {
    var name = matched[1];

    if ((matched = ua.match(/OS ([\d_\.]+) like Mac OS X/))) {
        os = {
            name: name,
            isIPhone: (name === 'iPhone' || name === 'iPod'),
            isIPad: name === 'iPad',
            isIOS: true,
            version: new Version(matched[1].split('_').join('.'))
        };
    }
}

if (!os) {
    os = {
        name: 'unknown',
        version: new Version('0.0.0')
    };
}

export default os;