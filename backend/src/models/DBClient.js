import { DataTypes, Model } from "sequelize"
import { v4 } from 'uuid';

class DBClient extends Model {

  static init(sequelize) {
    super.init({
      uuid: {
        type: DataTypes.CHAR(36),
        primaryKey: true,
        allowNull: false,
        defaultValue: v4,
      },
      name: {
        type: DataTypes.STRING(80)
      },
      document: {
        type: DataTypes.BIGINT
      },
      phone: {
        type: DataTypes.BIGINT
      },
      address: {
        type: DataTypes.STRING(80)
      },
      district: {
        type: DataTypes.STRING(80)
      },
      city: {
        type: DataTypes.STRING(80)
      },
      state: {
        type: DataTypes.CHAR(2)
      },
      num_address: {
        type: DataTypes.SMALLINT
      },
      cep: {
        type: DataTypes.BIGINT
      },
      isinactive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    }, { sequelize, modelName: 'client' })
  }

  static associate(models) {
  }

}

export { DBClient };