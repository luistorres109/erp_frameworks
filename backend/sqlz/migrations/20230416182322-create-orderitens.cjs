'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orderitens', {
      orditen_id_order: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'order',
          key: 'orde_id'
        }
      },
      orditen_nr_sequencia: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      orditen_id_produto: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'product',
          key: 'prod_id'
        }
      },
      orditen_amount: {
        type: Sequelize.FLOAT
      },
      orditen_total_price: {
        type: Sequelize.FLOAT
      },
      orditen_un_price: {
        type: Sequelize.FLOAT
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('orderitens');
  }
};