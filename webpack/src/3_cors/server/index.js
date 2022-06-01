const express = require("express");
const webpack = require("webpack");
const middle = require("webpack-dev-middleware");
const config = require("../webpack.config");
const compiler = webpack(config); // 利用webpack读取相关配置
const app = express();

// 前端webpack配置
app.use(middle(compiler));

// 服务端接口
app.get("/api/test", function (req, res) {
  res.json({ test: "success" });
});

app.get("/api/mock", function (req, res) {
  res.json({ mock: "success" });
});

console.log("express服务端启动，监听3000");
app.listen(3000);
