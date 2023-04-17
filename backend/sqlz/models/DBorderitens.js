import { DataTypes } from "sequelize"
import sqlz from "#SQLZ"
import order from "./DBorder.js";
import product from "./DBproduct.js";

export default sqlz.define('orderitens', {
  orditen_id_order: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: order,
      key: 'orde_id'
    }
  },
  orditen_nr_sequencia: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  orditen_id_produto: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: product,
      key: 'prod_id'
    }
  },
  orditen_amount: {
    type: DataTypes.FLOAT
  },
  orditen_total_price: {
    type: DataTypes.FLOAT
  },
  orditen_un_price: {
    type: DataTypes.FLOAT
  }
}, {
  timestamps: false,
  freezeTableName: true
});

