const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devServer: { // 开发环境配
    port: 3000,
    progress: true,
    contentBase: './dist',
    compress: true
  },
  mode: 'development', // 生产模式
  entry: './src/index.js',
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.resolve(__dirname, 'dist')  // 必须时绝对路径（打包后路径名）
  },
  module: {
    // loader
    rules: [
      // loader默认从右向左执行（从上到下执行）
      // style-loader 将css插入到head标签中
      // css-loader 负责解析相应的css文件
      { test: /\.css$/, use: [
        {
          loader: 'style-loader',
          options: {
            insert: function (element) {
              var parent = document.querySelector('head');
              var lastInsertedElement = window._lastElementInsertedByStyleLoader;
              if (!lastInsertedElement) {
                parent.insertBefore(element, parent.firstChild);
              } else if (lastInsertedElement.nextSibling) {
                parent.insertBefore(element, lastInsertedElement.nextSibling)
              } else {
                parent.appendChild(element)
              }

            }
          }
        },
          'css-loader'
        ]
      },
      // less文件解析（解析less文件）
      { test: /\.less$/, use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      minify: {
        removeAttributeQuotes: true,  // 移除标签属性中的属性名
        collapseWhitespace: true  // 压缩html
      },
      hash: true, // hash为js文件生成的hash（根据文件是否变化而改变）
    })
  ]
}
