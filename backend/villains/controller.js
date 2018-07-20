const Villain = require('../models').Villain;

module.exports = {
    get: async (id) => {
        return await Villain.findById(id);
    },
    getAll: async () => {
        return await Villain.findAll()
    },
    create: async (name, description, imageid, markerid) => {
        return await Villain.create({
            name: name,
            description: description,
            imageid: imageid,
            markerid: markerid
        });
    },
    update: async (id, values) => {
        return await Villain.update(id, values);
    },
    delete: async (id) => {
        return await Villain.destroy({ where: { id: id } });
    }
};