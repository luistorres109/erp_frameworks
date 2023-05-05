import { DataTypes, Model } from "sequelize"

class DBCep extends Model {
   static init(sequelize) {
      super.init({
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
         },
         code: {
            type: DataTypes.BIGINT
         },
         state: {
            type: DataTypes.CHAR(2)
         },
         city: {
            type: DataTypes.STRING(80)
         },
         district: {
            type: DataTypes.STRING(80)
         },
         address: {
            type: DataTypes.STRING(80)
         },
      }, { sequelize, modelName: 'cep' })
   }

   static associate(models) {}

}

export { DBCep };