const fs = require("fs");
const path = require("path");
const upload_single = async function (ctx, next) {
  try {
    const {
      file: { filepath, newFilename, originalFilename }
    } = ctx.request.files;
    const { filename } = ctx.request.body;
    fs.renameSync(filepath, filepath.replace(newFilename, filename));
    ctx.response.body = {
      code: 0,
      codeText: "upload success",
      originalFilename,
    };
  } catch (e) {
    ctx.response.body = {
      code: 1,
      codeText: e,
    };
  } finally {
    await next();
  }
};

module.exports = upload_single;
