import {expect} from 'chai';

describe('parse querystring from url into params', function() {
    var params;
    var str = '?a=b&_=123&x=http%3A%2F%2Fm.taobao.com';

    before(function() {
        /* eslint-disable no-undef */
        global.window = {
            location: {
                search: str
            }
        };
        params = require('../src/params').default;
        /* eslint-enable no-undef */
    });

    it('deeply equal', function() {
        expect(window.location.search).to.be.equal(str);
        expect(params).to.be.deep.equal({
            'a': 'b',
            '_': '123',
            'x': 'http://m.taobao.com'
        });
    });
});