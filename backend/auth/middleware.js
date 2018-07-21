const UserController = require('../users').Controller;

const Errors = require('../errors');

const middleware = async (ctx, next) => {
    const apiToken = ctx.headers['x-api-token'];
    console.log("token is: " + apiToken);
    const user = UserController.getByToken(apiToken);
    if(apiToken === undefined || apiToken === null || user === null) {
        console.log("unauthorized");
        throw new Errors.Api.UnauthorizedError();
    }
    console.log("guvenlik acigi?");
    ctx.user = user.toJSON();
    await next();
};

module.exports = middleware;