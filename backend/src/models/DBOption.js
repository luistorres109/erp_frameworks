import { DataTypes, Model } from "sequelize"

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
         isinactive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
         }
      }, { sequelize, modelName: 'option' })
   }

   static associate(models) {}

}

export { DBOption };