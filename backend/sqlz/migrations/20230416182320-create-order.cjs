'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable('order', {
         orde_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
         },
         orde_uuid_client: {
            type: Sequelize.CHAR(36),
            allowNull: false,
            references: {
               model: 'client',
               key: 'clien_uuid'
            }
         },
         orde_uuid_user: {
            type: Sequelize.CHAR(36),
            allowNull: false,
            references: {
               model: 'user',
               key: 'user_uuid'
            }
         },
         orde_dthr_venda: {
            type: Sequelize.DATE
         },
         orde_valor_total: {
            type: Sequelize.FLOAT
         },
         orde_st_venda: {
            type: Sequelize.SMALLINT
         }
      });
   },
   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable('order');
   }
};