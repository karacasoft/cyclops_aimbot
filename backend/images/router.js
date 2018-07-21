const Router = require('koa-router');
const randomstring = require('randomstring');

const Jimp = require('jimp');

const fs = require('fs');
const path = require('path');

const Controller = require('./controller.js');

const Util = require('../util').Api;
const notFoundIfNull = Util.notFoundIfNull;
const hasProperties = Util.hasProperties;
const filterProperties = Util.filterProperties;

const Errors = require('../errors');

const Auth = require('../auth');

const imageRouter = new Router();

imageRouter

// GET /images/:id
.get('/:id', async (ctx, next) => {
    const image = notFoundIfNull(await Controller.get(ctx.params.id));
    const imagePath = path.join(__dirname, 'store', image.get('filename'));

    fileContents = fs.readFileSync(imagePath);

    ctx.set('Content-Type', 'image/jpeg');
    ctx.response.body = fileContents;
})

.post('/', Auth.Middleware)

// POST /images
.post('/', async (ctx, next) => {
    if(!ctx.request.body.hasOwnProperty('imageBase64')) {
        throw new Errors.Api.ParameterError(['imageBase64']);
    }
    filename = randomstring.generate(10) + ".jpg";
    const imagePath = path.join(__dirname, 'store', filename);
    const imageData = ctx.request.body.imageBase64.replace(/^data:image\/.*;base64,/, "");
    await Jimp.read(Buffer.from(imageData, 'base64')).then(image => image.write(imagePath));
    const dbData = await Controller.create(filename);
    ctx.body = dbData.toJSON();
});



module.exports = imageRouter;