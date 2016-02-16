#!/bin/sh

# variables
basedir=`dirname "$0"`
workdir=`dirname "$basedir"`
samplesdir="$workdir/samples"
packbin="$basedir/readpack.js"
main=`$packbin main`
name=`$packbin name`

echo "generate $samplesdir/bundle.js ..."
browserify -r "./$main:$name" -t [babelify] --debug > "$samplesdir/bundle.js"
echo "generate success"