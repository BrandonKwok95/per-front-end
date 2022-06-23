const upload_single_name = async function (ctx, next) {
  const {
    file: { newFilename, originalFilename },
  } = ctx.request.files;
  try {
    ctx.response.body = {
      code: 0,
      codeText: 'upload success',
      originalFilename,
      resourcePath: `${ctx.host}/image/${newFilename}`
    }
  } catch (e) {
    ctx.response.body = {
      code: 1,
      codeText: e
    }
  } finally {
    await next()
  }
}

module.exports = upload_single_name