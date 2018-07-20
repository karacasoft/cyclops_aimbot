const Villain = require('models').Villain;

module.exports = {
    getAll: () => {
        return Villain.findAll()
    },
    create: (name, description, imageid, markerid) => {
        return Villain.create({
            name: name,
            description: description,
            imageid: imageid,
            markerid: markerid
        });
    },
    update: (id, values) => {
        return Villain.update(id, values);
    },

};