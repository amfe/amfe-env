import {expect} from 'chai';
import Version from '../src/version';

describe('test Version Class', function () {
    describe('constrcutor', function() {
        it('with value', function() {
            var str = '1.0.0';
            var ver = new Version(str);
            expect(ver).to.be.instanceof(Version);
            expect(ver.val).to.be.equal(str);
        });

        it('without value', function() {
            var ver = new Version();
            expect(ver).to.be.instanceof(Version);
            /* eslint-disable no-unused-expressions */
            expect(ver.val).to.be.empty;
            /* eslint-enable no-unused-expressions */
        });
    });

    it('toString', function() {
        var str = '1.0.0';
        var ver = new Version(str);
        expect(ver.toString()).to.be.equal(str);
    });

    it('gt', function() {
        var a = '1.0.0';
        var ver = new Version(a);
        /* eslint-disable no-unused-expressions */
        expect(ver.gt('0.9.9')).to.be.true;
        expect(ver.gt('1.0.0')).to.be.false;
        expect(ver.gt('1.0.1')).to.be.false;
        /* eslint-enable no-unused-expressions */
    });

    it('gte', function() {
        var a = '1.0.0';
        var ver = new Version(a);
        /* eslint-disable no-unused-expressions */
        expect(ver.gte('0.9.9')).to.be.true;
        expect(ver.gte('1.0.0')).to.be.true;
        expect(ver.gte('1.0.1')).to.be.false;
        /* eslint-enable no-unused-expressions */
    });

    it('lt', function() {
        var a = '1.0.0';
        var ver = new Version(a);
        /* eslint-disable no-unused-expressions */
        expect(ver.lt('0.9.9')).to.be.false;
        expect(ver.lt('1.0.0')).to.be.false;
        expect(ver.lt('1.0.1')).to.be.true;
        /* eslint-enable no-unused-expressions */
    });

    it('lte', function() {
        var a = '1.0.0';
        var ver = new Version(a);
        /* eslint-disable no-unused-expressions */
        expect(ver.lte('0.9.9')).to.be.false;
        expect(ver.lte('1.0.0')).to.be.true;
        expect(ver.lte('1.0.1')).to.be.true;
        /* eslint-enable no-unused-expressions */
    });

    it('eq', function() {
        var a = '1.0.0';
        var ver = new Version(a);
        /* eslint-disable no-unused-expressions */
        expect(ver.eq('0.9.9')).to.be.false;
        expect(ver.eq('1.0.0')).to.be.true;
        expect(ver.eq('1.0.1')).to.be.false;
        /* eslint-enable no-unused-expressions */
    });

    it('static compare', function() {
        var a = '1.0.0';
        expect(Version.compare(a, '0.9.9')).to.be.equal(1);
        expect(Version.compare(a, '1.0.0')).to.be.equal(0);
        expect(Version.compare(a, '1.0.1')).to.be.equal(-1);
    });
});