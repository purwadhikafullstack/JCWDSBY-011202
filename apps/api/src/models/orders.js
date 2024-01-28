import { Model, DataTypes } from 'sequelize';

export default class orders extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    orders.hasMany(models.order_details,{foreignKey:"order_id"})
    orders.belongsTo(models.accounts,{foreignKey:"account_id"})
    orders.belongsTo(models.addresses,{foreignKey:"address_id"})
    orders.belongsTo(models.warehouses,{foreignKey:"warehouse_id"})
  }
}

export const init = (sequelize) => {
  orders.init(
    {
      invoice: DataTypes.INTEGER,
      account_id: DataTypes.INTEGER,
      address_id: DataTypes.INTEGER,
      warehouse_id: DataTypes.INTEGER,
      recepient: DataTypes.STRING,
      shipping_cost: DataTypes.INTEGER,
      total_price: DataTypes.INTEGER,
      total_weight: DataTypes.INTEGER,
      status: DataTypes.STRING,
      payment_proof: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'orders',
    },
  );
  return orders;
};
