;(function(win, lib) {
    lib.env = lib.env || {};
    
    function Version(string){

        Object.defineProperty(this, 'val', {
            value: string.toString(),
            enumerable: true
        });
        
        this.gt = function(v) {
            return Version.compare(this, v) > 0;
        };

        this.gte = function(v) {
            return Version.compare(this, v) >= 0;
        };

        this.lt = function(v) {
            return Version.compare(this, v) < 0;
        };

        this.lte = function(v) {
            return Version.compare(this, v) <= 0;
        };

        this.eq = function(v) {
            return Version.compare(this, v) === 0;
        };
    };

    Version.prototype.toString = function() {
        return this.val;
    }

    Version.prototype.valueOf = function(){
        var v = this.val.split('.');
        var r = [];
        for(var i = 0; i < v.length; i++) {
            var n = parseInt(v[i],10);
            if (isNaN(n)) {
                n = 0;
            }
            var s = n.toString();
            if (s.length < 5) {
                s = Array(6 - s.length).join('0') + s;
            }
            r.push(s);
            if(r.length === 1) {
                r.push('.');
            }
        }
        return parseFloat(r.join(''));
    };

    Version.compare = function (v1,v2){
        v1 = v1.toString().split('.');
        v2 = v2.toString().split('.');
        
        for(var i = 0; i < v1.length || i < v2.length; i++) {
            var n1 = parseInt(v1[i],10),  n2 = parseInt(v2[i],10);
            
            if(window.isNaN(n1)) {
                n1 = 0;
            }
            if(window.isNaN(n2)) {
                n2 = 0;
            }
            if( n1 < n2 ) {
                return -1;
            }
            else if( n1 > n2) {
                return 1;
            }
        }
        return 0;
    }

    
    lib.version = function(s) {
        return new Version(s);
    };
})(window, window['lib'] || (window['lib'] = {}));