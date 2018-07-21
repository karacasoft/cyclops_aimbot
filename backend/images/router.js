const Router = require('koa-router');

const fs = require('fs');
const path = require('path');

const Controller = require('./controller.js');

const Util = require('../util').Api;
const notFoundIfNull = Util.notFoundIfNull;
const hasProperties = Util.hasProperties;
const filterProperties = Util.filterProperties;

const Errors = require('../errors');

const imageRouter = new Router();

imageRouter

.get('/:id', (ctx, next) => {
    const image = await Controller.get(ctx.params.id);
    const imagePath = path.join(__dirname, 'store', image.get('filename'));
    ctx.body = fs.readFileSync(imagePath, 'utf8');
})

.post('/', (ctx, next) => {
    if(ctx.request.body.hasOwnProperty('imageBase64')) {
        ctx.request.body
    }
    const imageData = 
});


module.exports = imageRouter;