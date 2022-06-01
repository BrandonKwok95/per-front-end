const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "src/index.js"),
  output: {
    filename: "[name].[hash:8].js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [],
  },
  // 开发环境http-proxy 对请求进行转发处理
  devServer: {
    // i. 直接通过匹配的方式进行代理
    // proxy: {
    //   '/api': 'http://localhost:3000'
    // }

    // ii. 通过重写的方式，更换代理环境（去除'/api'后再去请求）
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3000',
    //     pathRewrite: {'/api': ''}
    //   }
    // },

    // iii. 利用webpack-dev-server 模拟数据（无法与服务端同时使用）
    // before(app) {
    //   app.get('/api/mock', function(req, res) {
    //     res.json({ data: '直接返回模拟数据' })
    //   })
    // }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/index.html"),
      filename: "index.html"
    }),
    new CleanWebpackPlugin(), // 每次打包清理dist产物
    new webpack.BannerPlugin('MAGA')  // 打包产物制作banner签名
  ],
};
