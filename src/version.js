'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Version = function () {
    _createClass(Version, null, [{
        key: 'compare',
        value: function compare(v1, v2) {
            v1 = v1.toString().split('.');
            v2 = v2.toString().split('.');

            for (var i = 0; i < v1.length || i < v2.length; i++) {
                var n1 = parseInt(v1[i], 10);
                var n2 = parseInt(v2[i], 10);

                /* istanbul ignore if */
                if (isNaN(n1)) {
                    n1 = 0;
                }

                /* istanbul ignore if */
                if (isNaN(n2)) {
                    n2 = 0;
                }
                if (n1 < n2) {
                    return -1;
                } else if (n1 > n2) {
                    return 1;
                }
            }
            return 0;
        }
    }]);

    function Version(v) {
        _classCallCheck(this, Version);

        if (v) {
            this.val = v.toString();
        } else {
            this.val = '';
        }
    }

    _createClass(Version, [{
        key: 'gt',
        value: function gt(v) {
            return Version.compare(this, v) > 0;
        }
    }, {
        key: 'gte',
        value: function gte(v) {
            return Version.compare(this, v) >= 0;
        }
    }, {
        key: 'lt',
        value: function lt(v) {
            return Version.compare(this, v) < 0;
        }
    }, {
        key: 'lte',
        value: function lte(v) {
            return Version.compare(this, v) <= 0;
        }
    }, {
        key: 'eq',
        value: function eq(v) {
            return Version.compare(this, v) === 0;
        }
    }, {
        key: 'toString',
        value: function toString() {
            return this.val.toString();
        }
    }]);

    return Version;
}();

exports.default = Version;