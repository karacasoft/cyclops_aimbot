const Image = require('../models').Image;

module.exports = {
    get: async (id) => {
        return await Image.findById(id);
    },
    create: async (filename) => {
        return await Image.create({
            filename: filename
        });
    }
};