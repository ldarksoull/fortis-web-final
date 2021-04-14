var path = require('path')
// vue.config.js
module.exports = {
  filenameHashing: false,
  outputDir : path.resolve(__dirname, '../fortis-web-build/'), // путь куда упадет билд
  publicPath: '/', //путь для приписки в путях файла index.html
  productionSourceMap: false,
}