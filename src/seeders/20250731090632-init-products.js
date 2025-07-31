'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', [
      {
        name: 'iPhone 15 Pro',
        description: 'Latest Apple smartphone with titanium design',
        price: 39900,
        stock: 100,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Samsung Galaxy S24',
        description: 'Flagship Android smartphone with AI features',
        price: 35900,
        stock: 100,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'MacBook Pro M3',
        description: '14-inch laptop with M3 chip',
        price: 89900,
        stock: 100,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'iPad Air',
        description: 'Lightweight tablet for productivity',
        price: 24900,
        stock: 100,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Dell XPS 13',
        description: 'Ultra-thin Windows laptop',
        price: 4590.25,
        stock: 100,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  },
};
