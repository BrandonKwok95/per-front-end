const fs = require("fs")
const path = require("path")
const SparkMD5 = require("spark-md5")

const upload_single_base64 = async function (ctx, next) {
  try {
    // 将base64存入
    let { filename, file } = ctx.request.body,
      spark = new SparkMD5.ArrayBuffer(),
      filenameArr = filename.split("."),
      suffix,
      baseDir,
      resourceFile,
      destination
    file = decodeURIComponent(file)
    file = file.replace(/^data:image\/\w+;base64,/, "")
    file = Buffer.from(file, "base64")
    spark.append(file)
    suffix = filenameArr[filenameArr.length - 1]
    baseDir = path.join(__dirname, "../upload/base64")
    resourceFile = `${spark.end()}.${suffix}`
    destination = `${baseDir}/${resourceFile}`
    const isExist = await isFileExist(destination)
    if (isExist) {
      ctx.response.body = {
        code: 0,
        codeText: 'file repeat',
        filename,
        resourcePath: destination.replace(baseDir, `${ctx.host}/base64`)
      }
    } else {
      writeFile(destination, file)
      ctx.response.body = {
        code: 0,
        codeText: 'write success',
        filename,
        resourcePath: destination.replace(baseDir, `${ctx.host}/base64`)
      }
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

function isFileExist(filePath) {
  return new Promise((resolve) => {
    fs.access(filePath, (err) => {
      if (err) {
        resolve(false)
      } else {
        resolve(true)
      }
    })
  })
}

function writeFile(dir, file) {
  return new Promise((resolve, reject) => {
    fs.writeFile(dir, file, (err) => {
      if (err) {
        reject(err)
      } else {
        resolve(true)
      }
    })
  })
}

module.exports = upload_single_base64