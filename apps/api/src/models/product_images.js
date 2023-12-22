import { Model, DataTypes } from 'sequelize';

export default class product_images extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    product_images.belongsTo(models.products, {
      foreignKey: 'product_id',
    });
  }
}

export const init = (sequelize) => {
  product_images.init(
    {
      product_id: DataTypes.INTEGER,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'product_images',
    },
  );
  return product_images;
};
