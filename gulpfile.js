var gulp = require('gulp');
var webpack = require('webpack');
var util = require('gulp-util');
var path = require('path');
var express = require('express');
var merge = require('merge');

var algor = "javascripts/algorithm/";

var entry = {
    main: [path.resolve(__dirname, "javascripts/main.js")],
    vendors: ['react','react-router', 'three', 'material-ui', 'codemirror'],
    treePrint: [path.resolve(__dirname, algor + 'tree_print/main.js')],
    treePrint2: [path.resolve(__dirname, algor + 'tree_print_2/main.js')],
    player: [path.resolve(__dirname, algor + 'filter/main.js')],
};

function webpackConfig(opt) {
    opt = opt || {};
    var minifiedOpt = (opt.production ? {test: /\.js$/} : {test: /vendors\.js/});
    return  {
        entry: entry,
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: "[name].js"
        },
        watch: (opt.production ? false : true),
        module: {
            preloaders: [
                {test: /\.js$/, exclude: /node_modules/, loader: "jsxhint-loader"}
            ],
            loaders: [
                {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
            ]
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin('vendors', "vendors.js"),
            new webpack.optimize.UglifyJsPlugin(minifiedOpt)
        ]
    };
};

var webPackServerConfig = {
    // webpack-dev-server options

    contentBase: ".",
    // or: contentBase: "http://localhost/",
    historyApiFallback: false
};

gulp.task('build', function() {
    webpack(webpackConfig({production: false}) , function(err, stats) {
        if(err) throw new util.PluginError("webpack", err);
        util.log("[webpack]", stats.toString({
            // output options
        }));
    });
    var app = express();
    app.use(express.static('.'));
    app.listen(8080);
});


gulp.task('build-release', function() {
    webpack(webpackConfig({production: true}), function(err, stats) {
        if(err) throw new util.PluginError("webpack", err);
        util.log("[webpack]", stats.toString({
            // output options
        }));
    });
});