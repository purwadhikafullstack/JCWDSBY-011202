import { Model, DataTypes } from 'sequelize';

export default class products extends Model {
  static associate(models) {
    products.belongsTo(models.categories, {
      foreignKey: 'category_id',
    });
    products.hasMany(models.product_images, {
      foreignKey: 'product_id',
    });
    products.hasMany(models.warehouse_storage, {
      foreignKey: 'product_id',
    });
    products.hasMany(models.warehouse_mutation, {
      foreignKey: 'product_id',
    });
    products.hasMany(models.sales_journal, {
      foreignKey: 'product_id',
    });
    products.hasMany(models.stocks_journals, {
      foreignKey: 'product_id',
    });
  }
}

export const init = (sequelize) => {
  products.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      weight: DataTypes.INTEGER,
      category_id: DataTypes.INTEGER,
      description: DataTypes.STRING,
      is_deleted: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'products',
    },
  );
  return products;
};
