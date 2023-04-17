'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('product', {
      prod_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      prod_name: {
        type: Sequelize.STRING(120)
      },
      prod_description: {
        type: Sequelize.TEXT
      },
      prod_barcode: {
        type: Sequelize.BIGINT,
      },
      prod_un_medida: {
        type: Sequelize.SMALLINT,
        allowNull: true,
        references: {
          model: 'unmedida',
          key: 'unmd_id'
        }
      },
      prod_price: {
        type: Sequelize.FLOAT
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('product');
  }
};