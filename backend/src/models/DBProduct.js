import { DataTypes, Model } from "sequelize"

class DBProduct extends Model {
  static init(sequelize) {
    super.init({
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING(120)
      },
      description: {
        type: DataTypes.TEXT
      },
      barcode: {
        type: DataTypes.BIGINT,
      },
      medida: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT
      },
      isinactive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    }, { sequelize, modelName: 'product' })
  }

  static associate(models) {
    this.belongsTo(models.option, {
      foreignKey: {
        name: 'medida'
      }
    });
  }

}

export { DBProduct };