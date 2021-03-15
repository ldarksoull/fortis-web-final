var path = require('path')
// vue.config.js
module.exports = {
  filenameHashing: false,
  outputDir : path.resolve(__dirname, '../../../server/client_packages/cef'), // путь куда упадет билд
  publicPath: '/', //путь для приписки в путях файла index.html
  productionSourceMap: false,
}