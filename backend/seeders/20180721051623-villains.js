'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkUpsert('Villains', [
    {
      id: 1,
      name: 'Apocalypse',
      description: 'Üstün güç, sağlamlık, kütlesini ve şeklini değiştirebilme yeteneklerine sahip.',
      imageid: 1,
      markerid: 1
    },
    {
      id: 2,
      name: 'Dr.Doom',
      description: 'Elektrik kontrolü gücüne sahip.',
      imageid: 2,
      markerid: 2
    },
    {
      id: 3,
      name: 'Loki',
      description: 'İskandinav tanrılarının savaşıp yendiği Buz Devlerin’den biri.',
      imageid: 3,
      markerid: 3
    }
    ], {});
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Villains', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
