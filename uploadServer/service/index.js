const upload_single = require('./upload_single')
const upload_single_base64 = require('./upload_single_base64')
const upload_single_name = require('./upload_single_name')
const upload_has_chunks = require("./upload_has_chunks")
const upload_chunks = require("./upload_chunks")
const upload_merge = require("./upload_merge")

module.exports = {
  upload_single,
  upload_single_base64,
  upload_single_name,
  upload_has_chunks,
  upload_chunks,
  upload_merge
}