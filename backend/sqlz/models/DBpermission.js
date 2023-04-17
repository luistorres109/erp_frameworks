import { DataTypes } from "sequelize"
import sqlz from "#SQLZ"

export default sqlz.define('permission', {
  perm_id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  perm_name: {
    type: Sequelize.STRING(45)
  },
  perm_path: {
    type: Sequelize.STRING(45)
  }
}, {
  timestamps: false,
  freezeTableName: true
});

