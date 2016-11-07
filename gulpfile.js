var gulp = require('gulp');
var webpack = require('webpack');
var util = require('gulp-util');
var path = require('path');
var merge = require('merge');
var WebpackDevServer = require('webpack-dev-server');

var entry = {
    main: [path.resolve(__dirname, "index.js")],
    vendors: ['three'],
};

function webpackConfig(opt) {
    opt = opt || {};
    var minifiedOpt = (opt.production ? {test: /\.js$/} : {test: /vendors\.js/});
    return  {
        entry: entry,
        output: {
            path: path.resolve(__dirname, 'assets'),
            publicPath: "/assets/",
            filename: "[name].js"
        },
        resolve: {
        },
        watch: (opt.production ? false : true),
        module: {
            loaders: [
                {test: /\.(gif|png|jpe?g|svg)$/i, loaders: [
                  'file?hash=sha512&digest=hex&name=[hash].[ext]',
                  'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]},
                {test: /\.glsl$/, loader: 'webpack-glsl'},
                {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader", query: {
                  presets: ['es2015']
                }}
            ]
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({name: 'vendors', filename: "vendors.js"}),
            new webpack.optimize.UglifyJsPlugin(minifiedOpt),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify(opt.production ? 'production' : 'development')
                }
            }),
            new webpack.ProvidePlugin({
              THREE: 'three'
            })
        ]
    };
};

gulp.task('build', function() {
  var config = webpackConfig({production: false});
  // config.entry.main.unshift("webpack-dev-server/client?http://localhost:8080/");
  var compiler = webpack(config, function(err, stats) {
      if(err) throw new util.PluginError("webpack", err);
      util.log("[webpack]", stats.toString({
          // output options
      }));
  });

  // var server = new WebpackDevServer(compiler, {
  //   contentBase: ".",
  //   // Can also be an array, or: contentBase: "http://localhost/",
  //   historyApiFallback: false,
  //   // Set this as true if you want to access dev server from arbitrary url.
  //   // This is handy if you are using a html5 router.
  //   compress: true,
  //   // Set this if you want to enable gzip compression for assets
  //   proxy: {
  //   },
  //   clientLogLevel: "info",
  //   quiet: false,
  //   noInfo: false,
  //   // It's a required option.
  //   publicPath: "/assets/",
  //   headers: { "X-Custom-Header": "yes" },
  //   stats: { colors: true }
  // }).listen(8080);
});


gulp.task('build-release', function() {
    webpack(webpackConfig({production: true}), function(err, stats) {
        if(err) throw new util.PluginError("webpack", err);
        util.log("[webpack]", stats.toString({
            // output options
        }));
    });
    var app = express();
    app.use(express.static('.'));
    app.listen(8080);
});
