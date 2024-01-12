import { Model, DataTypes } from 'sequelize';

export default class order_details extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    order_details.belongsTo(models.orders,{foreignKey:"order_id"})
    order_details.belongsTo(models.products,{foreignKey:"product_id"})
    order_details.belongsTo(models.warehouses,{foreignKey:"warehouse_id"})
  }
}

export const init = (sequelize) => {
  order_details.init(
    {
      order_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      warehouse_id: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      total_price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'order_details',
    },
  );
  return order_details;
};
