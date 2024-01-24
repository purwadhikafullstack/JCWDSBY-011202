import { Model, DataTypes } from 'sequelize';

export default class warehouse_storage extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    warehouse_storage.belongsTo(models.warehouses, {
      foreignKey: 'warehouse_id',
    });
    warehouse_storage.belongsTo(models.products, {
      foreignKey: 'product_id',
    });
  }
}

export const init = (sequelize) => {
  warehouse_storage.init(
    {
      warehouse_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      stock: DataTypes.INTEGER,
      is_deleted: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'warehouse_storage',
    },
  );
  return warehouse_storage;
};
