import { DataTypes } from "sequelize"
import sqlz from "#SQLZ"
import office from "./DBoffice.js";
import permission from "./DBpermission.js";

export default sqlz.define('office_permission', {
  ofpm_id_office: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: office,
      key: 'ofce_id'
    }
  },
  ofpm_id_permission: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    references: {
      model: permission,
      key: 'perm_id'
    }
  },
  ofpm_query: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  ofpm_register: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  ofpm_edit: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  ofpm_delete: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  }
}, {
  timestamps: false,
  freezeTableName: true
});
