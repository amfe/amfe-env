import {expect} from 'chai';
import {rerequire} from 'mocha-jsdom';

describe('detect aliapp info from ua', function() {
    const iPhoneUA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1';
    const TBUA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1 AliApp(TB/5.0.0) WindVane/1.0.0';
    const TBPDUA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1 AliApp(TB-PD/5.0.0) WindVane/1.0.0';

    describe('Not Taobao', function() {
        var aliapp;

        before(function() {
            /* eslint-disable no-undef */
            global.window = {
                navigator: {
                    userAgent: iPhoneUA
                }
            };
            aliapp = rerequire('../src/aliapp').default;
            /* eslint-enable no-undef */
        });

        it('correct', function() {
            expect(window.navigator.userAgent).to.be.equal(iPhoneUA);
            /* eslint-disable no-unused-expressions */
            expect(aliapp).to.be.false;
            /* eslint-enable no-unused-expressions */
        });
    });

    describe('Mobile Taobao', function() {
        var aliapp;

        before(function() {
            /* eslint-disable no-undef */
            global.window = {
                navigator: {
                    userAgent: TBUA
                }
            };
            aliapp = rerequire('../src/aliapp').default;
            /* eslint-enable no-undef */
        });

        it('correct', function() {
            expect(window.navigator.userAgent).to.be.equal(TBUA);
            expect(aliapp.appname).to.be.equal('TB');
            expect(aliapp.platform).to.be.equal('iPhone');
            /* eslint-disable no-unused-expressions */
            expect(aliapp.version.eq('5')).to.be.true;
            expect(aliapp.windvane.eq('1')).to.be.true;
            /* eslint-enable no-unused-expressions */
        });
    });

     describe('Taobao Pad', function() {
        var aliapp;

        before(function() {
            /* eslint-disable no-undef */
            global.window = {
                navigator: {
                    userAgent: TBPDUA
                }
            };
            aliapp = rerequire('../src/aliapp').default;
            /* eslint-enable no-undef */
        });

        it('correct', function() {
            expect(window.navigator.userAgent).to.be.equal(TBPDUA);
            expect(aliapp.appname).to.be.equal('TB-PD');
            expect(aliapp.platform).to.be.equal('iPad');
            /* eslint-disable no-unused-expressions */
            expect(aliapp.version.eq('5')).to.be.true;
            expect(aliapp.windvane.eq('1')).to.be.true;
            /* eslint-enable no-unused-expressions */
        });
    });

    describe('Poplayer', function() {
        var aliapp;

        before(function() {
            /* eslint-disable no-undef */
            global.window = {
                '_ua_popLayer': 'PopLayer/1.0.0',
                navigator: {
                    userAgent: TBUA
                }
            };
            aliapp = rerequire('../src/aliapp').default;
            /* eslint-enable no-undef */
        });

        it('correct', function() {
            expect(window.navigator.userAgent).to.be.equal(TBUA);
            /* eslint-disable no-unused-expressions */
            expect(aliapp.poplayer).to.be.true;
            expect(aliapp.poplayerVersion.eq('1')).to.be.true;
            /* eslint-enable no-unused-expressions */
        });
    });
});