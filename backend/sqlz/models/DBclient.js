import { DataTypes } from "sequelize"
import sqlz from "#SQLZ"

export default sqlz.define('client', {
  clien_uuid: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.CHAR(36)
  },
  clien_name: {
    type: DataTypes.STRING(80)
  },
  clien_cpf_cnpj: {
    type: DataTypes.BIGINT
  },
  clien_telefone: {
    type: DataTypes.BIGINT
  },
  clien_endereco: {
    type: DataTypes.STRING(60)
  },
  clien_bairro: {
    type: DataTypes.STRING(60)
  },
  clien_cidade: {
    type: DataTypes.STRING(60)
  },
  clien_estado: {
    type: DataTypes.STRING(2)
  },
  clien_numero: {
    type: DataTypes.SMALLINT
  },
  clien_cep: {
    type: DataTypes.INTEGER
  },
  client_fl_inactive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  timestamps: false,
  freezeTableName: true
});
