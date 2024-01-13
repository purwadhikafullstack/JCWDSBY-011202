import { Model, DataTypes } from 'sequelize';

export default class products extends Model {
  static associate(models) {
    products.belongsTo(models.categories, {
      foreignKey: 'category_id',
    });
    products.hasMany(models.product_images, {
      foreignKey: 'product_id',
    });
  }
}

export const init = (sequelize) => {
  products.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      weight: DataTypes.STRING,
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
