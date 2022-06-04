const loaderUtils = require("loader-utils");

function loader(source) {
  let filename = loaderUtils.interpolateName(this, "[hash].[ext]", {
    content: source,
  }); // filename 为文件名（打包后文件名）
  this.emitFile(filename, source) // 发射打包文件
  return `module.exports = "${filename}"`;
}

loader.raw = true;
module.exports = loader;
