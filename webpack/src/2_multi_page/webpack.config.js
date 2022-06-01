const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  devtool: "cheap-module-source-map", // source-map 源码和打包产物之间的映射关系
  watch: true, // 生产环境
  watchOptions: {
    poll: 1000, // 轮训频率
    aggregateTimeout: 500, // 修改后时延
    ignored: /node_modules/, // 忽略文件目录
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
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env", // babel环境的一个总预设值
            ],
            plugins: [
              ["@babel/plugin-proposal-decorators", { legacy: true }], // 装饰器语法babel
              ["@babel/plugin-proposal-class-properties", { loose: true }], // 类文件babel
            ],
          },
        },
        exclude: /node_modules/,
        include: path.resolve(__dirname, "src"),
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "home.html",
      chunks: ["home"], // 根据chunk模块引入到html中
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "other.html",
      chunks: ["other"],
    }),
    new CleanWebpackPlugin(), // 每次打包清理dist产物
    new CopyWebpackPlugin([{ from: "doc", to: "" }]), // 每次打包复制src中的源文件到dist中
    new webpack.BannerPlugin('MAGA')  // 打包产物制作banner签名
  ],
};
