import { Model, DataTypes } from 'sequelize';

export default class addresses extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    addresses.hasMany(models.accounts,{foreignKey:"address_id"})
    addresses.belongsTo(models.accounts,{foreignKey:"account_id"})
    addresses.belongsTo(models.provinces,{foreignKey:"prov_id"})
    addresses.belongsTo(models.cities,{foreignKey:"city_id"})
    addresses.hasMany(models.orders,{foreignKey:"address_id"})


  }
}

export const init = (sequelize) => {
  addresses.init(
    {
      account_id: DataTypes.INTEGER,
      prov_id: DataTypes.INTEGER,
      city_id: DataTypes.INTEGER,
      postal_code: DataTypes.STRING,
      address: DataTypes.STRING,
      phone: DataTypes.STRING,
      lat: DataTypes.STRING,
      lon: DataTypes.STRING,
    
    },
    {
      sequelize,
      modelName: 'addresses',
    },
  );
  return addresses;
};
