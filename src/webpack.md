[[toc]]

## Webpack {#webpack}

### Webpack配置示例 {#webpack-configuration}

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
        extensions: [
            '.lint.jsx',
            '.jsx',
            '.js',
            '.css',
            '.ejs',
            '.scss',
            '.json',
            '.sass',
        ],
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
                        const folderName = url.replace(
                            /^.*[\\/]([\w-]+)[\\/][\w-]+\.[\w]+/,
                            '$1'
                        )
                        const fileName = url.replace(
                            /^.+[\\/]([\w-]+\.[\w]+$)/,
                            '$1'
                        )

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

### 怎么配置输出多个chunk {#webpack-multi-chunks}

通过配置不同的 entry 来生成不同的 chunk。

### hash、chunkhash、contenthash {#webpack-hash}

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

只要内容不变，hash值就不变。

### 如何写一个loader {#webpack-loader}

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

### 如何写一个plugin {#webpack-plugin}

```javascript
module.exports = class FixedChunkIdPlugin {
    constructor (options) {
        this.options = options || {}
    }

    apply (compiler) {
        compiler.plugin('compilation', (compilation) =>
            compilation.plugin('before-chunk-ids', (chunks) => {
                chunks.forEach((chunk) => {
                    if (!chunk.id) {
                        /**
                         * 要求定义路由的chunk名时不要重名
                         * 我们现有的逻辑，如果页面chunk名重复的话会生成同一个页面js，
                         * 本来就是不允许重名的
                         */
                        chunk.id = chunk.name
                    }
                })
            })
        )
    }
}
```
