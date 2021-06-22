# Webpack

## 1、配置示例

```javascript
const webpackConfig = {
    entry: {
        bundle: resolve('src/index.lint.jsx'),
        componentsInFolders: glob.sync(resolve('src/components/*/*.js?(x)')),
        componentsInRoot: glob.sync(resolve('src/components/*.js?(x)')),
        api: glob.sync(resolve('src/api/*.js?(x)')),
        utils: glob.sync(resolve('src/utils/*.js?(x)')),
    },
    output: {
        path: resolve('dist'),
        filename: '[name].js',
        publicPath: '',
    },
    externals: {
        'zepto': 'window.$',
        'highcharts': 'window.Highcharts',
        'jsencrypt': 'window.JSEncrypt',
    },
    resolve: {
        extensions: ['.lint.jsx', '.jsx', '.js', '.css', '.ejs', '.scss', '.json', '.sass'],
        alias: {
            '@': resolve('src'),
            '@img': resolve('src/assets/img'),
            '@utils': resolve('src/utils'),
            '@css': resolve('src/assets/css'),
            '@component': resolve('src/components'),
        },
    },
    resolveLoader: {
        modules: [
            'node_modules',
        ],
    },
    // Some libraries import Node modules but don't use them in the browser.
    // Tell Webpack to provide empty mocks for them so importing them works.
    node: {
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [
                    'happypack/loader?id=babel',
                    conditionalCompiler,
                ],
                include: [resolve('src')],
            },
            {
                test: /\.(png|jpg|gif|svg|mp3)$/,
                loader: 'file-loader',
                exclude: /node_modules/,
                query: {
                    name: 'assets/img/[name].[ext]',
                    // name: 'assets/img/[path][module-img][name].[ext]',
                },
            },
            {
                test: /\.less$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'postcss-loader' },
                    {
                        loader: 'less-loader',
                        options: {
                            modifyVars: require('../package').theme,
                            javascriptEnabled: true,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: dllManifestForVendorCxg,
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: dllManifestForVendorCxgOthers,
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                customInterpolateName (url) {
                    if (/\[module-img\]/.test(url)) {
                        url = url.replace(/img[\\/]/g, '')
                        url = url.replace(/\[module-img\]/, '')
                        const folderName = url.replace(/^.*[\\/]([\w-]+)[\\/][\w-]+\.[\w]+/, '$1')
                        const fileName = url.replace(/^.+[\\/]([\w-]+\.[\w]+$)/, '$1')

                        url = `assets/img/${folderName}/${fileName}`
                        return url
                    }
                    return url
                },
            },
        }),
        new HappyPack({
            id: 'babel',
            threads: os.cpus().length,
            verbose: false,
            loaders: [
                {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: 'node_modules/.cache/babel-loader',
                    },
                },
            ],
        }),
        new CopyWebpackPlugin([
            {
                from: resolve('src/hbenv.js'),
                to: './assets/js/hbenv.js',
            },
            {
                from: resolve('example'),
                to: './example',
            },
            {
                from: resolve('favicon.ico'),
                to: './',
            },
        ]),
    ],
}

module.exports = webpackConfig
```

## 2、怎么配置输出多个chunk

通过配置不同的 entry 来生成不同的 chunk：

## 3、hash、chunkhash、contenthash

**hash**

hash是跟整个项目的构建相关，只要项目里有文件更改，
整个项目构建的hash值都会更改，并且全部文件都共用相同的hash值

**chunkhash**

采用hash计算的话，每一次构建后生成的哈希值都不一样，
即使文件内容压根没有改变。这样子是没办法实现缓存效果，
我们需要换另一种哈希值计算方式，即chunkhash。

chunkhash和hash不一样，
它根据不同的入口文件(Entry)进行依赖文件解析、构建对应的chunk，
生成对应的哈希值。
我们在生产环境里把一些公共库和程序入口文件区分开，单独打包构建，
接着我们采用chunkhash的方式生成哈希值，
那么只要我们不改动公共库的代码，就可以保证其哈希值不会受影响。

**contenthash**

在chunkhash的例子，我们可以看到由于index.css被index.js引用了，
所以共用相同的chunkhash值。
但是这样子有个问题，如果index.js更改了代码，
css文件就算内容没有任何改变，由于是该模块发生了改变，
导致css文件会重复构建。

这个时候，我们可以使用extra-text-webpack-plugin里的contenthash值，保证即使css文件所处的模块里就算其他文件内容改变，只要css文件内容不变，那么不会重复构建。

```javascript
var extractTextPlugin = require('extract-text-webpack-plugin'),
    path = require('path')

module.exports = {
    ...
    ...
    output: {
        path: path.join(__dirname, '/dist/js'),
        filename: 'bundle.[name].[chunkhash].js',
    },
    plugins: [
        new extractTextPlugin('../css/bundle.[name].[contenthash].css')
    ]
}
```

## 4、如何写一个loader

```javascript
const loaderUtils = require('loader-utils');

module.exports = function (source /* 逐个处理的文件内容 */) {
    const self = this
    const options = loaderUtils.getOptions(self)
    const resourcePath = self.resourcePath

    // 根据上面的一些信息处理resource

    return resource
}
```
