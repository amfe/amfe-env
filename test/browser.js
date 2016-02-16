import {expect} from 'chai';
import {rerequire} from 'mocha-jsdom';

describe('detect browser info from ua', function() {
    const UCUA = 'Mozilla/5.0 (Linux; U; Android 2.3; zh-CN; MI-ONEPlus) AppleWebKit/534.13 (KHTML, likeGecko) UCBrowser/8.6.0.199 U3/0.8.0 Mobile Safari/534.13';
    const QQUA = 'Mozilla/5.0 (Linux; U; Android 4.1.1; zh-cn; MI 2S Build/JRO03L) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 MQQBrowser/5.0 Mobile Safari/537.36';
    const FireFoxUA = 'Mozilla/5.0 (iPad; CPU iPhone OS 8_3 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) FxiOS/1.0 Mobile/12F69 Safari/600.1.4';
    const IEUA = 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0; SLCC1; .NET CLR 2.0.50727; .NET CLR 1.1.4322; InfoPath.2; .NET CLR 3.5.21022; .NET CLR 3.5.30729; MS-RTC LM 8; OfficeLiveConnector.1.4; OfficeLivePatch.1.3; .NET CLR 3.0.30729)';
    const IEMobileUA = 'Mozilla/5.0 (Mobile; Windows Phone 8.1; Android 4.0; ARM; Trident/7.0; Touch; rv:11.0; IEMobile/11.0; Microsoft; RM-1074) like iPhone OS 7_0_3 Mac OS X AppleWebKit/537 (KHTML, like Gecko) Mobile Safari/537';
    const ChromeUA = 'Mozilla/5.0 (Linux; Android 4.1; Galaxy Nexus Build/JRN84D) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19';
    const ChromeWebviewUA = 'Mozilla/5.0 (Linux; Android 4.1; Galaxy Nexus Build/JRN84D) AppleWebKit/535.19 (KHTML, like Gecko) Version/4.0 Chrome/18.0.1025.166 Mobile Safari/535.19';
    const AndroidBrowserUA = 'Mozilla/5.0 (Linux; U; Android 4.2; en-us; Nexus 10 Build/JVP15I) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Safari/534.30';
    const SafariUA = 'Mozilla/5.0 (iPad; CPU OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53';
    const iOSWebviewUA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Mobile/10A5376e';

    describe('UCBrowser', function() {
        var browser;

        before(function() {
            /* eslint-disable no-undef */
            global.window = {
                navigator: {
                    userAgent: UCUA
                }
            };
            browser = rerequire('../src/browser').default;
            /* eslint-enable no-undef */
        });

        it('correct', function() {
            expect(window.navigator.userAgent).to.be.equal(UCUA);
            expect(browser.name).to.be.equal('UC');
            /* eslint-disable no-unused-expressions */
            expect(browser.isUC).to.be.true;
            expect(browser.version.eq('8.6.0.199')).to.be.true;
            /* eslint-enable no-unused-expressions */
        });
    });

    describe('QQBrowser', function() {
        var browser;

        before(function() {
            /* eslint-disable no-undef */
            global.window = {
                navigator: {
                    userAgent: QQUA
                }
            };
            browser = rerequire('../src/browser').default;
            /* eslint-enable no-undef */
        });

        it('correct', function() {
            expect(window.navigator.userAgent).to.be.equal(QQUA);
            expect(browser.name).to.be.equal('QQ');
            /* eslint-disable no-unused-expressions */
            expect(browser.isQQ).to.be.true;
            expect(browser.version.eq('5.0')).to.be.true;
            /* eslint-enable no-unused-expressions */
        });
    });

    describe('Firefox', function() {
        var browser;

        before(function() {
            /* eslint-disable no-undef */
            global.window = {
                navigator: {
                    userAgent: FireFoxUA
                }
            };
            browser = rerequire('../src/browser').default;
            /* eslint-enable no-undef */
        });

        it('correct', function() {
            expect(window.navigator.userAgent).to.be.equal(FireFoxUA);
            expect(browser.name).to.be.equal('Firefox');
            /* eslint-disable no-unused-expressions */
            expect(browser.isFirefox).to.be.true;
            expect(browser.version.eq('1.0')).to.be.true;
            /* eslint-enable no-unused-expressions */
        });
    });

    describe('IE', function() {
        var browser;

        before(function() {
            /* eslint-disable no-undef */
            global.window = {
                navigator: {
                    userAgent: IEUA
                }
            };
            browser = rerequire('../src/browser').default;
            /* eslint-enable no-undef */
        });

        it('correct', function() {
            expect(window.navigator.userAgent).to.be.equal(IEUA);
            expect(browser.name).to.be.equal('IE');
            /* eslint-disable no-unused-expressions */
            expect(browser.isIE).to.be.true;
            expect(browser.version.eq('8.0')).to.be.true;
            /* eslint-enable no-unused-expressions */
        });
    });

    describe('IEMobile', function() {
        var browser;

        before(function() {
            /* eslint-disable no-undef */
            global.window = {
                navigator: {
                    userAgent: IEMobileUA
                }
            };
            browser = rerequire('../src/browser').default;
            /* eslint-enable no-undef */
        });

        it('correct', function() {
            expect(window.navigator.userAgent).to.be.equal(IEMobileUA);
            expect(browser.name).to.be.equal('IEMobile');
            /* eslint-disable no-unused-expressions */
            expect(browser.isIEMobile).to.be.true;
            expect(browser.version.eq('11.0')).to.be.true;
            /* eslint-enable no-unused-expressions */
        });
    });

    describe('Chrome', function() {
        var browser;

        before(function() {
            /* eslint-disable no-undef */
            global.window = {
                navigator: {
                    userAgent: ChromeUA
                }
            };
            browser = rerequire('../src/browser').default;
            /* eslint-enable no-undef */
        });

        it('correct', function() {
            expect(window.navigator.userAgent).to.be.equal(ChromeUA);
            expect(browser.name).to.be.equal('Chrome');
            /* eslint-disable no-unused-expressions */
            expect(browser.isChrome).to.be.true;
            expect(browser.version.eq('18.0.1025.166')).to.be.true;
            /* eslint-enable no-unused-expressions */
        });
    });

    describe('Chrome Webview', function() {
        var browser;

        before(function() {
            /* eslint-disable no-undef */
            global.window = {
                navigator: {
                    userAgent: ChromeWebviewUA
                }
            };
            browser = rerequire('../src/browser').default;
            /* eslint-enable no-undef */
        });

        it('correct', function() {
            expect(window.navigator.userAgent).to.be.equal(ChromeWebviewUA);
            expect(browser.name).to.be.equal('Chrome Webview');
            /* eslint-disable no-unused-expressions */
            expect(browser.isWebview).to.be.true;
            expect(browser.version.eq('18.0.1025.166')).to.be.true;
            /* eslint-enable no-unused-expressions */
        });
    });

    describe('AndroidBrowser', function() {
        var browser;

        before(function() {
            /* eslint-disable no-undef */
            global.window = {
                navigator: {
                    userAgent: AndroidBrowserUA
                }
            };
            browser = rerequire('../src/browser').default;
            /* eslint-enable no-undef */
        });

        it('correct', function() {
            expect(window.navigator.userAgent).to.be.equal(AndroidBrowserUA);
            expect(browser.name).to.be.equal('Android');
            /* eslint-disable no-unused-expressions */
            expect(browser.isAndroid).to.be.true;
            expect(browser.version.eq('4.2')).to.be.true;
            /* eslint-enable no-unused-expressions */
        });
    });

    describe('Safari', function() {
        var browser;

        before(function() {
            /* eslint-disable no-undef */
            global.window = {
                navigator: {
                    userAgent: SafariUA
                }
            };
            browser = rerequire('../src/browser').default;
            /* eslint-enable no-undef */
        });

        it('correct', function() {
            expect(window.navigator.userAgent).to.be.equal(SafariUA);
            expect(browser.name).to.be.equal('Safari');
            /* eslint-disable no-unused-expressions */
            expect(browser.isSafari).to.be.true;
            expect(browser.version.eq('7.0')).to.be.true;
            /* eslint-enable no-unused-expressions */
        });
    });

    describe('iOS Webview', function() {
        var browser;

        before(function() {
            /* eslint-disable no-undef */
            global.window = {
                navigator: {
                    userAgent: iOSWebviewUA
                }
            };
            browser = rerequire('../src/browser').default;
            /* eslint-enable no-undef */
        });

        it('correct', function() {
            expect(window.navigator.userAgent).to.be.equal(iOSWebviewUA);
            expect(browser.name).to.be.equal('iOS Webview');
            /* eslint-disable no-unused-expressions */
            expect(browser.isWebview).to.be.true;
            expect(browser.version.eq('6.0')).to.be.true;
            /* eslint-enable no-unused-expressions */
        });
    });
});