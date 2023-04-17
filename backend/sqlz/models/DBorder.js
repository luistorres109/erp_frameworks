import { DataTypes } from "sequelize"
import sqlz from "#SQLZ"
import client from "./DBclient.js";
import user from "./DBuser.js";

export default sqlz.define('order', {
  orde_id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  orde_uuid_client: {
    type: DataTypes.CHAR(36),
    allowNull: false,
    references: {
      model: client,
      key: 'clien_uuid'
    }
  },
  orde_uuid_user: {
    type: DataTypes.CHAR(36),
    allowNull: false,
    references: {
      model: user,
      key: 'user_uuid'
    }
  },
  orde_dthr_venda: {
    type: DataTypes.DATE
  },
  orde_valor_total: {
    type: DataTypes.FLOAT
  },
  orde_st_venda: {
    type: DataTypes.SMALLINT
  }
}, {
  timestamps: false,
  freezeTableName: true
});

