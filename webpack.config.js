var webpack = require('webpack');
var path  = require('path');
var postCSSValues = require('postcss-modules-values');

module.exports = {
    devtool: 'inline-source-map',
    entry: [
    'babel-polyfill',
    'webpack-dev-server/client?http://localhost:8080/',
    'webpack/hot/only-dev-server',
    './src'
    ],
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    resolve: {
        modulesDirectories: ['node_modules', 'src'],
        extensions: ['', '.js']
    },
    module: {
        loaders: [
            {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel',
                query: {
                    presets: ['react', 'es2015'],
                }
            },
            {test: /\.css$/, loader: 'style!css-loader?camelCase&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'}
            ]
    },
    postcss: [postCSSValues],
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
}