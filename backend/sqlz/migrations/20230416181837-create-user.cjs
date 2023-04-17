'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user', {
      user_uuid: {
        type: Sequelize.CHAR(36),
        allowNull: false,
        primaryKey: true
      },
      user_name: {
        type: Sequelize.STRING
      },
      user_id_office: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'office',
          key: 'ofce_id',
        }
      },
      user_login: {
        type: Sequelize.STRING(45),
        allowNull: false,
        unique: true

      },
      user_password: {
        type: Sequelize.STRING,
        allowNull: false

      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user');
  }
};