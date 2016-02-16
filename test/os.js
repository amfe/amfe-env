import {expect} from 'chai';
import {rerequire} from 'mocha-jsdom';

describe('detect os info from ua', function() {
    const AndroidUA = 'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.23 Mobile Safari/537.36';
    const AndroidPadUA = 'Mozilla/5.0 (Linux; Android 4.3; Nexus 7 Build/JSS15Q) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.23 Safari/537.36';
    const iPhoneUA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1';
    const iPadUA = 'Mozilla/5.0 (iPad; CPU OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1';
    const WPUA = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 520)';
    const KindleUA = 'Mozilla/5.0 (Linux; U; en-us; KFAPWI Build/JDQ39) AppleWebKit/535.19 (KHTML, like Gecko) Silk/3.13 Safari/535.19 Silk-Accelerated=true';

    describe('android', function() {
        var os;

        before(function() {
            /* eslint-disable no-undef */
            global.window = {
                navigator: {
                    userAgent: AndroidUA
                }
            };
            os = rerequire('../src/os').default;
            /* eslint-enable no-undef */
        });

        it('correct', function() {
            expect(window.navigator.userAgent).to.be.equal(AndroidUA);
            expect(os.name).to.be.equal('Android');
            /* eslint-disable no-unused-expressions */
            expect(os.isAndroid).to.be.true;
            expect(os.version.eq('5.0')).to.be.true;
            /* eslint-enable no-unused-expressions */
        });
    });

    describe('android pad', function() {
        var os;

        before(function() {
            /* eslint-disable no-undef */
            global.window = {
                navigator: {
                    userAgent: AndroidPadUA
                }
            };
            os = rerequire('../src/os').default;
            /* eslint-enable no-undef */
        });

        it('correct', function() {
            expect(window.navigator.userAgent).to.be.equal(AndroidPadUA);
            expect(os.name).to.be.equal('AndroidPad');
            /* eslint-disable no-unused-expressions */
            expect(os.isAndroidPad).to.be.true;
            expect(os.version.eq('4.3')).to.be.true;
            /* eslint-enable no-unused-expressions */
        });
    });

    describe('iPhone', function() {
        var os;

        before(function() {
            /* eslint-disable no-undef */
            global.window = {
                navigator: {
                    userAgent: iPhoneUA
                }
            };
            os = rerequire('../src/os').default;
            /* eslint-enable no-undef */
        });

        it('correct', function() {
            expect(window.navigator.userAgent).to.be.equal(iPhoneUA);
            expect(os.name).to.be.equal('iPhone');
            /* eslint-disable no-unused-expressions */
            expect(os.isIPhone).to.be.true;
            expect(os.isIOS).to.be.true;
            expect(os.version.eq('9.1')).to.be.true;
            /* eslint-enable no-unused-expressions */
        });
    });

    describe('iPad', function() {
        var os;

        before(function() {
            /* eslint-disable no-undef */
            global.window = {
                navigator: {
                    userAgent: iPadUA
                }
            };
            os = rerequire('../src/os').default;
            /* eslint-enable no-undef */
        });

        it('correct', function() {
            expect(window.navigator.userAgent).to.be.equal(iPadUA);
            expect(os.name).to.be.equal('iPad');
            /* eslint-disable no-unused-expressions */
            expect(os.isIPad).to.be.true;
            expect(os.isIOS).to.be.true;
            expect(os.version.eq('9.1')).to.be.true;
            /* eslint-enable no-unused-expressions */
        });
    });

    describe('WindowsPhone', function() {
        var os;

        before(function() {
            /* eslint-disable no-undef */
            global.window = {
                navigator: {
                    userAgent: WPUA
                }
            };
            os = rerequire('../src/os').default;
            /* eslint-enable no-undef */
        });

        it('correct', function() {
            expect(window.navigator.userAgent).to.be.equal(WPUA);
            expect(os.name).to.be.equal('Windows Phone');
            /* eslint-disable no-unused-expressions */
            expect(os.isWindowsPhone).to.be.true;
            expect(os.version.eq('8.0')).to.be.true;
            /* eslint-enable no-unused-expressions */
        });
    });

    describe('UnkownDevice', function() {
        var os;

        before(function() {
            /* eslint-disable no-undef */
            global.window = {
                navigator: {
                    userAgent: KindleUA
                }
            };
            os = rerequire('../src/os').default;
            /* eslint-enable no-undef */
        });

        it('correct', function() {
            expect(window.navigator.userAgent).to.be.equal(KindleUA);
            expect(os.name).to.be.equal('unknown');
            /* eslint-disable no-unused-expressions */
            expect(os.version.eq('0')).to.be.true;
            /* eslint-enable no-unused-expressions */
        });
    });});