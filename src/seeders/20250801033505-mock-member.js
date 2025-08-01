'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Members', [
      {
        code: 'A001',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: 'A002',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: 'A003',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Members', null, {});
  },
};
