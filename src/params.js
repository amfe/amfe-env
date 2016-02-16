'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var params = {};
var search = window.location.search.replace(/^\?/, '');

if (search) {
    var splits = search.split('&');
    for (var i = 0; i < splits.length; i++) {
        splits[i] = splits[i].split('=');
        try {
            params[splits[i][0]] = decodeURIComponent(splits[i][1]);
            /* istanbul ignore next */
        } catch (e) {
            /* istanbul ignore next */
            params[splits[i][0]] = splits[i][1];
        }
    }
}

exports.default = params;