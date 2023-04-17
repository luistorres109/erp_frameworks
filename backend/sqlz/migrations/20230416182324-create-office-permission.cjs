'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('office_permission', {
      ofpm_id_office: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'office',
          key: 'ofce_id'
        }
      },
      ofpm_id_permission: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'permission',
          key: 'perm_id'
        }
      },
      ofpm_query: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      ofpm_register: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      ofpm_edit: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      ofpm_delete: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('office_permission');
  }
};