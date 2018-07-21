const Router = require('koa-router');

const Controller = require('./controller.js');

const Util = require('../util').Api;
const notFoundIfNull = Util.notFoundIfNull;
const hasProperties = Util.hasProperties;
const filterProperties = Util.filterProperties;

const Errors = require('../errors');

const villainRouter = new Router();

villainRouter
// GET /villains
.get('/', async (ctx, next) => {
    ctx.body = (await Controller.getAll()).map(value => value.toJSON());
})

// GET /villains/withMarker
.get('/withMarker', async (ctx, next) => {
    ctx.body = (await Controller.getAll())
        .map(value => value.toJSON())
        .map(value => {
            value.imageurl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQgAAACgCAMAAADHEAL6AAAAFVBMVEX///8AAAD/mf+ZmZn/zJn/M5n/mZly7fXaAAABxUlEQVR4nO3au3LCMBBAUUhI/v+T08jNzmy0shdjmHNLoueBQkVut6buF6nrPiBAgAABAgSI8wAeF+llICBAgAABAgSINoCvk3o5CAgQIECAAAGiDWL1Ij+j6udVEBAgQIAAAQLE+0AcvUhXIECAAAECBIj3hzjaPRT/nkFnEHE9ECBAgAABAsTnQWzrfocykBnEbD0QIECAAAECxHGIODHWDZE9iLKDV0EixGwdECBAgAABAkQfRDYhTjwKkTW7QHauWHU+CBAgQIAAAaIPogpShVj9h5HqRY4GAgQIECBAgOiD2Aty9EG1QZ0FUAYBAQIECBAgQCxDrIJEiNUH1NYMIp6retHZPBAgQIAAAQJEP0QGEjv6oKpCzL6YOK46DwQIECBAgADxPIgZzCpE9uCKB/0NZRdfLa4LAgQIECBAgDgPIoI8QrMLZ1Uh4rjVz0GAAAECBAgQ14WIIKtlF4oXWy1bZzcACBAgQIAAAWI3QCwD2dsMZG/tvwQQIECAAAECRBlgtsHVa/slgBiBGIEYgRiBGIEYgRjNAKrju/bt3g8ECBAgQIAA8TyIrOr47v1n4/but3wQECBAgPjvICBAfCbEH+yzElBvujPUAAAAAElFTkSuQmCC'
            return value;
        })

        .filter(value => value.markerid !== null);
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
    values = filterProperties(ctx.request.body, filterParams);
    await Controller.update(
        ctx.request.body, { 
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
    ctx.status = 204; // no content
});

module.exports = villainRouter;