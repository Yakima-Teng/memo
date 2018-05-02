'use strict'

const gulp = require('gulp')
const fs = require('fs')
const scp = require('gulp-scp2')
const config = require('./config')
let arrFileNames = []

// 自动生成docs/SUMMARY.md文件（手动生成该文件太麻烦了-_-）
gulp.task('docs:generateSummary', () => {
  const srcArr = ['./docs/*.md', '!./docs/README.md', '!./docs/SUMMARY.md']
  return gulp.src(srcArr)
    .on('data', file => {
      const filePath = file.history[0]
      const fileName = filePath.split(/[\\/]/).reverse()[0]
      arrFileNames.push(fileName)
    })
    .on('end', function () {
      let textToWrite = '# 目录\n' +
        '\n' +
        '* [前言](README.md)\n' +
        arrFileNames.map(fileName => {
          return `- [${fileName.replace('.md', '')}](${fileName})`
        }).join('\n')
      fs.writeFile('./docs/SUMMARY.md', textToWrite, {
        flag: 'w',
        encoding: 'utf-8',
        mode: '0666'
      }, function (err) {
        if (err) {
          console.log("文件写入失败")
        } else {
          console.log("文件写入成功");
        }
      })
    })
})

const deploymentConfig = config.deployment
gulp.task('deployToServer', () => {
  return gulp.src(deploymentConfig.src)
    .pipe(scp({
      host: deploymentConfig.host,
      username: deploymentConfig.username,
      password: deploymentConfig.password,
      dest: deploymentConfig.dest,
      readyTimeout: deploymentConfig.readyTimeout
    }))
    .on('error', e => {
      console.log(e)
    })
})
