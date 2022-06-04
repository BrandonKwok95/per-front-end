const loaderUtils = require("loader-utils");
const mime = require("mime"); // 用于处理文件格式

function loader(source) {
  let { limit } = loaderUtils.getOptions(this);
  if (limit && limit > source.length) {
    return `module.exports = "data:${mime.getType(
      this.resourcePath
    )};base64,${source.toString('base64')}"`;
  } else {
    return require("./file-loader").call(this, source);
  }
}
loader.raw = true // 标识传入为二进制

module.exports = loader;
