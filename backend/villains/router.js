const Router = require('koa-router');

const Controller = require('./controller.js');

const villainRouter = new Router();

villainRouter
// GET /villains
.get('/', (ctx, next) => {
    ctx.body = Controller.getAll().map(value => value.toJSON());
})

// GET /villains/:id
.get('/:id', (ctx, next) => {

})

// POST /villains
.post('/', (ctx, next) => {

})

// PUT /villains/:id
.put('/:id', (ctx, next) => {

})

// DELETE /villains/:id
.delete('/:id', (ctx, next) => {

});

module.exports = villainRouter;