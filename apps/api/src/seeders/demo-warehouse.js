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
      'warehouse_mutations',
      [
        {
          warehouse_id: 2,
          product_id: 3,
          source_warehouse_id: 1,
          destination_warehouse_id: 2,
          quantity: 2,
          mutation_type: 'request',
          status: 'waiting for confirmation',
          is_confirmed: false,
          is_deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          warehouse_id: 1,
          product_id: 3,
          source_warehouse_id: 1,
          destination_warehouse_id: 2,
          quantity: 2,
          mutation_type: 'requested',
          status: 'waiting for confirmation',
          is_confirmed: false,
          is_deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          warehouse_id: 2,
          product_id: 4,
          source_warehouse_id: 1,
          destination_warehouse_id: 2,
          quantity: 2,
          mutation_type: 'request',
          status: 'waiting for process',
          is_confirmed: true,
          is_deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          warehouse_id: 1,
          product_id: 4,
          source_warehouse_id: 1,
          destination_warehouse_id: 2,
          quantity: 2,
          mutation_type: 'requested',
          status: 'waiting for process',
          is_confirmed: true,
          is_deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          warehouse_id: 2,
          product_id: 5,
          source_warehouse_id: 1,
          destination_warehouse_id: 2,
          quantity: 2,
          mutation_type: 'request',
          status: 'processing',
          is_confirmed: true,
          is_deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          warehouse_id: 1,
          product_id: 5,
          source_warehouse_id: 1,
          destination_warehouse_id: 2,
          quantity: 2,
          mutation_type: 'requested',
          status: 'processing',
          is_confirmed: true,
          is_deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          warehouse_id: 2,
          product_id: 5,
          source_warehouse_id: 1,
          destination_warehouse_id: 2,
          quantity: 2,
          mutation_type: 'request',
          status: 'on delivery',
          is_confirmed: true,
          is_deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          warehouse_id: 1,
          product_id: 5,
          source_warehouse_id: 1,
          destination_warehouse_id: 2,
          quantity: 2,
          mutation_type: 'requested',
          status: 'on delivery',
          is_confirmed: true,
          is_deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          warehouse_id: 2,
          product_id: 5,
          source_warehouse_id: 1,
          destination_warehouse_id: 2,
          quantity: 2,
          mutation_type: 'request',
          status: 'arrived',
          is_confirmed: true,
          is_deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          warehouse_id: 1,
          product_id: 5,
          source_warehouse_id: 1,
          destination_warehouse_id: 2,
          quantity: 2,
          mutation_type: 'requested',
          status: 'arrived',
          is_confirmed: true,
          is_deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          warehouse_id: 2,
          product_id: 5,
          source_warehouse_id: 1,
          destination_warehouse_id: 2,
          quantity: 2,
          mutation_type: 'request',
          status: 'done',
          is_confirmed: true,
          is_deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          warehouse_id: 1,
          product_id: 5,
          source_warehouse_id: 1,
          destination_warehouse_id: 2,
          quantity: 2,
          mutation_type: 'requested',
          status: 'done',
          is_confirmed: true,
          is_deleted: false,
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
