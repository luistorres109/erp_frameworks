import { Model, DataTypes } from 'sequelize';

class DBOffice extends Model {

  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      isinactive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    }, { sequelize, modelName: 'office' })
  }

  static associate(models) {
  }

}

export { DBOffice };