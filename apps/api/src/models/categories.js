import { Model, DataTypes } from 'sequelize';

export default class categories extends Model {
  static associate(models) {
    categories.hasMany(models.products, {
      foreignKey: 'category_id',
    });
    categories.hasMany(models.sales_journal, {
      foreignKey: 'category_id',
    });
  }
}

export const init = (sequelize) => {
  categories.init(
    {
      category: DataTypes.STRING,
      is_deleted: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'categories',
    },
  );
  return categories;
};
