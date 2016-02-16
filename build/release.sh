#!/bin/sh

# variables
basedir=`dirname "$0"`
workdir=`dirname "$basedir"`
releasedir="$workdir/release"
docdir="$workdir/doc"
packbin="$basedir/readpack.js"
repourl=`$packbin repository.url`
repover=`$packbin version`

# clear release dir
echo "clear $releasedir"
if [ -d "$releasedir" ]; then
    rm -rf "$releasedir"
fi

echo "create $releasedir"
mkdir "$releasedir"

# init git repo
echo "entering $releasedir & init git repo"
cd $releasedir
git init
git remote add origin $repourl
git pull --all
git checkout -b release

checkRelease=`git branch -r | grep release`

if [ x"origin/release" == x"$checkRelease" ]; then
    git pull origin release
fi
echo "leaving $releasedir"
cd ..

# copy project files
cp -v "$workdir/package.json" "$releasedir/package.json"
cp -v "$workdir/README.md" "$releasedir/README.md"
cp -vr "$workdir/dist" "$releasedir/src"

# commit
echo "entering $releasedir & git commit & push"
cd $releasedir
git add -A
git commit -m "Publish $repover"
git push origin release --force

# publish
npm publish