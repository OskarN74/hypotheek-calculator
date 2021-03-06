const path = require('path')
// Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')

module.exports = {
  entry: {
    hypocalc: './src/js/index.js'
  },
  output: {
    filename: './js/[name].[contentHash].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/template.html'
    }),
    new MiniCssExtractPlugin({
      filename: './css/[name].[hash].min.css'
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.min\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: [
          'default',
          {
            discardComments: {
              removeAll: true
            }
          }
        ]
      },
      canPrint: true
    }),
    new CopyWebpackPlugin([
      { from: 'src/manifest.webmanifest', to: '[name].[ext]' },
      { from: 'src/favicon.ico', to: '[name].[ext]' },
      { from: 'src/img/*', to: 'img/[name].[ext]' }
    ]),
    new WorkboxPlugin.GenerateSW({
      skipWaiting: true,
      clientsClaim: true,
      exclude: [/\.webmanifest$/]
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'fonts/',
          publicPath: '../fonts/'
        }
      }
    ]
  }
}
