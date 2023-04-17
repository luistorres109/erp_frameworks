import { DataTypes } from "sequelize"
import sqlz from "#SQLZ"

export default sqlz.define('user_permission', {
  uspr_id_user: {
    type: DataTypes.CHAR(16),
    primaryKey: true,
    allowNull: false,
    references: {
      model: 'user',
      key: 'user_uuid'
    }
  },
  uspr_id_permission: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    references: {
      model: 'permission',
      key: 'perm_id'
    }
  },
  uspr_query: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  uspr_register: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  uspr_edit: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  uspr_delete: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  timestamps: false,
  freezeTableName: true
});

