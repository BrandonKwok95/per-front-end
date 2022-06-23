const path = require("path");
const Router = require("koa-router");
const koaBody = require("koa-body");
const router = new Router();
const service = require("../service");
const upload_has_chunks = require("../service/upload_has_chunks");


router.prefix("/api");
router.post(
  "/upload_single",
  service.upload_single
);
router.post(
  "/upload_single_base64",
  service.upload_single_base64
);
router.post(
  "/upload_single_name",
  service.upload_single_name
);
router.get("/upload_has_chunks", service.upload_has_chunks)
router.post("/upload_chunks", service.upload_chunks)
router.get("/upload_merge", service.upload_merge)
module.exports = router;
