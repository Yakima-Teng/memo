#!/usr/bin/env bash
cd docs
rm -rf _book
gitbook build
cd _book
git init
git add -A
git commit -m 'update book'
git push -f https://github.com/Yakima-Teng/memo.git master:gh-pages
