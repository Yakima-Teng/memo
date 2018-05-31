'use strict'

const gulp = require('gulp')
const fs = require('fs')
const scp = require('gulp-scp2')
const path = require('path')
const config = require('./config')
const objFileNames = {
  // '_root': false
}
let arrFileNames = [
  // { folder: '_root', fileNames: [] },
  // .etc.
]

// 自动生成docs/SUMMARY.md文件（手动生成该文件太麻烦了-_-）
gulp.task('docs:generateSummary', () => {
  const srcArr = ['./docs/**/*.md', '!./docs/README.md', '!./docs/SUMMARY.md', '!./docs/_book/**/*', '!./docs/node_modules/**/*']
  return gulp.src(srcArr)
    .on('data', file => {
      const filePath = file.history[0]
      const arrFolderAndFileName = filePath.split(path.join(__dirname, 'docs'))[1].split(/[\\/]/)
      arrFolderAndFileName.shift()
      if (arrFolderAndFileName.length === 1) {
        const fileName = arrFolderAndFileName[0]
        if (!objFileNames['_root']) {
          arrFileNames.push({
            folderName: '_root',
            fileNames: [fileName]
          })
          objFileNames['_root'] = true
        } else {
          arrFileNames.find(item => item.folderName === '_root').fileNames.push(fileName)
        }
      } else if (arrFolderAndFileName.length === 2) {
        const folderName = arrFolderAndFileName[0]
        const fileName = arrFolderAndFileName[1]
        if (!objFileNames[folderName]) {
          arrFileNames.push({
            folderName: folderName,
            fileNames: [fileName]
          })
          objFileNames[folderName] = true
        } else {
          arrFileNames.find(item => item.folderName === folderName).fileNames.push(fileName)
        }
      }
      arrFileNames.sort()
      arrFileNames.forEach(item => item.fileNames.sort())
    })
    .on('end', function () {
      let textToWrite = '# 目录\n' +
        '\n' +
        '* [前言](README.md)\n' +
        arrFileNames.map(folder => {
          const folderName = folder.folderName
          if (folderName !== '_root') {
            let text = `* [${folderName}](./${folderName}/README.md)\n`
            text += folder.fileNames.filter(fileName => fileName !== 'README.md').map(fileName => {
              return `  * [${fileName.replace('.md', '')}](./${folderName}/${fileName})`
            }).join('\n')
            return text
          } else {
            return folder.fileNames.map(fileName => {
              return `* [${fileName.replace('.md', '')}](./${fileName})`
            }).join('\n')
          }
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
