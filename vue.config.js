// vue.config.js
const CopyWebpackPlugin = require('copy-webpack-plugin');

const path = require('path');
module.exports = {
    lintOnSave: false,
    pages: {
        index: {
            entry: 'test/main.js',
            template: 'public/index.html',
            filename: 'index.html'
        }
    },
    chainWebpack: config => {
        config.module
            .rule('js')
            .include.add(path.resolve(__dirname, 'packages')).end()
            .use('babel')
            .loader('babel-loader')
            .tap(options => {
                return options;
            })
    },
    configureWebpack: {
        plugins: [
            new CopyWebpackPlugin(
                [
                    {
                        from: __dirname + '/document/package.json',
                        to: __dirname + '/dist',
                    },
                    {
                        from: __dirname + '/document/README.md',
                        to: __dirname + '/dist',
                    },
                    {
                        from: __dirname + '/document/.npmignore',
                        to: __dirname + '/dist',
                    },
                ]
            ),
        ],
    },

}