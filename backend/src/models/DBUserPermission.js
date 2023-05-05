import { Model, DataTypes } from 'sequelize';

class DBUserPermission extends Model {

  static init(sequelize) {
    super.init({
      user_uuid: {
        primaryKey: true,
        type: DataTypes.CHAR(36),
        allowNull: false
      },
      permission_id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false
      },
      query: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      register: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      edit: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      delete: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    }, { sequelize, modelName: 'userPermission' })
  }

  static associate(models) {
    this.belongsTo(models.user, {
      foreignKey: {
        name: 'user_uuid'
      }
    });

    this.belongsTo(models.permission, {
      foreignKey: {
        name: 'permission_id'
      }
    });

  }

}

export { DBUserPermission };

