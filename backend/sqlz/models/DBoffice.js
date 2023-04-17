import { DataTypes } from "sequelize"
import sqlz from "#SQLZ"

export default sqlz.define('office', {
  ofce_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  ofce_name: {
    type: DataTypes.STRING(45),
    allowNull: false
  }
}, {
  timestamps: false,
  freezeTableName: true
});

