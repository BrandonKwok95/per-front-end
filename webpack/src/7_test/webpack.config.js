const path = require("path");

class P {
  apply(compiler) {
    compiler.hooks.emit.tap('emit', function() {
      console.log('这是第一个插件的效果')
    })
  }
}

module.exports = {
  mode: "development", // 生产模式
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          path.resolve(__dirname, 'loader', 'style-loader'),
          path.resolve(__dirname, 'loader', 'less-loader'),
        ]
      }
    ]
  },
  plugins: [
    new P()
  ]
};
