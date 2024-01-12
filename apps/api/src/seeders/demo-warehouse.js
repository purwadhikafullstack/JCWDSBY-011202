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
      'warehouses',
      [
        {
          name: 'Gudang 1',
          prov_id: 1,
          city_id: 2,
          address: 'JL. Dr. Wahidin No. 01',
          is_deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Gudang 2',
          prov_id: 1,
          city_id: 2,
          address: 'JL. Dr. Soetomo No. 02',
          is_deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Gudang 2',
          prov_id: 1,
          city_id: 2,
          address: 'JL. Dr. Cokro No. 02',
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
