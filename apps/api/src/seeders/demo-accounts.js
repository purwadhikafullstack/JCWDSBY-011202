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
      'People',
      [
        {
          username: 'John Doe',
          password: 'qwertyuiop',
          email: 'john@example.com',
          role: 'super_admin',
          profile_picture: null,
          address_id: 1,
          warehouse_id: 1,
          is_verified: true,
          is_delete: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'John Tanny',
          password: 'qwertyuiop',
          email: 'tanny@example.com',
          role: 'user',
          profile_picture: null,
          address_id: 1,
          warehouse_id: null,
          is_verified: true,
          is_delete: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'John Penny',
          password: 'qwertyuiop',
          email: 'penny@example.com',
          role: 'admin',
          profile_picture: null,
          address_id: 1,
          warehouse_id: 2,
          is_verified: true,
          is_delete: false,
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
