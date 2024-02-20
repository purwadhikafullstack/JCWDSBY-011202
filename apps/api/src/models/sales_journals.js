import { Model, DataTypes } from 'sequelize';

export default class sales_journal extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    sales_journal.belongsTo(models.products, {
      foreignKey: 'product_id',
    });
    sales_journal.belongsTo(models.categories, {
      foreignKey: 'category_id',
    });
  }
}

export const init = (sequelize) => {
  sales_journal.init(
    {
      date: DataTypes.DATE,
      product_id: DataTypes.INTEGER,
      warehouse_id: DataTypes.INTEGER,
      category_id: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'sales_journal',
    },
  );
  return sales_journal;
};
