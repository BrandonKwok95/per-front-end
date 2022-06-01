const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCss = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  devServer: {
    // 开发环境配
    port: 3000,
    progress: true,
    contentBase: "./dist",
    compress: true,
  },
  mode: "production", // 生产模式
  entry: "./src/index.js",
  output: {
    filename: "bundle.[hash:8].js",
    path: path.resolve(__dirname, "dist"), // 必须时绝对路径（打包后路径名）
    // publicPath: '//kwok.com/'  // 可以在相应文件上加上
  },
  module: {
    rules: [
      // 将html中的img引入的图片打包（直接将图片上传cdn不就好了吗？？？）
      // {
      //   test: /\.html$/,
      //   use: 'html-withimg-loader'
      // },
      // url-loader 将文件（图片转换成）base64
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 1,
              outputPath: "img", // 将文件打包到指定文件夹
              publicPath: "/img/", // 打包完请求资源的路径
            },
          },
        ],
      },
      // file-loader 将js中引入的文件（图片）打包
      // {
      //   test: /\.(png|jpg|gif)$/,
      //   use: "file-loader",
      // },

      // expose-loader 将变量注入到全局window
      // {
      //   test: require.resolve("jquery"),
      //   use: [
      //     {
      //       loader: "expose-loader",
      //       options: "$",
      //     },
      //     // {
      //     //   loader: "expose-loader",
      //     //   options: "jQuery",
      //     // },
      //   ],
      // },

      // // eslint 负责es语法校验
      // {
      //   test: /\.js$/,
      //   use: {
      //     loader: 'eslint-loader',
      //   },
      //   enforce: 'pre', // 强制在babel-loader前执行
      //   exclude: /node_modules/,
      // },
      // babel-loader 负责将JS代码转为相应的规范
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
              ["@babel/plugin-transform-runtime"],
            ],
          },
        },
        exclude: /node_modules/,
        include: path.resolve(__dirname, "src"),
      },
      // loader默认从右向左执行（从上到下执行）
      // style-loader 将css插入到head标签中
      // css-loader 负责解析相应的css文件
      // postcss-loader 负责样式兼容之类的问题，适应厂商配置（webkit）
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      // less文件解析（解析less文件）
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      minify: {
        removeAttributeQuotes: true, // 移除标签属性中的属性名
        collapseWhitespace: true, // 压缩html
      },
      hash: true, // hash为js文件生成的hash（根据文件是否变化而改变）
    }),
    new MiniCssExtractPlugin({
      // 插件主要用于提取压缩css文件
      filename: "css/main.[hash:8].css",
    }),
    // new webpack.ProvidePlugin({ // 每个模块中都注入¥
    //   $: 'jquery'
    // })
  ],
  // externals: {
  //   jquery: "$",
  // },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
      new OptimizeCss(),
    ],
  },
};
