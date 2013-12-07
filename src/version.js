(function(window, lib) {
    lib.env = lib.env || {};
    
    lib.version = function(){
        return Version;
    };
    
    
    function Version(string){
        this.string = string;
    };
    Version.prototype.toString = function(){
        return this.string;
    };
    Version.prototype.valueOf = function(){
        var v = this.toString().split(".");
        var r = [];
        for(var i = 0; i < v.length; i++) {
            var n = parseInt(v[i],10);
            if(window.isNaN(n)) {
                n = 0;
            }
            var s = n.toString();
            if(s.length < 5)
            {
                s = Array(6-s.length).join("0") + s;
            }
            r.push(s);
            if(r.length === 1)
            {
                r.push(".");
            }
        }
        return window.parseFloat(r.join(""));
        
    };
    
    Version.prototype.higherThan = function(v) {
        return Version.compare(this,v) > 0;
    };
    Version.prototype.lowerThan = function(v) {
        return Version.compare(this,v) < 0;
    };
    Version.prototype.is = function(v) {
        return Version.compare(this,v) === 0;
    };
    Version.compare = function (v1,v2){
        
        v1 = v1.toString().split(".");
        v2 = v2.toString().split(".");
        
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
    
    for(var p in lib.env) {
        if(lib.env[p] && lib.env[p].version) {
            lib.env[p].version = new Version(lib.env[p].version);
        }
    }

    
})(window, window['lib'] || (window['lib'] = {}));