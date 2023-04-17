import { DataTypes } from "sequelize"
import sqlz from "#SQLZ"

export default sqlz.define('product', {
  prod_id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  prod_name: {
    type: DataTypes.STRING(120)
  },
  prod_description: {
    type: DataTypes.TEXT
  },
  prod_barcode: {
    type: DataTypes.BIGINT,
  },
  prod_un_medida: {
    type: DataTypes.SMALLINT,
    allowNull: true,
    references: {
      model: 'unmedida',
      key: 'unmd_id'
    }
  },
  prod_price: {
    type: DataTypes.FLOAT
  }
}, {
  timestamps: false,
  freezeTableName: true
});

