import { Model, DataTypes } from 'sequelize';

export default class warehouses extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    warehouses.hasMany(models.accounts, { foreignKey: 'warehouse_id' });
    warehouses.hasMany(models.carts, { foreignKey: 'warehouse_id' });
    warehouses.hasMany(models.order_details, { foreignKey: 'warehouse_id' });
    warehouses.hasMany(models.orders, { foreignKey: 'warehouse_id' });
    warehouses.belongsTo(models.provinces, { foreignKey: 'prov_id' });
    warehouses.belongsTo(models.cities, { foreignKey: 'city_id' });
    warehouses.hasMany(models.warehouse_storage, {
      foreignKey: 'warehouse_id',
    });
  }
}

export const init = (sequelize) => {
  warehouses.init(
    {
      name: DataTypes.STRING,
      prov_id: DataTypes.INTEGER,
      city_id: DataTypes.INTEGER,
      address: DataTypes.STRING,
      lat: DataTypes.STRING,
      lon: DataTypes.STRING,
      is_deleted: DataTypes.BOOLEAN,

    },
    {
      sequelize,
      modelName: 'warehouses',
    },
  );
  return warehouses;
};
