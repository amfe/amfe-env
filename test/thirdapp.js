import {expect} from 'chai';
import {rerequire} from 'mocha-jsdom';

describe('detect thirdapp info from ua', function() {
    const WeiboUA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1 Weibo';
    const WeixinUA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1 MicroMessenger';

    describe('Weibo', function() {
        var thirdapp;

        before(function() {
            /* eslint-disable no-undef */
            global.window = {
                navigator: {
                    userAgent: WeiboUA
                }
            };
            thirdapp = rerequire('../src/thirdapp').default;
            /* eslint-enable no-undef */
        });

        it('correct', function() {
            expect(window.navigator.userAgent).to.be.equal(WeiboUA);
            expect(thirdapp.appname).to.be.equal('Weibo');
            /* eslint-disable no-unused-expressions */
            expect(thirdapp.isWeibo).to.be.true;
            /* eslint-enable no-unused-expressions */
        });
    });

    describe('Weixin', function() {
        var thirdapp;

        before(function() {
            /* eslint-disable no-undef */
            global.window = {
                navigator: {
                    userAgent: WeixinUA
                }
            };
            thirdapp = rerequire('../src/thirdapp').default;
            /* eslint-enable no-undef */
        });

        it('correct', function() {
            expect(window.navigator.userAgent).to.be.equal(WeixinUA);
            expect(thirdapp.appname).to.be.equal('Weixin');
            /* eslint-disable no-unused-expressions */
            expect(thirdapp.isWeixin).to.be.true;
            /* eslint-enable no-unused-expressions */
        });
    });
});