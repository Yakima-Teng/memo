const Client = require('ssh2-sftp-client');
const { join } = require('./utils')
const config = require('../config')

const deployConfig = config.deployment

async function main () {
    const client = new Client();
    try {
        await client.connect({
            host: deployConfig.host,
            port: deployConfig.port,
            username: deployConfig.username,
            password: deployConfig.password,
        })
        client.on('upload', info => {
            console.log(`已上传文件：${info.source.replace(join('/docs/.vuepress/dist/'), '')} ==> ${info.destination}`);
        })
        // 不需要全部文件都上传的话把下面这行注释掉，避免上传图片等，避免速度慢
        await client.uploadDir(join('/docs/.vuepress/dist'), '/www/wwwroot/www.lookmaths.com/client/dist')
    } catch (err) {
        console.log(err)
    } finally {
        await client.end();
    }
}

main()
    .catch(err => {
        console.log(`main error: ${err.message}`);
    });
