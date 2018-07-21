const Koa = require('koa');
const json = require('koa-json');
const Router = require('koa-router');
const BodyParser = require('koa-bodyparser');

const Auth = require('./auth');

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
            message: (Math.floor(ctx.status / 100) === 5) ? "Internal Server Error" : err.message,
            data: err.data || {}
        };
        ctx.app.emit('error', err, ctx);
    }
});

const villainsRoute = require('./villains').Router;
const imagesRoute = require('./images').Router;
const usersRoute = require('./users').Router;

mainRouter.use(Auth.Router.routes(), Auth.Router.allowedMethods());

mainRouter.get('/open', (ctx, next) => {
    ctx.body = "true";
});

mainRouter.use('/villains', villainsRoute.routes(), villainsRoute.allowedMethods());
mainRouter.use('/images', imagesRoute.routes(), imagesRoute.allowedMethods());
mainRouter.use('/users', usersRoute.routes(), usersRoute.allowedMethods());



app.use(mainRouter.routes())
    .use(mainRouter.allowedMethods());

app.listen(3000);