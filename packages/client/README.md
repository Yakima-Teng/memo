# 《前端程序员备忘录》

## 常用命令

### 本地开发

```bash
npm run docs:dev
```

### 构建正式产物

```bash
npm run docs:build
```

说明：构建产物在docs/.vuepress/dist目录下

### 部署到github的gh-pages

```bash
npm run deploy:gh-pages
```

说明：这个命令会先编译再部署，故无需另外进行编译命令。

### 部署到服务器

```bash
npm run deploy:server
```

说明：先要将config-example.js文件重命名为config.js，
然后填上服务器的部署信息。再执行上述命令。

### 编译并部署到服务器上

```bash
npm run buildAndDeployToServer
```

其实质是`npm run docs:build && npm run deploy:server`。

### 编译并部署到所有远端（gh-pages和服务器）

```bash
npm run buildAndDeploy
```

## nginx配置

```
if ($http_accept_language ~* ^zh){
    rewrite ^/$ /memo/index.html?lang=zh redirect;
}

if ($http_accept_language ~* ^en){
    rewrite ^/$ /memo/index.html?lang=en redirect;
}
location /memo {
    alias /www/wwwroot/www.lookmaths.com/client/dist/;
}
```
