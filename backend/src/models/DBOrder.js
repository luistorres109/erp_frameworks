import { DataTypes, Model } from "sequelize"

class DBOrder extends Model {
  static init(sequelize) {
    super.init({
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      client_uuid: {
        type: DataTypes.CHAR(36),
        allowNull: false,
      },
      user_uuid: {
        type: DataTypes.CHAR(36),
        allowNull: false,
      },
      sale_date: {
        type: DataTypes.DATE
      },
      total_price: {
        type: DataTypes.FLOAT
      },
      status: {
        type: DataTypes.INTEGER,
      }
    }, { sequelize, modelName: 'order' });
  }

  static associate(models) {
    this.belongsTo(models.client, {
      foreignKey: {
        name: "client_uuid"
      }
    });
    this.belongsTo(models.user, {
      foreignKey: {
        name: "user_uuid"
      }
    });
    this.belongsTo(models.option, {
      foreignKey: {
        name: "status"
      }
    });
  }

}

export { DBOrder };

