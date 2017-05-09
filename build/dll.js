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
module.exports = {
  output: {
    path: path.resolve(__dirname, '../static/js'),
    filename: '[name].js',
    library: '[name]'
  },
  entry: {
    dll: vendors
  },
  plugins: [
    new webpack.DllPlugin({
      path: 'vendors/manifest.json',
      name: '[name]',
      context: __dirname
    })
  ]
}