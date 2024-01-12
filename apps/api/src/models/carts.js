import { Model, DataTypes } from 'sequelize';

export default class carts extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    carts.belongsTo(models.accounts, { foreignKey: "account_id" })
    carts.belongsTo(models.products, { foreignKey: "product_id" })
    carts.belongsTo(models.warehouses, { foreignKey: "warehouse_id" })
  }
}

export const init = (sequelize) => {
  carts.init(
    {
      account_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      warehouse_id: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      total_price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'carts',
    },
  );
  return carts;
};
