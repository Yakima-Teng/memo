#!/usr/bin/env bash
cd ./docs/.vuepress || exit
rm -rf dist
cd ../../ || exit
npm run docs:build
cd ./docs/.vuepress/dist || exit
git init
git add -A
git commit -m 'update book'
export http_proxy="http://127.0.0.1:1087"
git push -f https://github.com/Yakima-Teng/memo.git master:gh-pages
cd ../ || exit
rm -rf dist
