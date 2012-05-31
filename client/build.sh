#!/bin/sh

echo 'Building app...'
rm -rf application-build
node tools/r.js -o build-profile.js

echo 'Generating documents...'
rm -rf docs
docco application/app/*.coffee application/app/book/*.coffee application/app/toc/*.coffee