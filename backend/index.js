const Koa = require('koa');
const json = require('koa-json');
const Router = require('koa-router');
const BodyParser = require('koa-bodyparser');

const app = new Koa();

const mainRouter = new Router();

app.use(json());
app.use(BodyParser());

app.use(async (ctx, next) => {
    try {
        await next();
    } catch(err) {
        ctx.status = err.status || 500;
        ctx.body = {
            status: ctx.status,
            message: (ctx.status % 100 === 5) ? "Internal Server Error" : err.message,
            data: err.data || {}
        };
        ctx.app.emit('error', err, ctx);
    }
});

const villainsRoute = require('./villains').Router;

mainRouter.use('/villains', villainsRoute.routes(), villainsRoute.allowedMethods());

app.use(mainRouter.routes())
    .use(mainRouter.allowedMethods());

app.listen(3000);