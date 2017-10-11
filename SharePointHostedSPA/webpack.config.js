const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const bundleOutputDir = './app/scripts';

module.exports = (env) => {
  const isDevBuild = !(env && env.prod);

  return [{
    stats: { modules: false },
    context: __dirname,
    resolve: {
      extensions: ['.js', '.ts'],
      alias: {
        'styles': path.resolve(__dirname, './src/components/app/styles/'),
        'fonts': path.resolve(__dirname, './src/fonts/'),
        'vue$': 'vue/dist/vue.esm.js'
      }
    },
    entry: { 'main': './src/boot.ts' },
    module: {
      rules: [
        {
          test: /\.vue\.html$/, include: /src/, loader: 'vue-loader',
          options: {
            loaders: {
              js: 'awesome-typescript-loader?silent=true',
              scss: 'vue-style-loader!css-loader!sass-loader'
            }
          }
        },
        {
          test: /\.vue$/, loader: 'vue-loader', include: /node_modules/
        },
        { test: /\.ts$/, include: /src/, use: 'awesome-typescript-loader?silent=true' },
        { test: /\.css$/, use: isDevBuild ? ['style-loader', 'css-loader?minimize'] : ['style-loader', 'css-loader?minimize'] },
        { test: /\.(png|jpg|jpeg|gif|svg)$/, use: 'url-loader?limit=25000' },
        { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
        { test: /\.svg$/, loader: 'url-loader?limit=65000&mimetype=image/svg+xml&name=src/fonts/[name].[ext]' },
        { test: /\.woff$/, loader: 'url-loader?limit=65000&mimetype=application/font-woff&name=src/fonts/[name].[ext]' },
        { test: /\.woff2$/, loader: 'url-loader?limit=65000&mimetype=application/font-woff2&name=src/fonts/[name].[ext]' },
        { test: /\.[ot]tf$/, loader: 'url-loader?limit=65000&mimetype=application/octet-stream&name=src/fonts/[name].[ext]' },
        { test: /\.eot$/, loader: 'url-loader?limit=65000&mimetype=application/vnd.ms-fontobject&name=src/fonts/[name].[ext]' }
      ]
    },
    output: {
      path: path.join(__dirname, bundleOutputDir),
      filename: '[name].js',
      publicPath: '/'
    },
    plugins: [
      new CheckerPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(isDevBuild ? 'development' : 'production')
        }
      }),
      new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require(bundleOutputDir + '/vendor-manifest.json')
      }),
    ].concat(isDevBuild ? [
      // Plugins that apply in development builds only
      new webpack.SourceMapDevToolPlugin({
        filename: '[file].map', // Remove this line if you prefer inline source maps
        moduleFilenameTemplate: path.relative(bundleOutputDir, '[resourcePath]') // Point sourcemap entries to the original file locations on disk
      })
    ] : [
        // Plugins that apply in production builds only
        new webpack.optimize.UglifyJsPlugin()
      ])
  }];
};
