import { DataTypes } from "sequelize"
import sqlz from "#SQLZ"
import office from "./DBoffice.js";

export default sqlz.define('user', {
   user_uuid: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.CHAR(16)
   },
   user_name: {
      type: DataTypes.STRING
   },
   user_id_office: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
         model: office,
         key: 'ofce_id',
      }
   },
   user_login: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true
   },
   user_password: {
      type: DataTypes.STRING,
      allowNull: false
   }
}, {
   timestamps: false,
   freezeTableName: true
});

