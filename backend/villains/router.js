const Router = require('koa-router');

const Controller = require('./controller.js');

const Util = require('../util').Api;
const notFoundIfNull = Util.notFoundIfNull;
const hasProperties = Util.hasProperties;
const filterProperties = Util.filterProperties;

const Errors = require('../errors');

const villainRouter = new Router();

const Auth = require('../auth');

villainRouter.use(Auth.Middleware);
villainRouter.use('/:id', Auth.Middleware);

villainRouter
// GET /villains
.get('/', async (ctx, next) => {
    ctx.body = (await Controller.getAll()).map(value => value.toJSON());
})

// GET /villains/:id
.get('/:id', async (ctx, next) => {
    ctx.body = notFoundIfNull((await Controller.get(ctx.params.id))).toJSON();
})

// POST /villains
.post('/', async (ctx, next) => {
    const requiredParams = [ 'name', 'description', 'imageid' ];
    if(!hasProperties(ctx.request.body, requiredParams)) {
        throw new Errors.Api.ParameterError(requiredParams);
    }
    ctx.status = 201; // created
    ctx.body = (await Controller.create(
        ctx.request.body.name,
        ctx.request.body.description,
        ctx.request.body.imageid,
        ctx.request.body.markerid
    )).toJSON();
})

// PUT /villains/:id
.put('/:id', async (ctx, next) => {
    const filterParams = [ 'name', 'description', 'imageid', 'markerid' ];
    const filtered = filterProperties(ctx.request.body, filterParams);
    await Controller.update(
        filtered, { 
            where: {
                id: ctx.params.id
            }
        }
    );
    ctx.body = (await Controller.get(ctx.params.id)).toJSON();
})

// DELETE /villains/:id
.delete('/:id', async (ctx, next) => {
    notFoundIfNull(await Controller.get(ctx.params.id));
    await Controller.delete(ctx.params.id);
    ctx.status = 200; // no content
    ctx.body = {
        status: 200,
        message: "Success"
    };
});

module.exports = villainRouter;