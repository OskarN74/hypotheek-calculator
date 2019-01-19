const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    // Run on local network
    // host: '192.168.2.13',
    contentBase: './dist'
  }
})
