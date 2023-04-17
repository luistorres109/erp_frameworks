'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_permission', {
      uspr_id_user: {
        type: Sequelize.CHAR(16),
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'user',
          key: 'user_uuid'
        }
      },
      uspr_id_permission: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'permission',
          key: 'perm_id'
        }
      },
      uspr_query: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      uspr_register: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      uspr_edit: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      uspr_delete: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_permission');
  }
};