import { DataTypes, Model } from "sequelize"


class DBOrderItem extends Model {

  static init(sequelize) {
    super.init({
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      sequence: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      amount: {
        type: DataTypes.FLOAT
      },
      total_price: {
        type: DataTypes.FLOAT
      },
      un_price: {
        type: DataTypes.FLOAT
      }
    }, { sequelize, modelName: "orderItem" });
  }

  static associate(models) {
    this.belongsTo(models.order, {
      foreignKey: {
        name: "order_id"
      }
    });

    this.belongsTo(models.product, {
      foreignKey: {
        name: "product_id"
      }
    });
  }
}

export { DBOrderItem }

