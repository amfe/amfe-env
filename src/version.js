;
(function(window, lib) {
    lib.env = lib.env || {};
    
    function Version(string){
        this.string = string.toString();
    };

    Version.prototype.toString = function(){
        return this.string;
    };

    Version.prototype.valueOf = function(){
        var v = this.toString().split('.');
        var r = [];
        for(var i = 0; i < v.length; i++) {
            var n = parseInt(v[i],10);
            if(window.isNaN(n)) {
                n = 0;
            }
            var s = n.toString();
            if(s.length < 5) {
                s = Array(6-s.length).join('0') + s;
            }
            r.push(s);
            if(r.length === 1) {
                r.push('.');
            }
        }
        return window.parseFloat(r.join(''));
    };
    
    Version.prototype.gt = function(v) {
        return Version.compare(this,v) > 0;
    };

    Version.prototype.gte = function(v) {
        return Version.compare(this,v) >= 0;
    };

    Version.prototype.lt = function(v) {
        return Version.compare(this,v) < 0;
    };

    Version.prototype.lte = function(v) {
        return Version.compare(this,v) <= 0;
    };

    Version.prototype.eq = function(v) {
        return Version.compare(this,v) === 0;
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

    
    lib.version = function(string){
        return new Version(string);
    };
    
})(window, window['lib'] || (window['lib'] = {}));