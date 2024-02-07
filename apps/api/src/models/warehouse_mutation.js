import { Model, DataTypes } from 'sequelize';

export default class warehouse_mutation extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    warehouse_mutation.belongsTo(models.warehouses, {
      foreignKey: 'warehouse_id',
    });
    warehouse_mutation.belongsTo(models.products, {
      foreignKey: 'product_id',
    });
  }
}

export const init = (sequelize) => {
  warehouse_mutation.init(
    {
      warehouse_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      source_warehouse_id: DataTypes.INTEGER,
      destination_warehouse_id: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      mutation_type: DataTypes.STRING,
      is_confirmed: DataTypes.BOOLEAN,
      status: DataTypes.STRING,
      arrival_date: DataTypes.STRING,
      mutation_code: DataTypes.STRING,
      status: DataTypes.STRING,
      delivery_date: DataTypes.STRING,
      is_deleted: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'warehouse_mutation',
    },
  );
  return warehouse_mutation;
};
