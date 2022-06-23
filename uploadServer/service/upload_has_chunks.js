const upload_has_chunks = async function(ctx, next) {
  // 校验已上传参数
  const { hash } = ctx.query
  // 根据hash去判断
  ctx.response.body = {
    code: 0,
    hasChunks: []
  }
}

module.exports = upload_has_chunks