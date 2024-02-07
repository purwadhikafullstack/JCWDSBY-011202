'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      'sales_journals',
      [
        {
          date: '2023-12-17 11:35:47',
          product_id: 3,
          category_id: 1,
          quantity: 2,
          warehouse_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          date: '2023-11-07 11:35:47',
          product_id: 4,
          category_id: 2,
          quantity: 2,
          warehouse_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          date: '2024-1-07 11:35:47',
          product_id: 5,
          category_id: 4,
          quantity: 1,
          warehouse_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          date: '2024-2-07 11:35:47',
          product_id: 13,
          category_id: 3,
          quantity: 2,
          warehouse_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
