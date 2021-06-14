const path = require('path')
const glob = require('glob')
const fse = require('fs-extra')

const MapFolderNames = {
  'algorithms': '1.算法',
  'dom': '2.DOM操作',
  'build': '构建',
  'component': '组件',
  'comprehensive': '综合',
  'else': '其他',
  'es': 'ES语法',
  'html': 'HTML',
  'http': 'HTTP',
  'java': 'Java',
  'jvm': 'JVM',
  'maintenance': '运维',
  'mysql': 'MySQL',
  'project': '项目',
  'react': 'React',
  'safe': '安全',
  'site': '网站',
  'source': '源码',
  'spring': 'Spring',
  'style': '样式',
  'soft-skill': '软技能',
  'thread': '线程/进程',
}

// 注意路径的末尾要放一个斜杠，这样才会只匹配目录（不会匹配文件）
let arr = glob.sync(path.join(__dirname, '../docs/*/'))
arr = arr.map((folderPath) => {
  const folderName = folderPath.replace(path.join(__dirname, '../docs/'), '').replace(/\/$/, '')
  return {
    folderPath,
    folderName,
    files: (() => {
      const fileNamesUnderFolder = glob.sync(path.join(folderPath, './*'), {nodir: true})
      return fileNamesUnderFolder.map((filePath) => {
        return {
          filePath,
          fileName: filePath.replace(folderPath, ''),
          fileTitle: (() => {
            const fileContent = fse.readFileSync(filePath, {
              encoding: 'utf8',
              flag: 'r',
            })
            const matches = fileContent.match(/^#.*/)
            if (matches) {
              return matches[0].replace(/^[#\s]*/g, '')
            }
            return ''
          })(),
        }
      })
    })(),
  }
})

exports.generateSidebarMenus = () => {
  const menus = [
    ['/SUMMARY', '总论'],
  ]

  arr.forEach((folder) => {
    menus.push({
      title: MapFolderNames[folder.folderName] || folder.folderName,
      initialOpenGroupIndex: -1, // optional, defaults to 0, defines the index of initially opened subgroup
      children: (folder.files || []).map((file) => {
        const targetPath = `/${folder.folderName}/${file.fileName}`
        const targetTitle = file.fileTitle
        return [targetPath, targetTitle]
      })
    })
  })

  menus.push({
    title: '955工作生活平衡名单',   // required
    path: 'https://github.com/formulahendry/955.WLB',      // optional, link of the title, which should be an absolute path and must exist
    collapsable: false, // optional, defaults to true
    sidebarDepth: 1,    // optional, defaults to 1
    children: [],
  })
  return menus
}
