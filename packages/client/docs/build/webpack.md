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
