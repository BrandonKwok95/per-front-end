const upload_single = async function (ctx, next) {
  try {
    const {
      file: { newFilename, originalFilename },
    } = ctx.request.files;
    ctx.response.body = {
      code: 0,
      codeText: "upload success",
      originalFilename,
      resourcePath: `${ctx.host}/image/${newFilename}`,
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
