const path = require("path");

module.exports = {
  mode: "development", // 生产模式
  entry: "./src/index.js",
  // watch: true,
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   use: [
      //     {
      //       loader: path.resolve(__dirname, "loaders", "babel-loader"),
      //       options: {
      //         presets: ["@babel/preset-env"],
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.js$/,
        use: [
          {
            loader: path.resolve(__dirname, "loaders", "schema-loader"),
            options: {  // 优先选择text作为banner，filename做兜底文案
              text: '我是手写banner组件',
              filename: path.resolve(__dirname, 'banner.js')
            }
          }
        ]
      },
      {
        test: /\.png$/,
        use: [{
          loader: path.resolve(__dirname, 'loaders', 'url-loader'),
          options: {
            limit: 200 * 1024
          }
        }]
      }
    ],
  },
  plugins: [],
};
