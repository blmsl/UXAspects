var path = require('path');
var webpack = require('webpack');

var libAssetsConfig = {

    entry: path.join(process.cwd(), 'src', 'index.ts'),

    output: {
        path: path.join(process.cwd(), 'dist', 'docs', 'assets', 'lib'),
        filename: 'index.js',
        libraryTarget: 'umd'
    },

    resolve: {
        extensions: ['.ts', '.js']
    },

    externals: [
        /^@angular\//,
        /^rxjs\//
    ],

    module: {
        rules: [{
                test: /\.html$/,
                use: 'raw-loader'
            }, {
                test: /\.ts$/,
                use: [{
                    loader: 'awesome-typescript-loader',
                    options: {
                        configFileName: path.join(process.cwd(), 'src', 'tsconfig-build.json')
                    },
                }, {
                    loader: 'angular2-template-loader'
                }]
            }, {
                test: /\.less$/,
                use: ['raw-loader', 'less-loader']
            }, {
                test: path.join(process.cwd(), 'node_modules', 'webpack-dev-server', 'client'),
                loader: 'null-loader'
            }
        ]
    },

    plugins: [
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)@angular/,
            path.resolve(process.cwd(), 'docs')
        )
    ]
};

module.exports = libAssetsConfig;