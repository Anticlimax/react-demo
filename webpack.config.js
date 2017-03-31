var path = require('path')
var UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: './app/index.js',
  output:{
    filename: 'bundle.js',
    path: path.resolve(__dirname,'dist')
  },
  plugins:[
    new UglifyJsPlugin({
    // 最紧凑的输出
    beautify: false,
    // 删除所有的注释
    comments: false,
    compress: {
      // 在UglifyJs删除没有用到的代码时不输出警告  
      warnings: false,
      // 删除所有的 `console` 语句
      // 还可以兼容ie浏览器
      drop_console: false,
      // 内嵌定义了但是只用到一次的变量
      collapse_vars: true,
      // 提取出出现多次但是没有定义成变量去引用的静态值
      reduce_vars: true,
    }
})
  ]
}