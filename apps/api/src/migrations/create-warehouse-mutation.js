'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('warehouse_mutations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      warehouse_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      source_warehouse_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      destination_warehouse_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      mutation_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      is_confirmed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      arrival_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      delivery_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('warehouse_mutations');
  },
};
