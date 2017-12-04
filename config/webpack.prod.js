const path = require('path')
const webpack = require('webpack')
const liveReloadPlugin = require('webpack-livereload-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const optimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
  entry: {
    index: [
      path.join(__dirname, '../src/public/scripts/index.es'),
      path.join(__dirname, '../src/public/scripts/indexspec.js')
    ],
    tags: [
      path.join(__dirname, '../src/public/scripts/tags.es')
    ]
  },
  output: {
    path: path.join(__dirname,'../dist/'),
    filename: 'public/scripts/[name]-[hash:5].js'
  },
  module: {
    rules: [{
      test: /\.es$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['es2015','stage-0']
        }
      }
    },{
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader'
      })
    }
  ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV:"prod"
      }
    }),
    new liveReloadPlugin({appendScriptTag: true}),
    new ExtractTextPlugin("public/css/[name]-[hash:5].css"),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: false,
      }
    }),
    new optimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: { removeAll : true} },
      canPrint: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'public/scripts/common/vendor-[hash:5].min.js'
    })
  ]
}
