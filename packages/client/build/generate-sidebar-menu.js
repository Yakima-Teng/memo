const path = require('path')
const glob = require('glob')
const fse = require('fs-extra')

// 注意路径的末尾要放一个斜杠，这样才会只匹配目录（不会匹配文件）
let arr = glob.sync(path.join(__dirname, '../docs/*/'))
arr = arr.map((folderPath) => {
    const folderName = folderPath.replace(path.join(__dirname, '../docs/'), '').replace(/\/$/, '')
    return {
        folderPath,
        folderName,
        files: (() => {
            const fileNamesUnderFolder = glob.sync(path.join(folderPath, './*'), { nodir: true })
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
console.log(JSON.stringify(arr, null, 2))

exports.generateSidebarMenus = () => {
    const menus = [
        ['/SUMMARY', '总论'],
        {
            title: '软技能',
            initialOpenGroupIndex: -1, // optional, defaults to 0, defines the index of initially opened subgroup
            children: [
                ['/软技能/科学上网', '科学上网'],
            ],
        },
    ]

    arr.forEach((folder) => {
        menus.push({
            title: folder.folderName,
            initialOpenGroupIndex: -1, // optional, defaults to 0, defines the index of initially opened subgroup
            children: (folder.files || []).map((file) => {
                const targetPath = `/${folder.folderName}/${file.fileName}`
                const targetTitle = file.fileTitle
                return [targetPath, targetTitle]
            })
        })
    })

    menus.push({
        title: '实用网站',   // required
        path: '/其他/实用网站',      // optional, link of the title, which should be an absolute path and must exist
        collapsable: false, // optional, defaults to true
        sidebarDepth: 1,    // optional, defaults to 1
        children: [],
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
