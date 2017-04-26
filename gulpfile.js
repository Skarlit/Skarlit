var gulp = require('gulp');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var util = require('gulp-util');
var path = require('path');

function webpackConfig(opt = {}) {
    var minifiedOpt = (opt.production ? { test: /\.js$/ } : { test: /vendors\.js/ });
    return {
        entry: {
            main: [path.resolve(__dirname, 'javascripts/main.js')],
            lib: ['three', 'tween.js']
        },
        output: {
            publicPath: '/build/',
            path: path.resolve(__dirname, 'build'),
            filename: '[name].js'
        },
        watch: (!opt.production),
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env', 'react']
                        }
                    }
                }
            ]
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({ name: 'lib' }),
            new webpack.optimize.UglifyJsPlugin(minifiedOpt),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify(opt.production ? 'production' : 'development')
                }
            })
        ]
    };
}

gulp.task('server', function () {
    let config = webpackConfig({ production: false });
    let devPort = 9000;

    config.entry.main.unshift('webpack-dev-server/client?http://localhost:' + devPort + '/');
    webpackInstance = webpack(config);
    let server = new WebpackDevServer(webpackInstance, {
        // webpack-dev-server options

        contentBase: '.',
        // Can also be an array, or: contentBase: "http://localhost/",

        historyApiFallback: false,
        // Set this as true if you want to access dev server from arbitrary url.
        // This is handy if you are using a html5 router.

        compress: true,
        // Set this if you want to enable gzip compression for assets

        setup: function (app) {
            // Here you can access the Express app object and add your own custom middleware to it.
            // For example, to define custom handlers for some paths:
            // app.get('/some/path', function(req, res) {
            //   res.json({ custom: 'response' });
            // });
        },

        inline: true,

        // pass [static options](http://expressjs.com/en/4x/api.html#express.static) to inner express server
        staticOptions: {
        },

        clientLogLevel: 'info',
        // Control the console log messages shown in the browser when using inline mode. Can be `error`, `warning`, `info` or `none`.
        publicPath: '/build/',
        // webpack-dev-middleware options
        quiet: false,
        noInfo: false,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        }
    });
    server.listen(devPort, 'localhost', function (err, stats) {
        if (err) throw new util.PluginError('webpack', err);
        util.log('[webpack]', stats);
    });
});


gulp.task('build-release', function () {
    webpack(webpackConfig({ production: true }), function (err, stats) {
        if (err) throw new util.PluginError('webpack', err);
        util.log('[webpack]', stats.toString({
            // output options
        }));
    });
});
