'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('unmedida', {
      unmd_id: {
        type: Sequelize.SMALLINT,
        primaryKey: true,
        allowNull: false
      },
      unmd_name: {
        type: Sequelize.STRING,
        allowNull: false,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_permission');
  }
};