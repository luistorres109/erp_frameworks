import { DataTypes, Model } from "sequelize"

class DBLoggerItem extends Model {
   static init(sequelize) {
      super.init({
         logger_id: {
            primaryKey: true,
            allowNull: false,
            type: DataTypes.BIGINT
         },
         sequence: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.INTEGER
         },
         type: DataTypes.STRING,
         msg: DataTypes.TEXT
      }, { sequelize, modelName: 'loggerItem' })
   }

   static associate(models) {
      models.logger.hasMany(this, { foreignKey: 'logger_id' });
      this.belongsTo(models.logger, { foreignKey: 'logger_id' });
   }

}

export { DBLoggerItem };