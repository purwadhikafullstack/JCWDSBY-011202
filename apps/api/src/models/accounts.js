import { Model, DataTypes } from 'sequelize';

export default class accounts extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(accounts) {
    // define association here
  }
}

export const init = (sequelize) => {
  accounts.init(
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      role: DataTypes.STRING,
      profile_picture: DataTypes.STRING,
      address_id: DataTypes.INTEGER,
      warehouse_id: DataTypes.INTEGER,
      is_verified: DataTypes.BOOLEAN,
      is_deleted: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'accounts',
    },
  );
  return accounts;
};
