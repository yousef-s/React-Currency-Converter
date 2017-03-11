var webpack = require('webpack');
var path  = require('path');
var postCSSValues = require('postcss-modules-values');

module.exports = {
    devtool: 'inline-source-map',
    entry: [
        'webpack-dev-server/client?http://localhost:8081/',
        'webpack/hot/only-dev-server',
        'mocha!./src/mocha-test-context.js'
    ],
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'tests'),
        // publicPath: 'http://localhost:8081/tests'
    },
    module: {
        loaders: [
            {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/, query: { presets: ['es2015', 'react'] }},
            {test: /\.json$/, loader: 'json-loader'},
            {test: /\.css$/, loader: 'style!css-loader?camelCase&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'}
        ],
        noParse: [
            /node_modules\/sinon\//,
        ]
    },
    resolve: {
        alias: {
            'sinon': 'sinon/pkg/sinon'
        }
    },
    externals: {
        'cherrio': 'window',
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
    },
    postcss: [postCSSValues],
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};