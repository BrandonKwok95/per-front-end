const Koa = require("koa");
const path = require("path");
const static = require("koa-static");
const koaBody = require("koa-body");
const router = require("./router");
app = new Koa();
app.use(static(path.resolve(__dirname, "static")));
app.use(static(path.resolve(__dirname, "upload")));
app.use(koaBody({
  formLimit: 2 * 1024 * 1024,
  formidable: {
    uploadDir: path.resolve(__dirname, "./upload/image"),
    keepExtensions: true
  },
  multipart: true, // 支持文件上传
  onError: err => {
    return {
      err,
      text: '写入文件错误'
    }
  }
}))
app.use(router.routes());
app.listen(3000, () => {
  console.log("koa服务器启动监听3000端口");
});
