import { DataTypes, Model } from "sequelize"
import { DBOptionLocation } from "./DBOptionLocation.js";

class DBOption extends Model {
   static init(sequelize) {
      super.init({
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
         },
         value: {
            type: DataTypes.STRING
         },
         location_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
         },
         isinactive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
         }
      }, { sequelize, modelName: 'option' })
   }

   static associate(models) {
      models.optionLocation.hasMany(this, {
         as: 'location', foreignKey: { name: "location_id" }
      });
      this.belongsTo(models.optionLocation,
         {
            as: 'location',
            foreignKey: { name: "location_id" }
         });
   }

}

export { DBOption };