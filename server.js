const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const request = require('request-promise-native');

const app = new Koa();
const router = new Router();
const { PORT = 3000 } = process.env;


router.all('/:username/:hook', async (ctx, next) => {
  const { username, hook } = ctx.params;
  await request({
    uri: `https://hook.io/${username}/${hook}`,
    method: ctx.req.method,
    body: ctx.request.body,
    json: true
  });
  ctx.status = 200;
});

app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(PORT);
console.log(`http://localhost:${PORT}`);
