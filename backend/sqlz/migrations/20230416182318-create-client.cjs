'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('client', {
      clien_uuid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.CHAR(36)
      },
      clien_name: {
        type: Sequelize.STRING(80)
      },
      clien_cpf_cnpj: {
        type: Sequelize.BIGINT
      },
      clien_telefone: {
        type: Sequelize.BIGINT
      },
      clien_endereco: {
        type: Sequelize.STRING(60)
      },
      clien_bairro: {
        type: Sequelize.STRING(60)
      },
      clien_cidade: {
        type: Sequelize.STRING(60)
      },
      clien_estado: {
        type: Sequelize.STRING(2)
      },
      clien_numero: {
        type: Sequelize.SMALLINT
      },
      clien_cep: {
        type: Sequelize.INTEGER
      },
      client_fl_inactive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('client');
  }
};