const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  devServer: {
    hot: true,
    port: 3000,
    open: true,
    contentBase: path.resolve(__dirname, './dist')
  },
  entry: {
    home: "./src/home.js",
    other: "./src/other.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [ ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/index.html"),
      filename: "index.html",
      chunks: ['home']
    }),
    new CleanWebpackPlugin(), // 每次打包清理dist产物
    new webpack.BannerPlugin('MAGA'),  // 打包产物制作banner签名

    // HMR 热更新模块 实际上是webpack-dev-server 相当于服务端并且对本地源文件进行监听。两者通过websocket连接
    // 当本地资源发生变化时，服务端向浏览器端推送一个当前构建的hash，浏览器进行比对：若不同则重新拉去相应资源。
    // 开启多个页面，代码修改会同时修改所有页面
    new webpack.NamedChunksPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {  // 缓存组
        // common 一般为项目内的文件
        // vendor 一般为第三方引入的库

        // 代码分割过程根据配置由上到下分割，可以设置权重区分
        common: {
          priority: 0,
          chunks: 'initial',  // 只对入口文件起作用
          minSize: 0, // 文件大小多少以上就会提取公共代码
          minChunks: 2, // 多个文件引用一次以上就会提取
        },

        vendor: {
          priority: 1,
          test: /node_modules/,
          chunks: 'initial',
          minSize: 0,
          minChunks: 2
        }
      }
    }
  }
};
