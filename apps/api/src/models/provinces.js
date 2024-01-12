import { Model, DataTypes } from 'sequelize';

export default class provinces extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    provinces.hasMany(models.addresses,{foreignKey:"prov_id"})
    provinces.hasMany(models.cities,{foreignKey:"province_id"})
    provinces.hasMany(models.warehouses,{foreignKey:"prov_id"})

  }
}

export const init = (sequelize) => {
  provinces.init(
    {
      name: DataTypes.STRING,
    
    },
    {
      sequelize,
      modelName: 'provinces',
    },
  );
  return provinces;
};
