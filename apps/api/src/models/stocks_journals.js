import { Model, DataTypes } from 'sequelize';

export default class stocks_journals extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // Define association with the products table
    stocks_journals.belongsTo(models.products, {
      foreignKey: 'product_id',
    });
  }
}

export const init = (sequelize) => {
  stocks_journals.init(
    {
      date: DataTypes.STRING,
      product_id: DataTypes.INTEGER,
      warehouse_id: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      operation: DataTypes.STRING,
      now_stock: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'stocks_journals',
    },
  );
  return stocks_journals;
};
