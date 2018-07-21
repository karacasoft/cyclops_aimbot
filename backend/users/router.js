const Controller = require('./controller.js');
const Router = require('koa-router');

const Util = require('../util').Api;
const notFoundIfNull = Util.notFoundIfNull;
const hasProperties = Util.hasProperties;
const filterProperties = Util.filterProperties;

const Errors = require('../errors');

const userRouter = new Router();

userRouter
// POST /users/
.post('/', async (ctx, next) => {
    const requiredParams = [ 'username', 'password' ];
    if(!hasProperties(ctx.request.body, requiredParams)) {
        throw new Errors.Api.ParameterError(requiredParams);
    }
    ctx.body = (await Controller.create(
        ctx.request.body.username,
        ctx.request.body.password
    )).toJSON();
});

module.exports = userRouter;