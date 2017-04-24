/**
 * Created by linxiaojie on 2017/4/21.
 */
const webpack = require('webpack')
const path = require('path')
const vendors = [
  'vue',
  'Vuex',
  'Vue-router',
  'liljay-common-utils',
  'Vuex/src/plugins/logger.js'
]
console.log(__dirname)
module.exports = {
  output: {
    path: path.resolve(__dirname, '../vendors'),
    filename: '[name].[chunkhash].js',
    library: '[name]_[chunkhash]'
  },
  entry: {
    vendor: vendors
  },
  plugins: [
    new webpack.DllPlugin({
      path: 'vendors/manifest.json',
      name: '[name]_[chunkhash]',
      context: __dirname
    })
  ]
}