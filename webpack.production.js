var webpack = require('webpack');
var { CleanWebpackPlugin } = require('clean-webpack-plugin');
// var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
//var JavaScriptObfuscator = require('webpack-obfuscator');


module.exports = function () {

    var configs = require('./webpack.development.js')();

    configs.forEach(function (config) {
        // config.devtool = false;
        config.plugins.push(new CleanWebpackPlugin());
        // config.plugins.push(new UglifyJSPlugin({
        //     uglifyOptions: {
        //         warnings: false,
        //         beautify: false,
        //         compress: true,
        //         minimize: true,
        //         comments: false
        //     }

        // }))

    });

    return configs;
}