const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');
const webpackServerConfig = require('./webpackServerConfig');

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    noInfo: false,
    historyApiFallback: true,
    proxy: [
        {
            context: ['/api/'],
            target: process.env.HOST || 'http://localhost:8000',
            secure: false,
            autoRewrite: true,
            "ws": true,
            logLevel: "debug",
            pathRewrite: {
                "^/api/": "/"
            }
        }, {
            context: ['/oss/'],
            headers: { Host: "new-pgc.oss-cn-shanghai.aliyuncs.com" },
            target: "http://new-pgc.oss-cn-shanghai.aliyuncs.com",
            pathRewrite: {
                "^/oss/": "/"
            }
        }
    ]
}).listen(webpackServerConfig.port, webpackServerConfig.host, function (err, result) {
    if (err) {
        console.log(err, result);
    }
    console.log(`Listening at http://${webpackServerConfig.host}:${webpackServerConfig.port}/`);
});
