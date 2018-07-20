const Koa = require('koa');
const json = require('koa-json');
const Router = require('koa-router');

const app = new Koa();

const mainRouter = new Router();

mainRouter.use('/villains', require('./villains').Router);

app.use(json());

app.use(mainRouter.routes())
    .use(mainRouter.allowedMethods());

app.listen(3000);