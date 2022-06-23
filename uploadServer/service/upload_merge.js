const fs = require("fs")
const path = require("path")
const upload_merge = async function(ctx, next) {
  // 根据hash和totalChunk 去拼接相应的chunk
  try {
    const { hash, suffix, totalChunk } = ctx.query
    await mergeFile(hash, suffix, totalChunk)
    ctx.response.body = {
      code: 0,
      codeText: 'upload success',
      resourcePath: `${ctx.host}/chunks/${hash}.${suffix}`
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

function mergeFile(hash, suffix, totalChunk) {
  const uploadDir = path.resolve(__dirname, "../upload")
  let fileList = fs.readdirSync(`${uploadDir}/image`)
  fileList = fileList.filter(fileItem => fileItem.indexOf(hash) === 0)
  if (fileList.length !== Number(totalChunk)) throw new Error('缺少相应文件')
  fileList.sort((a, b) => {
    let reg = /_(\d+)/
    return reg.exec(a)[1] - reg.exec(b)[1]
  }).forEach(fileItem => {
    const filePath = `${uploadDir}/image/${fileItem}`
    fs.appendFileSync(`${uploadDir}/chunks/${hash}.${suffix}`, fs.readFileSync(filePath))
    fs.unlinkSync(`${uploadDir}/image/${fileItem}`)
  })
}

module.exports = upload_merge