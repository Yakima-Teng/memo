# 博客

## 开发环境

- Node v20.12.0

## nginx核心配置

```text
root /www/wwwroot/www.orzzone.com/dist;
    
location / {
    try_files $uri $uri.html $uri/ index.html =404;
}
```
