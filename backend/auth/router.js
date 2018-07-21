const UserController = require('../users').Controller;

const Router = require('koa-router');

const authRouter = new Router();

const Util = require('../util').Api;
const notFoundIfNull = Util.notFoundIfNull;
const hasProperties = Util.hasProperties;
const filterProperties = Util.filterProperties;

const Errors = require('../errors');

authRouter

.post('/login', async (ctx, next) => {
    const requiredParams = [ 'username', 'password' ];
    if(!hasProperties(ctx.request.body, requiredParams)) {
        throw new Errors.Api.ParameterError(requiredParams);
    }
    const user = await UserController.authenticate(
        ctx.request.body.username,
        ctx.request.body.password
    );
    if(!user) {
        throw new Errors.Api.UnauthorizedError();
    }
    ctx.body = {
        code: 200,
        message: "Success",
        user: user.toJSON()  
    };
})

.post('/logout', require('./middleware'))

.post('/logout', async (ctx, next) => {
    if(ctx.user === undefined) {
        throw new Errors.Api.UnauthorizedError();
    }
    await UserController.deleteToken(ctx.user.id);
    ctx.body = {
        code: 200,
        message: "Success"
    };
});


module.exports = authRouter;