var gulp = require('gulp');
var webpack = require('webpack');
var util = require('gulp-util');
var path = require('path');

function webpackConfig(opt) {
    opt = opt || {};
    var minifiedOpt = (opt.production ? {} : {test: /vendors\.js/});
    return  {
        entry: {
            main: path.resolve(__dirname, "javascripts/main.js"),
            vendors: ['react','react-router', 'three', 'material-ui']
        },
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: "[name].js"
        },
        watch: true,
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

gulp.task('build', function() {
    webpack(webpackConfig({production: false}), function(err, stats) {
        if(err) throw new util.PluginError("webpack", err);
        util.log("[webpack]", stats.toString({
            // output options
        }));
    });
});


gulp.task('build-prod', function() {
    webpack(webpackConfig({production: true}), function(err, stats) {
        if(err) throw new util.PluginError("webpack", err);
        util.log("[webpack]", stats.toString({
            // output options
        }));
    });
});