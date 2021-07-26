const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
    publicPath: '',
    devServer: {
        port: 8081,
        disableHostCheck: true,
    },
    configureWebpack: {
        plugins: [
            new MonacoWebpackPlugin()
        ]
    }
}
