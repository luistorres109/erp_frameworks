import { Model, DataTypes } from 'sequelize';

class DBOfficePermissions extends Model {

  static init(sequelize) {
    super.init({
      office_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      permission_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
    }, { sequelize, modelName: 'officePermissions' })
  }

  static associate(models) {
    this.belongsTo(models.office, { foreignKey: 'office_id' });
    this.belongsTo(models.permission, { foreignKey: 'permission_id' });
  }

}

export { DBOfficePermissions };