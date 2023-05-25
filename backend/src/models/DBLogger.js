import { DataTypes, Model } from "sequelize"

class DBLogger extends Model {
   static init(sequelize) {
      super.init({
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT
         },
         url: DataTypes.STRING,
         path: DataTypes.STRING,
         params: DataTypes.JSON,
         method: DataTypes.STRING,
         body: DataTypes.JSON,
         ip: DataTypes.STRING,
         headers: DataTypes.JSON,
         user_uuid: DataTypes.CHAR(36),
         user_name: DataTypes.STRING,
         user_login: DataTypes.STRING
      }, { sequelize, modelName: 'logger' })
   }

   static associate(models) {
      models.user.hasMany(this, { foreignKey: 'user_uuid' });
      this.belongsTo(models.user, { foreignKey: 'user_uuid' });
   }

}

export { DBLogger };