const User = require('../models').User;
const randomstring = require('randomstring');
const crypto = require('crypto');

module.exports = {
    get: (id) => {
        return User.findById(id);
    },
    getByToken: (token) => {
        return User.findOne({
            where: {
                apiToken: token
            }
        });
    },
    authenticate: async (username, password) => {
        const hash = crypto.createHash('sha256');
        hash.update(password);
        const user = await User.findOne({
            where: {
                username: username,
                password: hash.digest('hex')
            }
        });
        if(user === null) {
            return false;
        } else {
            const tokenHash = crypto.createHash('sha256');
            tokenHash.update(randomstring.generate(10));
            user.update({
                apiToken: tokenHash.digest('hex')
            });
            return user;
        }
    },
    deleteToken: (id) => {
        User.update({
            apiToken: null,
        }, {
            where: {
                id: id
            }
        });
    },
    create: (username, password) => {
        const hash = crypto.createHash('sha256');
        hash.update(password);
        return User.create({
            username: username,
            password: hash.digest('hex')
        });
    }
};