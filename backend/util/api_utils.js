const errors = require('../errors').Api;

module.exports = {
    notFoundIfNull: (object) => {
        if(object === null || object === undefined) {
            throw new errors.NotFoundError();
        }
        return object;
    },
    hasProperties: (object, propList) => {
        if(object === null || object === undefined) return false;
        return propList.every((elem) => {
            return object.hasOwnProperty(elem) && object[elem] !== null && object[elem] !== undefined;
        });
    },
    filterProperties: (object, propList) => {
        retObj = {};
        propList.forEach((value) => {
            if(object.hasOwnProperty(value) && object.value !== undefined) {
                retObj[value] = object[value];
            }
        });
        return retObj;
    }
}