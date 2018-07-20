'use strict';
module.exports = (sequelize, DataTypes) => {
  var Villain = sequelize.define('Villain', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    imageid: DataTypes.INTEGER,
    markerid: DataTypes.INTEGER
  }, {});
  Villain.associate = function(models) {
    // associations can be defined here
  };
  return Villain;
};