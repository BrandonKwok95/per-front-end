const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");
const { smart } = require("webpack-merge")  // 可以用于webpack配置的组合(webpack.base.js和webpack.dev.js等等用于生产环境和开发环境的区分)

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "src/index.js"),
  output: {
    filename: "[name].[hash:8].js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    port: 3000,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["css-loader"],
      },
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react", // babel react转译
            ],
          },
        },
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/,
      },
    ],
  },
  // 解析第三方模块处理
  resolve: {
    // modules: [path.resolve('node_modules')],  // 只在当前目录下解析依赖
    // alias: {
    //   bootstrap: "bootstrap/dist/css/bootstrap.css",  // 简化路径名（主要用于项目方法文件的引入层级过深问题）
    // }, // 起别名，优化引用路径长度
    mainFields: ['style', 'main'], // 寻找引入包package.json的对应字段作为解析入口文件
    // mainFiles: '',  // 入口文件名（优先在mainFields中查；找若没有则查找mainFiles对应文件名）
    extensions: ['.js', '.css'] // 引入文件文件名可以省略
  },
  plugins: [
    new webpack.DefinePlugin({
      ENV: JSON.stringify('development')  // 注意需要使用JSON.stringify去编码
    }),

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/index.html"),
      filename: "index.html",
    }),
    new CleanWebpackPlugin(), // 每次打包清理dist产物
    new webpack.BannerPlugin("MAGA"), // 打包产物制作banner签名
  ],
};
