import { DataTypes, Model } from "sequelize"

class DBPermission extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(45)
      },
      path: {
        type: DataTypes.STRING,
        unique: true
      }
    }, { sequelize, modelName: 'permission' })
  }

  static associate(models) {
  }

}

export { DBPermission };