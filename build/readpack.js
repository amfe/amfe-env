#!/usr/bin/env node

var fs = require('fs');
var path = require('path');

var args = process.argv.slice(2);
process.stdout.on('error', process.exit);

var packpath = path.join(process.cwd(), 'package.json');
var pkg = require(packpath);
var key = args[0];
var value;

try {
    value = eval('(pkg.' + key + ')');
    process.stdout.write(value || '');
} catch(e) {
    process.stdout.write('');
    process.exit(1);
}


