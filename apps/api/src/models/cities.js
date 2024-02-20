import { Model, DataTypes } from 'sequelize';

export default class cities extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here

    cities.hasMany(models.addresses, { foreignKey: 'city_id' });
    cities.belongsTo(models.provinces, { foreignKey: 'prov_id' });
    cities.hasMany(models.warehouses, { foreignKey: 'city_id' });


  }
}

export const init = (sequelize) => {
  cities.init(
    {
      prov_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'cities',
    },
  );
  return cities;
};
