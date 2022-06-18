const Koa = require("koa");
const cors = require("koa-cors");
const Router = require("koa-router");
// const query = require("./sql");
const app = new Koa();
const router = new Router();

router.get("/tiwen/submit", async (ctx, next) => {
  const { name = "" } = ctx.request.query;
  const result = await query("SELECT * FROM schedule_list", [])
  const { create_by = '' } = result[0]
    ctx.response.body = {
      msg: `提交成功，提交人：${name}`,
      operator: create_by,
    };
  next();
});

app.use(
  cors({
    credentials: true, // 是否发送cookie
    allowMethods: ["GET", "POST"],
    allowHeaders: ["Content-Type", "Authorization", "Accept"],
  })
);
app.use(router.routes());
app.listen(3000);
