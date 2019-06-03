const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const webpackServerConfig = require('./webpackServerConfig');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const appName = (process.env.appName && process.env.appName !== '' ? process.env.appName : 'saifu').trim();

const isPro = process.env.NODE_ENV === 'production';

let revision = "000000000"
try {
    revision = require('child_process').execSync('git rev-parse HEAD')
        .toString().trim().slice(0, 9)
} catch (error) {
    console.log("please install git")
}

const definePluginOpt = {
    SERVER_PORT: process.env.port || 8000
}

if (isPro) {
    definePluginOpt['process.env.NODE_ENV'] = JSON.stringify('production')
}

const appEntry = [`app`];
const plugins = [
    new HtmlWebpackPlugin({
        title: "赛辅",
        hash: true,
        template: 'template.html',
        ext: {
            revision: revision || "",
            buildDate: new Date().toLocaleString()
        }
    }),
    new webpack.DefinePlugin(definePluginOpt),
];
const optimization = {
    runtimeChunk: {
        name: 'manifest'
    },
    splitChunks: {
        chunks: 'async',
        minSize: 30000,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        name: false,
        cacheGroups: {
            vendor: {
                name: 'vendor',
                chunks: 'initial',
                priority: -10,
                reuseExistingChunk: false,
                test: /node_modules\/(.*)\.js/
            },
            styles: {
                name: 'styles',
                test: /\.(styl|css)$/,
                chunks: 'all',
                minChunks: 1,
                reuseExistingChunk: true,
                enforce: true
            }
        }
    }
}

if (isPro) {
    plugins.push(
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    );
    optimization.minimizer = [
        new UglifyJsPlugin({
            cache: true,
            parallel: true,
            sourceMap: true
        }),
        new OptimizeCSSAssetsPlugin({})  // use OptimizeCSSAssetsPlugin
    ];
} else {
    appEntry.unshift(`webpack-dev-server/client?http://${webpackServerConfig.host}:${webpackServerConfig.port}`, 'webpack/hot/only-dev-server');
    plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    );
}

module.exports = {
    mode: isPro ? 'production' : 'development',
    context: path.resolve(__dirname, 'src'),
    devtool: isPro ? 'source-map' : 'inline-source-map',
    entry: {
        app: appEntry,
        vendor: [
            "react",
            "react-dom",
            "react-router"
        ]
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, `build/${appName}`),
        // 使用 静态资源服务器
        publicPath: isPro ? `` : "/",
        chunkFilename: '[name].js'
    },
    plugins,
    resolve: {
        extensions: ['.js', '.jsx', 'css'],
        modules: [
            path.resolve(__dirname, 'node_modules'),
            path.join(__dirname, './src')
        ]
    },
    optimization,
    module: {
        rules: [
            {
                test: /\.(jsx|js)$/,
                exclude: /(node_modules|bower_components)/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: isPro ? MiniCssExtractPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader', options: { minimize: true } }
                    ]
                }) : ['style-loader', 'css-loader']
            },
            {
                test: /\.styl$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "stylus-loader" // compiles stylus to CSS
                }]
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                use: ['file-loader?limit=1000&name=[md5:hash:base64:10].[ext]']
            }
        ]
    }
};
