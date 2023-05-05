import { Model, DataTypes } from 'sequelize';
import { v4 } from 'uuid';

class DBUser extends Model {

   static init(sequelize) {
      super.init({
         uuid: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.CHAR(36),
            defaultValue: v4
         },
         name: {
            type: DataTypes.STRING(60)
         },
         office_id: {
            type: DataTypes.INTEGER,
            allowNull: false
         },
         login: {
            type: DataTypes.STRING(45),
            allowNull: false,
            unique: true
         },
         password: {
            type: DataTypes.STRING,
            allowNull: false
         },
         isinactive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
         }
      }, { sequelize, modelName: 'user' })
   }

   static associate(models) {
      this.belongsTo(models.office, {
         foreignKey: {
            name: 'office_id',
         }
      });
   }

}

export { DBUser };


