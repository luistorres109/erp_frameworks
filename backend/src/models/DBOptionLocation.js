import { DataTypes, Model } from "sequelize"

class DBOptionLocation extends Model {
   static init(sequelize) {
      super.init({
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
         },
         name: {
            type: DataTypes.STRING
         },
         isinactive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
         }
      }, { sequelize, modelName: 'optionLocation' })
   }

   static associate(models) { }

}

export { DBOptionLocation };